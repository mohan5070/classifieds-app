(function() {

    angular.module("ngClassifieds").controller("classfiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav,$mdToast, $mdDialog) {

        classifiedsFactory.getClassifieds().then(function(classifieds) {
           $scope.classifieds = classifieds.data;
           $scope.categories = getCategories($scope.classifieds);
        });

        var contact = {
            name: "Mohan",
            phone: "79323223232",
            email: "mohan@gmail.com"
        }



        $scope.openSidenav = function() {
            $mdSidenav("left").open();
        };

        $scope.closeSidenav = function() {
            $mdSidenav("left").close();
        };
        $scope.saveClassified = function(classified) {
            if(classified) {
                classified.contact = contact;
                $scope.classifieds.push(classified);
                $scope.classified = {};
                $mdSidenav("left").close();
                showToast('Classified saved');
            }
        };

         $scope.editClassified = function(classified) {
            $scope.editing = true;
            $scope.openSidenav();
            $scope.classified = classified;
         };

         $scope.saveEdit = function() {
            $scope.editing = false;
            $scope.classified = {};
            $scope.closeSidenav();
            showToast('Edit saved');
         };

         $scope.deleteClassified = function(classified) {
            var confirm = $mdDialog.confirm()
            .title("are you sure you want to delete"+classified.title)
            .ok("Yes")
            .cancel("No");

            $mdDialog.show(confirm).then(function() {
                var index = $scope.classifieds.indexOf(classified);
                $scope.classifieds.splice(index,1);
            });
         };

         function showToast(message) {
             $mdToast.show(
                    $mdToast.simple()
                    .content(message)
                    .position('top, right')
                    .hideDelay(3000)
                );
         }

        function getCategories(classifieds) {
            var categories = [];
            angular.forEach(classifieds, function(item) {
                angular.forEach(item.categories, function(category) {
                    categories.push(category);
                });
            });

            return _.uniq(categories);
         }
    });
})();
