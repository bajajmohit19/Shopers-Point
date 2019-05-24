const dashboardModule = angular.module('admindashboardmodule',['adminapp','ngRoute','ngFileUpload']);
let baseUrl = '';
dashboardModule.constant('DASHBOARD_URL',baseUrl+'/dashboard');
dashboardModule.config(($routeProvider,$locationProvider)=>{
    $locationProvider.hashPrefix('');
    $routeProvider.when('/orders',{
        templateUrl:'../../views/admin/ordersCRUD.html'
    }).when('/products',{
        templateUrl:'../../views/admin/productCRUD.html'
    }).when('/customers',{
        templateUrl:'../../views/admin/customersCRUD.html'
    }).when('/',{
        template:'<div class="text-center mt-5"><h1>Welcome to Admin dashboard</h1></div>'
    }).otherwise({
        template:"<h1>Wrong Url<h1>"
    });
});
dashboardModule.run(($http,DASHBOARD_URL,$window,$location)=>{
    baseUrl='https://'+$location.host()+':'+$location.port();
    console.log('In dashboard module');
    $http.get(DASHBOARD_URL).then(data=>{
        if(data.data.status=='E'){
            $window.location.href = '/adminLogin.html';
        }
    },(err)=>{
        $window.location.href = '/adminLogin.html';
    });
});