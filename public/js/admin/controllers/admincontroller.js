adminModule.controller('adminctrl',['$scope','adminfactory','$window',($scope,adminfactory,$window)=>{
    $scope.admin={};
    $scope.isErr = false;
    $scope.doLogin=()=>{
        console.log('inside admin Controller',$scope.admin);
        if($scope.admin.userid== undefined||$scope.admin.pwd== undefined||$scope.admin.userid== ""||$scope.admin.pwd== ""){
            $scope.message = 'Please fill all required details';
        }
        else{
            const promise = adminfactory.login($scope.admin);
            promise.then(data=>{
                //console.log(data);
                //$scope.data = data;
                $scope.isErr = false;
                if(data.data.token){
                    localStorage.uid = data.data.doc._id;
                    localStorage.tokenid = data.data.token;
                    $window.location.href = "adminPanel.html";
                }
                else{
                    $scope.message = 'Wrong username and password';
                }
            },err=>{
                $scope.err = err;
                $scope.isErr = true;
            })
        }
    }
}])
adminModule.constant('ADMIN_LOGIN_URL',baseUrl+'/adminlogin');