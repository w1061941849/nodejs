var httpUtil=require('../utils/http.js')

exports.categorylist = function (req, res, next) {  
   var options={
         "path":"/categorylist"
   }
   httpUtil.get(options,function(result,err){
         if(err){
            res.send(err);
         }else{
            res.send(result);
         } 
   })

}; 
exports.usercategorys = function (req, res, next) {  
   var options={
         "path":"/"+req.session.user.id+"/usercategorys"
   }
   console.log(options)
   httpUtil.get(options,function(result,err){
         if(err){
            res.send(err);
         }else{
            res.send(result);
         } 
   })

}; 


