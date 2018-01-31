var fbCbCall;
var event1comp = false;
var event2comp = false;

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1083260691730747',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.8'
  });  
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/ko_KR/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));


function checkLoginState() {
  FB.getLoginStatus(function (response) {
	statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {  
  var info = response;
  
  if(response.status === 'connected'){
    FB.api('/me', function (fbUser) {
	  FB.ui({
		method: 'share'
		,href: "http://gatemanevent.com/event170615"
		,display : 'popup'
		}, function(info) {
		if (event1Validation() && info && !info.error_code) {
			$.ajax({
				url: "/api/fbShareChk",
				data: fbUser,
				method: "POST"
			}).done(function() {
				evt1data = {
					userName : $("#evt1name").val(),
					phone : $("#evt1phone1").val() + $("#evt1phone2").val() + $("#evt1phone3").val()
				};

				$.ajax({
					url: "/api/event01_proc",
					data: evt1data,
					method: "POST"
				}).done(function(rtnStr) {
					if (rtnStr == "true")
					{
						event1comp = true;
						fbCbCall();
					} else {
						alert(rtnStr);
					}
				});
			});

		}else{
		  //alert('Error while posting.');
		}    
	});
		          
    });    
/*   }else if (response.status === 'not_authorized'){
    console.log("not_authorized"); */
  }else{
    return fbLogin();
  }  
}

function fbLogin() {
  FB.login(function(response) {
    if (response.authResponse) {      
      FB.api('/me', function(response) {
        checkLoginState();
      });
     } else {
       //$('.snsNo').show();
     }
  });  
}

function event1Validation() {
	if (event1comp)
	{
		alert("이벤트에 이미 참여하셨습니다.");
		return false;
	}

	if ($("[name=evt_notice]:checked").val() != "Y")
	{
		alert("이벤트 참여 시 공지사항을 확인해 주십시오.");
		return false;
	}

	if ($("[name=evt_privacy]:checked").val() != "Y")
	{
		alert("개인정보 수집 동의를 확인해 주십시오.");
		return false;
	}

	if (($("#evt1name").val().length < 2) || ($("#evt1name").val().length > 10))
	{
		alert( "이름을 정확히 입력해 주십시오.");
		$("#evt1name").focus();
		return false;
	}

	if (!(($("#evt1phone1").val().length == 3) && ($.isNumeric($("#evt1phone1").val()))))
	{
		alert( "연락처를 정확히 입력해 주십시오.");
		$("#evt1phone1").focus();
		return false;
	}

	if (!(($("#evt1phone2").val().length == 4) && ($.isNumeric($("#evt1phone2").val()))))
	{
		alert( "연락처를 정확히 입력해 주십시오.");
		$("#evt1phone2").focus();
		return false;
	}

	if (!(($("#evt1phone3").val().length == 4) && ($.isNumeric($("#evt1phone3").val()))))
	{
		alert( "연락처를 정확히 입력해 주십시오.");
		$("#evt1phone3").focus();
		return false;
	}

	return true;
}

function event1Proc(cbCall) {
	if (event1Validation())
	{
		fbCbCall = cbCall;
		checkLoginState();
	}
}

function event2Validation() {
	if (event2comp)
	{
		alert("이벤트에 이미 참여하셨습니다.");
		return false;
	}

	if ($("[name=evt2_notice]:checked").val() != "Y")
	{
		alert("이벤트 참여 시 공지사항을 확인해 주십시오.");
		return false;
	}

	if ($("[name=evt2_privacy]:checked").val() != "Y")
	{
		alert("개인정보 수집 동의를 확인해 주십시오.");
		return false;
	}

	if (($("#evt2name").val().length < 2) || ($("#evt2name").val().length > 10))
	{
		alert("이름을 정확히 입력해 주십시오.");
		$("#evt2name").focus();
		return false;
	}

	if (!(($("#evt2phone1").val().length == 3) && ($.isNumeric($("#evt2phone1").val()))))
	{
		alert( "연락처를 정확히 입력해 주십시오.");
		$("#evt2phone1").focus();
		return false;
	}

	if (!(($("#evt2phone2").val().length == 4) && ($.isNumeric($("#evt2phone2").val()))))
	{
		alert( "연락처를 정확히 입력해 주십시오.");
		$("#evt2phone2").focus();
		return false;
	}

	if (!(($("#evt2phone3").val().length == 4) && ($.isNumeric($("#evt2phone3").val()))))
	{
		alert( "연락처를 정확히 입력해 주십시오.");
		$("#evt2phone3").focus();
		return false;
	}

	if (($("#zipcode").val().length != 5))
	{
		alert("우편번호 검색을 통해 주소를 입력해 주십시오.");
		$("#zipcode").focus();
		return false;
	}

	if ($("#addr").val().length < 2)
	{
		alert("우편번호 검색을 통해 주소를 입력해 주십시오.");
		$("#addr").focus();
		return false;
	}

	if ($("#addrDetail").val().length < 2)
	{
		alert("상세 주소를 입력해 주십시오.");
		$("#addrDetail").focus();
		return false;
	}

	return true;
}

function event2Proc(cbCall) {
	if (event2Validation())
	{
		evt2data = {
			userName : $("#evt2name").val(),
			phone : $("#evt2phone1").val() + $("#evt2phone2").val() + $("#evt2phone3").val(),
			zipCode : $("#zipcode").val(),
			address : $("#addr").val(),
			addressDetail : $("#addrDetail").val()
		};


		$.ajax({
			url: "/api/event02_proc",
			data: evt2data,
			method: "POST"
		}).done(function(rtnStr) {
			if (rtnStr == "true")
			{
				event2comp = true;
				cbCall();
			} else {
				alert(rtnStr);
			}
		});
	}
}

function searchPostcode() {
	new daum.Postcode({
		oncomplete: function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			// 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
			var extraRoadAddr = ''; // 도로명 조합형 주소 변수

			// 법정동명이 있을 경우 추가한다. (법정리는 제외)
			// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
			if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
				extraRoadAddr += data.bname;
			}
			// 건물명이 있고, 공동주택일 경우 추가한다.
			if(data.buildingName !== '' && data.apartment === 'Y'){
			   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
			}
			// 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
			if(extraRoadAddr !== ''){
				extraRoadAddr = ' (' + extraRoadAddr + ')';
			}
			// 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
			if(fullRoadAddr !== ''){
				fullRoadAddr += extraRoadAddr;
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.getElementById('zipcode').value = data.zonecode; //5자리 새우편번호 사용
			document.getElementById('addr').value = fullRoadAddr;
		}
	}).open();
}