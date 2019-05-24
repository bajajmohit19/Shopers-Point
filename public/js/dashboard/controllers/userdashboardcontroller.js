userModule.controller('userdashboardctrl',['$scope','$window','userdashboardfactory','storageService',($scope,$window,userdashboardfactory,storageService)=>{
    $scope.productDetails = {};
    $scope.products = [];
    $scope.forms = {};
    $scope.editInfo = {};
    $scope.changepwd = {};
    const init = ()=>{
        //console.log('init');
        if(sessionStorage.details && sessionStorage.details.length > 1){
            $scope.productDetails = JSON.parse(storageService.get('details'));
            //console.log('In session ',$scope.productDetails);
        }
    }
    init();
    const checkUser = ()=>{
        let promise = userdashboardfactory.detectUser(localStorage.uid);
        promise.then(data=>{
            //console.log(data);
            $scope.user = data.data.user;
        },err=>{
            //console.log(err);
        });
    }
    checkUser();
    const fetchAllProducts = ()=>{
        let promise = userdashboardfactory.fetchProducts();
        promise.then(data=>{
            //console.log(data);
            $scope.products = data.data.doc;
            angular.forEach($scope.products,(product,key)=>{
                let promise = userdashboardfactory.fetchimage(product.img);
                promise.then(data=>{
                    //console.log('Image isssss ',data);
                    product.img = data.data.image;
                },err=>{
                    //console.log(err);
                })
            })
        },err=>{
            //console.log(err);
        })
    }
    fetchAllProducts();
    $scope.fetchProductDetails = (e)=>{
        //console.log('In details',e);
        let target;
        if(e.target.tagName == 'IMG'){
            target = e.target.parentNode.parentNode;
        }
        else if(e.target.tagName == 'SPAN'||e.target.tagName == 'H2'||e.target.tagName == 'P'){
            target = e.target.parentNode;            
        }
        else target = e.target;
        let backup={};
        //console.log(target.children[1].innerText);
        $scope.productDetails.pid = target.children[0].innerText;
        //$scope.productDetails.img = target.children[1].children[0].src;
        let promise = userdashboardfactory.checkProduct({_id:$scope.productDetails.pid});
        promise.then(data=>{
            //console.log('Check product data is ',data);
            $scope.productDetails.pname = data.data.doc.name;
            $scope.productDetails.price = data.data.doc.price;
            $scope.productDetails.quantity = data.data.doc.quantity;
            $scope.productDetails.description = data.data.doc.description;
            storageService.save('details',JSON.stringify($scope.productDetails));
        },err=>{
            //console.log(err);
        })
        $window.location.href = '#/productdetails';
    }
    $scope.buy = ()=>{
        let promise = userdashboardfactory.buy($scope.productDetails.pid,localStorage.uid);
        promise.then(data=>{
            //console.log(data);
            $scope.productDetails.quantity = data.data.doc.quantity;
            $window.location.href = '#/orderplaced';
        },err=>{
            //console.log(err);
        })
    }
    $scope.signout = ()=>{
        localStorage.clear();
        $window.location.href = '/#/signin'
    }
    $scope.edit = ()=>{
        angular.forEach($scope.user,(value,key)=>{
            $scope.editInfo[key] = value;
        })
        //console.log($scope.editInfo);
    }
    $scope.editProfile = ()=>{
        //console.log($scope.forms.editform);
        if($scope.forms.editform.$invalid){
            alert('Please fill the correct details');
            return;
        }
        let promise = userdashboardfactory.updateProfile($scope.editInfo);
        promise.then(data=>{
            //console.log(data);
            $scope.user = data.data.doc;
        },err=>{
            //console.log(err);
        })
    }
    $scope.pwdedit = ()=>{
        if($scope.forms.pwdform.$invalid){
            alert('Please fill the all mandetory columns');
            return;
        }
        if($scope.pwd){
            let promise = userdashboardfactory.changePassword($scope.user._id,$scope.changepwd.currentpassword,$scope.changepwd.newpassword);
            promise.then(data=>{
                if(data.data.status == 'F'){
                    alert('Incorrect password');
                    $scope.changepwd.currentpassword = '';
                    $scope.changepwd.newpassword = '';
                    $scope.changepwd.newpassword2 = '';
                }
                else{
                    alert('Password changed');
                    $scope.changepwd.currentpassword = '';
                    $scope.changepwd.newpassword = '';
                    $scope.changepwd.newpassword2 = '';
                }
            },err=>{
                alert('Something went wrong, please try again after some time');
                $scope.changepwd.currentpassword = '';
                $scope.changepwd.newpassword = '';
                $scope.changepwd.newpassword2 = '';
            })
        }
    }
    $scope.doCheck = ()=>{
        console.log($scope.editInfo._id);
        if($scope.changepwd.newpassword.length <= $scope.changepwd.newpassword2.length && $scope.changepwd.newpassword != $scope.changepwd.newpassword2){
            $scope.pwd = false;
        }
        else $scope.pwd = true;
    }
}])
