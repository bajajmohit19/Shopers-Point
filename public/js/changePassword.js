const changePassword = angular.module('changepassword',['adminapp']);
let baseUrl='';
changePassword.run(($location)=>{
    baseUrl='https://'+$location.host()+':'+$location.port();
})
changePassword.constant('CHANGE_PASSWORD_URL',baseUrl+'/changeAdminPassword');
changePassword.controller('changePasswordCtrl',['$scope','passwordfactory','$window',($scope,passwordfactory,$window)=>{
    $scope.doChange = ()=>{
        if($scope.newPwd!=$scope.newPwd2){
            $scope.message = "New password not match";
        }
        else if($scope.newPwd == $scope.newPwd2 && $scope.newPwd != undefined){
            const pwdObject = {
                oldPwd:$scope.oldPwd,
                newPwd:$scope.newPwd
            }
            let promise = passwordfactory.change(pwdObject);
            promise.then(data=>{
                if(data){
                    if(data.data.code==00){
                        $scope.message = 'Old password not matched'
                    }
                    else{
                        localStorage.clear();
                        $window.location.href = 'adminLogin.html';
                    }
                }
            })
        }
        else{
            $scope.message = "Input fields should not be empty";
        }
    }
}]);
changePassword.factory('passwordfactory',['$http','CHANGE_PASSWORD_URL',($http,CHANGE_PASSWORD_URL)=>{
    return {
        change(password){
            return $http.post(CHANGE_PASSWORD_URL,password);
        }
    }
}])