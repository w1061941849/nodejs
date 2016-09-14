;(function($) {
	var methods ={
		"turnPage":function(data,callback){ 
			callback
			var obj=$(this);
			obj.empty();
			var string='<ul>'; 
			if(data['pages']>0){
				if(data['has_prev']){
					string+='<li><i class="icon-chevron-left"   data-pageId="'+data['prev_num']+'" ></i></li>'; 
				}else{
					string+='<li><i class="icon-chevron-left"   style="#f4f4f4"></i></li>'; 
				} 	 
		 	 	if(data['pages']<=6) {
		 	 		for(var  i=1;i<=data['pages'];i++){ 
		 	 			if(data['page']==i){
							string+='<li><a class="active" data-pageId="'+i+'">'+i+'</a></li>';
						}else{
							string+='<li><a class=""   data-pageId="'+i+'">'+i+'</a></li>';
						} 
		 	 		}
		 	 	}else if(data['pages']>6){
		 	 		if(data['page']<=6){ 
		 	 			for(var  i=1;i<=6;i++){ 
		 	 				if(data['page']==i){
								string+='<li><a class="active"  data-pageId="'+i+'">'+i+'</a></li>';
							}else{
								string+='<li><a class=""   data-pageId="'+i+'">'+i+'</a></li>';
							}  
		 	 			}
		 	 			string+='<li>...</li>';  
		 	 		}else if(data['page']>6)  {  
		 	 				if((data['page']+2)<data['pages']){
								string+='<li><a    data-pageId="1">1</a></li>'+
		 	 						'<li>...</li>'+
							        '<li><a    data-pageId="'+(data['page']-2)+'">'+(data['page']-2)+'</a></li>'+
									'<li><a     data-pageId="'+(data['page']-1)+'">'+(data['page']-1)+'</a></li>'+
									'<li><a class="active"   data-pageId="'+data['page']+'">'+data['page']+'</a></li>'+
									'<li><a    data-pageId="'+(data['page']+1)+'">'+(data['page']+1)+'</a></li>'+
									'<li><a    data-pageId="'+(data['page']+2)+'">'+(data['page']+2)+'</a></li>'+ 
									'<li>...</li>';   
							}else{
								string+='<li><a    data-pageId="1">1</a></li>'+
		 	 						'<li>...</li>'+
							        '<li><a    data-pageId="'+(data['page']-2)+'">'+(data['page']-2)+'</a></li>'+
									'<li><a    data-pageId="'+(data['page']-1)+'">'+(data['page']-1)+'</a></li>'+
									'<li><a class="active"  data-pageId="'+data['page']+'">'+data['page']+'</a></li>';
								if((data['pages']-data['page'])>1){
									string+='<li><a    data-pageId="'+(data['page']+1)+'">'+(data['page']+1)+'</a></li>'+
										'<li><a    data-pageId="'+(data['page']+2)+'">'+(data['page']+2)+'</a></li>';
								}else{
									string+='<li><a    data-pageId="'+(data['page']+1)+'">'+(data['page']+1)+'</a></li>';
								} 	
							} 
		 	 		} 
		 	 	} 
				if(data['has_next']){
					string+='<li><i class=" icon-chevron-right"  data-pageId="'+data['next_num']+'" ></i></li>';
				}else{
					string+='<li><i class=" icon-chevron-right"   style="#f4f4f4"></i></li>'; 
				} 	 
			} 

			string+='</ul>'; 
			obj.append(string); 
			obj.find('a').click(callback);
			obj.find('i').click(callback);
		}

	} 
	$.fn.myUtils = function (method,callback) { 
		if (methods[method]) {  
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1),Array.prototype.slice.call(arguments, 2));
		}
	} 
})(jQuery, window, document); 
//修改url参数 
function replaceParamVal(url,paramName,replaceWith) { 
   	var oUrl=url;
   	var nUrl="";
   	if(url.indexOf(paramName)>=0){
   		var re=eval('/('+ paramName+'=)([^&]*)/gi');
   		nUrl = oUrl.replace(re,paramName+'='+replaceWith);
   	}else{
   		if(url.indexOf("?")>=0){
   			nUrl = oUrl+'&'+paramName+'='+replaceWith;
   		}else{
   			nUrl = oUrl+'?'+paramName+'='+replaceWith;
   		} 
   	} 
    return nUrl
}
//去除url参数
function removeParameter(url,removeParam) { 
	var re=eval('/(^\\?|&)'+ removeParam+'=[^&]*(&)?/g');
	return url.replace(re, function(p0, p1, p2) {
        return p1 === '?' || p2 ? p1 : '';
    });  
}
//获取url参数
function getUrlParameter(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}