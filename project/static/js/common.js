
function makeBaseUrl(url){
	var urlArr = url.split("/");
	var returnUrl = "/"+urlArr[1]+"/"+urlArr[2]+"/";
	return returnUrl;
}

function goPage(modUrl,idx){
	var baseUrl = makeBaseUrl(location.pathname);

	if(idx != null && idx != undefined && idx > 0){
		$("#searchForm").prepend("<input type='hidden' id='idx' name='idx' value='"+idx+"' />");
	}

	$("#searchForm").attr("action",baseUrl+modUrl);
	$("#searchForm").submit();
}

var oEditors = [];

jQuery(function() {
	jQuery(".datepicker" ).datepicker({    
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)','7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		showOn: 'both',
		buttonText: "달력",
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
	  	yearRange: "-100:+100",
	  	buttonImage: '/images/calendar.png', // 버튼 이미지 필요시 추가
	  	buttonImageOnly: true,
	  	buttonText: "Select date",
	  	dateFormat: "yy-mm-dd",
	  	monthNames: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
	  	dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
	  	showMonthAfterYear: true 
	});
	
	$.datepicker._gotoToday = function(id) { 
		$(id).datepicker('setDate', new Date()).datepicker('hide').blur(); 
	};
});

function chTextEmpty(obj){
	if(obj.replace(/\s/g,"").length > 0){
		return false;
	}
	else{
		return true;
	}
}

function chTextAreaEmpty(obj){
	if(obj.replace(/&lt;|&gt;|&nbsp;|nbsp;|&amp;|p|\/|\s|\n|<br>|<p>|<\/p>/gi, '').length >  0){
		return false;
	}else{
		return true;
	}
	
	

}


function chkName(){
	var objEv = event.srcElement;
	var num ="{}[]()<>?_|~`!@#$%^&*-+:;\"'\\/ ";    //입력을 막을 특수문자 기재.
	event.returnValue = true;

	for (var i=0;i<objEv.value.length;i++)
	{
		if(-1 != num.indexOf(objEv.value.charAt(i)))
			event.returnValue = false;
	}

	if (!event.returnValue)
	{
		alert("올바른 입력 형식이 아닙니다.\n(-,@ 외 특수문자 입력 불가)");
		objEv.value="";
	}
}

function onlyNumber(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;

		if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || (keyID == 109) || (keyID == 8) || (keyID == 46) || (keyID == 37) || (keyID == 39) || (keyID == 189))
			return;
		else
			return false;
	}

function removeChar(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || (keyID == 109) || (keyID == 8) || (keyID == 46) || (keyID == 37) || (keyID == 39) || (keyID == 189)) 
		return;
	else
		event.target.value = event.target.value.replace(/[^0-9:\-]/gi,"");
}

function chkEmail() {
    var tmpEmail = event.srcElement;
    var emailExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
    var msg1 = "올바른 입력 형식이 아닙니다.";
    
    if (tmpEmail.value.length > 0) {
      if (!tmpEmail.value.match(emailExp)) {
        $(".emailChkMsg").addClass('color-pink');
        $(".emailChkMsg").text(msg1);
        return;
      }else{
          $(".emailChkMsg").empty();
          $(".emailChkMsg").removeClass('color-pink');
          $(".emailChkMsg").text("");
      }
    }
  }