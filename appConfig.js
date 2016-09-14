exports.config = {
    proxy:{
        host:"10.0.1.122",
      // host:"139.196.183.6",
        port:8080,
        path:"/api/v1.0",
        replace:"http://10.0.1.122:8080/api/v1.0"
    } 
};