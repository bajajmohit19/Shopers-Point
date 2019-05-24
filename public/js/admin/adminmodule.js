const adminModule = angular.module('adminmodule',[]);
let baseUrl = '';
adminModule.run(($location)=>{
    baseUrl='https://'+$location.host()+':'+$location.port();
})