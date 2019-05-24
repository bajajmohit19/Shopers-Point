userModule.factory('userdashboardfactory',['$http','FETCH_PRODUCTS','FETCH_IMAGE','CHANGE_PASSWORD','CHECK_USER','CHECK_PRODUCT','UPDATE_PROFILE','BUY_PRODUCT',($http,FETCH_PRODUCTS,FETCH_IMAGE,CHANGE_PASSWORD,CHECK_USER,CHECK_PRODUCT,UPDATE_PROFILE,BUY_PRODUCT)=>{
    return {
        fetchimage(url){
            return $http.post(FETCH_IMAGE,{url});
        },
        fetchProducts(){
            return $http.post(FETCH_PRODUCTS);
        },
        detectUser(id){
            let url = CHECK_USER + '?id='+id;
            console.log(url);
            return $http.get(url);
        },
        checkProduct(id){
            console.log(id);
            return $http.post(CHECK_PRODUCT,id);
        },
        buy(id,uid){
            return $http.post(BUY_PRODUCT,{id,uid});
        },
        updateProfile(obj){
            return $http.post(UPDATE_PROFILE,obj);
        },
        changePassword(id,currentPassword,newPassowrd){
            return $http.post(CHANGE_PASSWORD,{id,old:currentPassword,new:newPassowrd});
        }
    }
}])