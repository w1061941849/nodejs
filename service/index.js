var httpUtil=require('../utils/http.js')
var async= require('async');
exports.showHtml = function (req, res, next) {   
    async.series({
        categorylist: function(callback){
            var options={ "path":"/categorylist" }  
	  		httpUtil.get(options,function(result,err){ 
		   		if(err){
		   			callback(err, null);
		   		}else{  
		   			callback(null, result);
		   		} 
		   	}) 
        },
        list1: function(callback){
            var options={ "path":"/1/recommenditemlist" }  
	  		httpUtil.get(options,function(result,err){ 
		   		if(err){
		   			callback(err, null);
		   		}else{  
		   			callback(null, result);
		   		} 
		   	}) 
        } , 
        list2: function(callback){
            var options={ "path":"/2/recommenditemlist" }  
	  		httpUtil.get(options,function(result,err){ 
		   		if(err){
		   			callback(err, null);
		   		}else{  
		   			callback(null, result);
		   		} 
		   	}) 
        } 

    },
    function(err, results) {   
    	//console.log(results) 
    	res.render('index',{"results":results}) 	
    });
   
 //	res.render('index',{'results':results});
	
}; 