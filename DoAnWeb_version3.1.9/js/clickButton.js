//k17 đại học sài gòn
// code cho điện thoại tạo nút tắt responsive
var x = document.getElementById("navbar");
function clickFunction(){
	if(x.className === "topnav"){
		x.className += " responsive";
	}
	else{
		x.className = "topnav";
	}
}