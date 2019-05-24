const app = angular.module('userapp',[]);
app.config(function ($httpProvider){
    $httpProvider.interceptors.push('userAuthInterceptor');
})