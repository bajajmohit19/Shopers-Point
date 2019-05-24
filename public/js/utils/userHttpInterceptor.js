app.factory('userAuthInterceptor',()=>{
    return {
        request:function(config){
          //console.log('in interceptor');
            config.headers['auth-token'] = localStorage.tokenid;
            config.headers['role'] = 'user';
            return config;
        },
        requestError: function(config) {
          return config;
        },
    
        response: function(res) {
          return res;
        },
    
        responseError: function(res) {
          return res;
        }
    }
});