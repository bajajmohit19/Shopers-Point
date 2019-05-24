dashboardModule.controller('admindashboardctrl',['$scope','$window','Upload','admindashboardfactory',($scope,$window,Upload,admindashboardfactory)=>{
    $scope.products = [];
    $scope.product = {};
    $scope.forms = [];
    $scope.notifications = {};
    function fetchAll(){
        let productPromise = admindashboardfactory.fetchProducts();
        productPromise.then(data=>{
            //console.log(data);
            if(data.data.status=='S'){
                $scope.products = data.data.doc;
                    angular.forEach($scope.products,(product,key)=>{
                        let promise = admindashboardfactory.fetchimage(product.img);
                        promise.then(data=>{
                            //console.log('Image isssss ',data);
                            product.img = data.data.image;
                        },err=>{
                            console.log(err);
                        })
                    })
            }
        },err=>{
            console.log(err);
        });
        let orderPromise = admindashboardfactory.fetchOrders();
        orderPromise.then(data=>{
            //console.log(data);
            if(data.data.status=='S'){
                $scope.orders = data.data.doc;
                    angular.forEach($scope.orders,(order,key)=>{
                        let promise = admindashboardfactory.fetchIds(order.pid,order.uid);
                        promise.then(data=>{
                            //console.log('order data is ',data);
                            order.product = data.data.product;
                            order.price = data.data.price * order.quantity;
                            order.user = data.data.user;
                        },err=>{
                            //console.log(err);
                        })
                    })
            }
        },err=>{
            console.log(err);
        });
        let customerPromise = admindashboardfactory.fetchUsers();
        customerPromise.then(data=>{
            //console.log(data);
            if(data.data.status=='S'){
                $scope.customers = data.data.doc;
            }
        },err=>{
            console.log(err);
        });
    }
    fetchAll();
    $scope.clear = ()=>{
        $scope.product = {};
        $scope.forms.file = {};
    }
    $scope.upload = function (file) {
        Upload.upload({
            url: '/upload',
            data: {file: file, product:$scope.product}
        }).then(resp => {
            //console.log('Success ', resp);
        },err => {
            //console.log('Error status: ' + err);
        }, evt => {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
    $scope.addProduct = ()=>{
        //console.log($scope.forms);
        if($scope.forms.uploadform.$valid){
            //console.log('scope is ', $scope);
            $scope.upload($scope.forms.file);
            //console.log($scope.product);
            let promise = admindashboardfactory.addProduct($scope.product);
            promise.then(data=>{
                if(data){
                    //console.log('data is ',data);
                    if(data.data.status == 'S'){
                        $scope.clear();
                        alert('Product Added');
                        fetchAll();
                    }
                }
            },err=>{
                //console.log('Error is ',err);
            })
        }
        else alert('Fill all details');
    }
    $scope.editProduct = (e)=>{
        let span = e.target.tagName=='SPAN'?true:false;
        //console.log(span);
        let tr
        if(span){
            tr = e.target.parentNode.parentNode.parentNode.children;
        }
        else tr = e.target.parentNode.parentNode.children;
        $scope.editable = {};
        angular.forEach(tr,(td,key)=>{
            if(td.id != 'op'){
                if(td.id == 'img'){
                    $scope.forms.file = td.childNodes[0].attributes[4].value;
                }
                else $scope.editable[td.id] = td.innerText;
            }
        });
        $scope.editable.price = parseInt($scope.editable.price);
        $scope.editable.quantity = parseInt($scope.editable.quantity);
        //console.log($scope.editable);
        $scope.update = $scope.editable;
    };
    $scope.updateProduct = ()=>{
        if($scope.forms.updateform.$valid){
            //console.log('scope is ', $scope);
            $scope.upload($scope.forms.file);
            //console.log($scope.product);
            let promise = admindashboardfactory.updateProduct($scope.editable);
            promise.then(data=>{
                if(data){
                    //console.log('updated data is ',data);
                    if(data.data.status == 'S'){
                        alert('Product Updated');
                        fetchAll();
                    }
                }
            },err=>{
                //console.log('Error is ',err);
            })
        }
        else alert('Fill all details');
    }
    $scope.deleteProduct = (e)=>{
        let result = confirm('Are you sure to delete this product');
        if(result){
            let span = e.target.tagName=='SPAN'?true:false;
            let tr
            if(span){
                tr = e.target.parentNode.parentNode.parentNode.children;
            }
            else tr = e.target.parentNode.parentNode.children;
            let _id = tr[0].innerText;
            let promise = admindashboardfactory.deleteProduct({_id});
            promise.then(data=>{
                //console.log(data);
                if(data.data.status == 'S'){
                    $scope.notifications.popup = 'Product deleted';
                    fetchAll();
                }
                else $scope.notifications.popup = 'Something went wrong. Please try again later';
            },err=>{
                $scope.notifications.popup = 'Server error';
            })
        }
    }
    $scope.deleteOrder = (e)=>{
        let result = confirm('Are you sure to delete this product');
        if(result){
            let span = e.target.tagName=='SPAN'?true:false;
            let tr
            if(span){
                tr = e.target.parentNode.parentNode.parentNode.children;
            }
            else tr = e.target.parentNode.parentNode.children;
            let _id = tr[0].innerText;
            let promise = admindashboardfactory.deleteOrder({_id});
            promise.then(data=>{
                //console.log(data);
                if(data.data.status == 'S'){
                    $scope.notifications.popup = 'Product deleted';
                    fetchAll();
                }
                else $scope.notifications.popup = 'Something went wrong. Please try again later';
            },err=>{
                $scope.notifications.popup = 'Server error';
            })
        }
    };
    $scope.signout = ()=>{
        localStorage.clear();
        $window.location.href = '/adminLogin.html'
    }
}]);