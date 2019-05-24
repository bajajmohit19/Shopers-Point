const userModule = angular.module('usermodule',['ngRoute']);
let baseUrl = '';
userModule.config(($routeProvider,$locationProvider)=>{
    $locationProvider.hashPrefix('');
    $routeProvider.when('/signin',{
        templateUrl:"../../views/signin.html"
    }).when('/register',{
        templateUrl:'../../views/register.html'
    }).when('/',{
        templateUrl:'../../views/register.html'
    }).otherwise({
        templateUrl:'../../views/register.html'
    });
});
adminModule.run(($location)=>{
    baseUrl='https://'+$location.host()+':'+$location.port();
})