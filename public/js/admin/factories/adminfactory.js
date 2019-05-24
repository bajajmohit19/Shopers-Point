adminModule.factory('adminfactory',['$http','$q','ADMIN_LOGIN_URL',($http,$q,ADMIN_LOGIN_URL)=>{
    return {
        login(adminObject){
            let defer = $q.defer();
            $http.post(ADMIN_LOGIN_URL,adminObject).then(data=>{
                defer.resolve(data);
            },err=>{
                defer.reject(err);
            });
            return defer.promise;
        }
    }
}])