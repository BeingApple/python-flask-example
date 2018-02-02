var shareComp = false;

window.fbAsyncInit = function() {
	FB.init({
	  appId      : '1083260691730747',
	  xfbml      : true,
	  version    : 'v2.10'
	});
	FB.AppEvents.logPageView();
  };

  (function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/en_US/sdk.js";
	 fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

Kakao.init('9ebdb2dd0498a7758898e25a621f35ec');

//쿠키값 저장
function setCookie(name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + exdate.toUTCString() + ";"   
}

// 쿠키 값 불러오기
function getCookie( name ) {
  var nameOfCookie = name + "=";
  var x = 0;
  while ( x <= document.cookie.length )
  {
	var y = (x+nameOfCookie.length);
	if ( document.cookie.substring( x, y ) == nameOfCookie ) {
	  if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
		endOfCookie = document.cookie.length;
	  return unescape( document.cookie.substring( y, endOfCookie ) );
	}
	x = document.cookie.indexOf( " ", x ) + 1;
	if ( x == 0 )
	  break;
  }
  return "";
}

//페이스북 공유
function facebookShare(){
	FB.ui({
		method: 'share',
		href: 'http://gatemanevent.com/event170825',
	}, function(response){});

	shareComp = true;
}

//카카오 공유
function kakaoShare(){
	Kakao.Story.share({
		url: 'http://gatemanevent.com/event170825',
		text: '스마트 오프닝 솔루션, 스마트 리빙팩을 경험하라!'
	});

	shareComp = true;
}

//네이버 공유
function naverShare() {
	var url = encodeURI(encodeURIComponent("http://gatemanevent.com/event170825"));
	var title = encodeURI('스마트 오프닝 솔루션, 스마트 리빙팩을 경험하라!');
	var shareURL = "http://share.naver.com/web/shareView.nhn?url=" + url + "&title=" + title;
	//document.location = shareURL;
	window.open(shareURL, '네이버로 게이트맨 이벤트 공유하기', "width=430,height=630");

	shareComp = true;
}

function event5Validation() {
	if ($("[name=marketingAgree]:checked").val() == "" || $("[name=marketingAgree]:checked").val() == undefined )
	{
		alert("마케팅 및 광고 활용 동의 여부를 선택해 주십시오.");
		return false;
	}
	if ($("[name=agree1]:checked").val() != "Y")
	{
		alert("이벤트 참여 시 공지사항을 확인해 주십시오.");
		return false;
	}

	if ($("[name=agree2]:checked").val() != "Y")
	{
		alert("개인정보 수집 동의를 확인해 주십시오.");
		return false;
	}

	if (($("#evt5userName").val().length < 2) || ($("#evt5userName").val().length > 10))
	{
		alert( "이름을 정확히 입력해 주십시오.");
		$("#evt5userName").focus();
		return false;
	}

	if (!(($("#evt5phone1").val().length == 3) && ($.isNumeric($("#evt5phone1").val()))))
	{
		alert( "연락처를 정확히 입력해 주십시오.");
		$("#evt5phone1").focus();
		return false;
	}

	if (!(($("#evt5phone2").val().length == 4) && ($.isNumeric($("#evt5phone2").val()))))
	{
		alert( "연락처를 정확히 입력해 주십시오.");
		$("#evt5phone2").focus();
		return false;
	}

	if (!(($("#evt5phone3").val().length == 4) && ($.isNumeric($("#evt5phone3").val()))))
	{
		alert( "연락처를 정확히 입력해 주십시오.");
		$("#evt5phone3").focus();
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

	if (($("#snsUrl").val().length <= 0))
	{
		alert( "공유한 링크를 정확히 입력해 주십시오.");
		$("#snsUrl").focus();
		return false;
	}

	return true;
}

function event5Proc(cbCall) {
	if (event5Validation())
	{
		evt5data = {
			userName : $("#evt5userName").val(),
			phone : $("#evt5phone1").val() + $("#evt5phone2").val() + $("#evt5phone3").val(),
			zipCode : $("#zipcode").val(),
			address : $("#addr").val(),
			addressDetail : $("#addrDetail").val(),
			snsUrl : $("#snsUrl").val(),
			marketingAgree : $("[name=marketingAgree]:checked").val(),
			agree1 : $("[name=agree1]:checked").val(),
			agree2 : $("[name=agree2]:checked").val()
		};


		$.ajax({
			url: "/api/event05_proc",
			data: evt5data,
			method: "POST"
		}).done(function(rtnStr) {
			if (rtnStr == "페이스북" || rtnStr == "카카오스토리" || rtnStr == "네이버"|| rtnStr == "기타"){
				cbCall(rtnStr);
			} else {
				alert(rtnStr);
			}
		});
	}
}

function event6Validation() {

	if (($("#evt6userName").val().length < 2) || ($("#evt6userName").val().length > 10))
	{
		alert( "이름을 정확히 입력해 주십시오.");
		$("#evt6userName").focus();
		return false;
	}

	if (!(($("#evt6phone1").val().length == 3) && ($.isNumeric($("#evt6phone1").val()))))
	{
		alert( "연락처를 정확히 입력해 주십시오.");
		$("#evt6phone1").focus();
		return false;
	}

	if (!(($("#evt6phone2").val().length == 4) && ($.isNumeric($("#evt6phone2").val()))))
	{
		alert( "연락처를 정확히 입력해 주십시오.");
		$("#evt6phone2").focus();
		return false;
	}

	if (!(($("#evt6phone3").val().length == 4) && ($.isNumeric($("#evt6phone3").val()))))
	{
		alert( "연락처를 정확히 입력해 주십시오.");
		$("#evt6phone3").focus();
		return false;
	}

	return true;
}

function event6Proc(cbCall) {
	if (event6Validation())
	{
		evt6data = {
			userName : $("#evt6userName").val(),
			phone : $("#evt6phone1").val() + $("#evt6phone2").val() + $("#evt6phone3").val(),
		};


		$.ajax({
			url: "/api/event06_proc",
			data: evt6data,
			method: "POST"
		}).done(function(rtnStr) {
			if (rtnStr == "true"){
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