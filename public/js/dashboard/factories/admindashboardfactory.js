dashboardModule.factory('admindashboardfactory',['$http','FETCH_PRODUCTS','FETCH_ORDERS','FETCH_IDS','FETCH_USERS','ADD_PRODUCT','UPDATE_PRODUCT','FETCH_IMAGE','DELETE_PRODUCT','DELETE_ORDER',($http,FETCH_PRODUCTS,FETCH_ORDERS,FETCH_IDS,FETCH_USERS,ADD_PRODUCT,UPDATE_PRODUCT,FETCH_IMAGE,DELETE_PRODUCT,DELETE_ORDER)=>{
    return {
        fetchProducts(){
            return $http.post(FETCH_PRODUCTS);
        },
        fetchOrders(){
            return $http.post(FETCH_ORDERS);
        },
        fetchIds(pid,uid){
            return $http.post(FETCH_IDS,{pid,uid});
        },
        fetchUsers(){
            return $http.post(FETCH_USERS);
        },
        addProduct(productObject){
            return $http.post(ADD_PRODUCT,productObject);
        },
        updateProduct(productObject){
            return $http.post(UPDATE_PRODUCT,productObject);
        },
        fetchimage(url){
            return $http.post(FETCH_IMAGE,{url});
        },
        deleteProduct(id){
            return $http.post(DELETE_PRODUCT,id);
        },
        deleteOrder(id){
            return $http.post(DELETE_ORDER,id);
        }
    }
}])