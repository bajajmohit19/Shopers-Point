const app = angular.module('adminapp',[]);
app.config(function ($httpProvider){
    $httpProvider.interceptors.push('adminAuthInterceptor');
})
app.run(($http,$window)=>{
    $http.get('/isFirstTime').then(data=>{
        if(data.data.status == 'Y'){
            console.log('yes');
        }
    },err=>{$window.location.href = '/error.html';})
})