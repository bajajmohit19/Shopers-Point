userModule.controller('userctrl',['$scope','userfactory','$window','$timeout',($scope,userfactory,$window,$timeout)=>{
    $scope.user={userid:'',username:'',gender:'male',email:'',mobileno:'',pwd:''};
    $scope.isErr = false;
    $scope.doRegister=()=>{
        //console.log('inside Controller',$scope.user);
        angular.forEach($scope.user,(value,key)=>{
            if(value == '' || !value){
                $scope.notification = 'Please fill all details';
            }
        })
        if(!$scope.notification){
            const promise = userfactory.register($scope.user);
            promise.then(data=>{
                //console.log('reg is', data);
                $scope.reg = data;
                $scope.isErr = false;
                $timeout(()=>{
                    $scope.isErr = true;
                },5000);
            },err=>{
                //console.log('In err',err);
                $scope.err = err;
                $scope.reg = {};
                $scope.isErr = true;
                $timeout(()=>{
                    $scope.isErr = false;
                },5000);
            })
        }
        
    };
    $scope.doLogin=()=>{
        console.log('inside Controller',$scope.user);
        const promise = userfactory.login($scope.user);
        promise.then(data=>{
            console.log(data);
            $scope.data = data;
            $scope.isErr = false;
            $timeout(()=>{
                $scope.isErr = true;
            },5000);
            if(data.data.token){
                localStorage.uid = data.data.doc._id;
                localStorage.tokenid = data.data.token;
                $window.location.href = "dashboard.html";
            }
        },err=>{
            $scope.err = err;
            $scope.isErr = true;
            $timeout(()=>{
                $scope.isErr = false;
            },5000);
        })
    }
}])