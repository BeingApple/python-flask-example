
jQuery(window).load(function(){
	// lnb 높이 조정
	if(jQuery(window).height()>=jQuery(document).height()){
		var docHeight = jQuery(window).height();
		jQuery(".lnb").height(docHeight);
	}else{
		var docHeight = jQuery(".contents").height();
		jQuery(".lnb").height(docHeight);
	}
});



