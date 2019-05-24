const app = angular.module('adminapp',[]);
app.config(function ($httpProvider){
    $httpProvider.interceptors.push('adminAuthInterceptor');
})
app.run(($http,$window)=>{
    $http.get('/isFirstTime').then(data=>{
        if(data.data.status == 'Y'){
            $window.location.href = '/changePassword.html';
        }
    },err=>{$window.location.href = '/error.html';})
})