angular.module("ngClassifieds",["ngMaterial", "ui.router"]).config(function($mdThemingProvider, $stateProvider) {
    $mdThemingProvider.theme('default').primaryPalette('teal').accentPalette('orange');

    $stateProvider
    .state('one', {
        url: '/stateone',
        template: "<h1>Hello World</h1>"
    })
    .state('two', {
        url: '/statetwo',
        template: "<h1>StateTwo</h1>"
    })
})
.directive("helloWorld",function() {
    return {
        template: "<h1>Hello World</h1>"
    };
});