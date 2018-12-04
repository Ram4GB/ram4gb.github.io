var x = document.getElementById("navbar");
function clickFunction(){
	if(x.className === "topnav"){
		x.className += " responsive";
	}
	else{
		x.className = "topnav";
	}
}