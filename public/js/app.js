
angular.module('greystonePiecesShop', ['ngResource', 'ui.router', 'ngCart'])

.run (['$rootScope', '$state', function($rootScope, $state){
    $rootScope.$state = $state;

}])

.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider


        .state('site', {
            abstract:true,
            url: "/",
            controller:"main",
            template: "<div ui-view></div>"
        })


        .state('site.index', {
            url: "",
            templateUrl: 'partials/index.html'
        })

        .state('site.shop', {
            url: "",            
            controller: 'shop',
            templateUrl: 'partials/index.html'
        })

      .state('site.cart', {
            url: "cart",
            controller:"cart",
            templateUrl: 'partials/cart.html'
        })

}])
    .controller('main',[ '$http','ngCart', '$scope', function ($http, ngCart, $scope) {

    $http({method: 'GET', url: 'data/phones.json'})
        .success(function(data, status, headers, config) {
            $scope.products = data;
        })
        .error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

}])

.controller('cart',['ngCart', '$log', '$scope', function (ngCart,$log, $scope) {

        console.log("just entered the cart controller");


         $('html, body').animate({
                scrollTop: $("#shop").offset().top
                 }, 1000);

        $scope.setShippingCosts = function(){

             console.log(ngCart.getItems().length);

             
        };
       
        var orderDescription = "";
        angular.forEach(ngCart.getItems(), function (item) {

            orderDescription+=item._name + " ,";            
        });

       var orderNumber = Math.random();

        $scope.payPalSettings ={ paypal:{
            business:'greystonepieces@gmail.com',
            item_name:'Order : '+ orderDescription,
            item_number: orderNumber,
            currency_code:'EUR'
        }};

    $scope.showCart = function(){

        $log.info ('---Total Cost:---');
        $log.info (ngCart.totalCost());
        $log.info ('---Items in Cart:---');
        $log.info (ngCart.getItems());

    }

}])

.controller('shop',[ '$http','ngCart', '$scope', function ($http, ngCart, $scope) {

    $http({method: 'GET', url: 'data/phones.json'})
        .success(function(data, status, headers, config) {
            $scope.products = data;
        })
        .error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

                console.log("just entered the shop controller");
         $('html, body').animate({
                scrollTop: $("#shop").offset().top
                 }, 1000);

}])
    .directive('rainbowBlock', function () {

    return {
        restrict: 'A',
        link: function(el) {
            Rainbow.color();
        }
    };
})
;

