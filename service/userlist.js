var httpUtil=require('../utils/http.js')
var async= require('async');
var appConfig=require('../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {    
     var url=req.originalUrl; 
	var resultData={};  
	var cid=req.query.cid ? req.query.cid : ""
	var ocid=req.query.ocid ? req.query.ocid : ""
	var parentCategory=""
	var hasSonCategory=false
	async.waterfall([
	    function (done) {
	    	var options={
		        "path":url
		    }   
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{ 
		        	resultData= result;
		        	
		            done(null, result);
		        }  
		    }) 
	    },
	    function (onearg, done) {   
	    	 var options={
		        "path":"/categorylist"
		    }  
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{   
		        	resultData['categorylist']=result; 
		            done(null, onearg);
		        }  
		    })  
	    } , 
	    function (onearg, done) {   
	    	 var options={
		        "path":"/25/recommenditemlist"
		    }  
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{   
		        	resultData['list25']=result; 
		            done(null, onearg);
		        }  
		    })  
	    } , 
	    function (onearg, done) {   
	    	 var options={
		        "path":"/27/recommenditemlist"
		    }  
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{   
		        	resultData['list27']=result; 
		            done(null, onearg);
		        }  
		    })  
	    } , 
	    function (onearg, done) {   
	    	var arr=[]; 
	    	async.each(onearg['data'], function(obj, callback) {  
			    arr.push(function(callback) {
						getUserTags(obj,callback)
					}) 
			}, function(err) { 
			     
			});  
	    	async.series(arr, 
			function(err, results) { 
				for(var i in resultData['data']){
					resultData['data'][i]['tags']=results[i]
				}
			    done(err, resultData) 
			}); 
	    }  
	],  
    function(err, results) { 
    	for(var i in resultData['categorylist']['data']){
    		
    		if(resultData['categorylist']['data'][i]['parentid']==cid){
    			hasSonCategory=true;
    			break;
    		}
    		if(resultData['categorylist']['data'][i]['id']==cid){
    			parentCategory= resultData['categorylist']['data'][i]['parentid']
    		}
    	}  
    	resultData['activeCid']=cid;    
    	resultData['hasSonCategory']=hasSonCategory;    
    	resultData['parentCategory']=parentCategory;    
    	//console.log(resultData)
    	console.log(resultData['data'][1])
    	res.render('userlist',{'results':resultData}) 	
    });   
}; 
function getUserTags(params,callback){
	var path=params['tags'].replace(appConfig.config.proxy.replace,"");
    var options={
        "path":path
    }  
    httpUtil.get(options,function(result,err){  
        if(err){
            callback(err, null);
        }else{   
            callback(null, result);
        }  
    })  
}