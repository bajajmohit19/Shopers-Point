const userModule = angular.module('userdashboardmodule',['userapp','ngRoute']);
let baseUrl ='';
userModule.constant('DASHBOARD_URL',baseUrl+'/dashboard');
userModule.config(($routeProvider,$locationProvider)=>{
    $locationProvider.hashPrefix('');
    $routeProvider.when('/',{
        templateUrl:'../../views/products.html'
    }).when('/productdetails',{
        templateUrl:'../../views/productDetails.html'
    }).when('/orderplaced',{
        templateUrl:'../../views/orderplaced.html'
    }).when('/profile',{
        templateUrl:'../../views/profile.html'
    }).otherwise({
        template:"<h1>Wrong Url<h1>"
    });
});
userModule.run(($http,DASHBOARD_URL,$window,$location)=>{
    baseUrl='https://'+$location.host()+':'+$location.port();
    console.log('In dashboard module');
    $http.get(DASHBOARD_URL).then(data=>{
        if(data.data.status=='E'){
            $window.location.href = '/index.html#/signin';
        }
    },(err)=>{
        $window.location.href = '/index.html#/signin';
    });
});