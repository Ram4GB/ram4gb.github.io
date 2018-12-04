function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}
function timkiemthuong(){
	var txttimkiem = document.getElementById("txttimkiem1");
	if(txttimkiem.value == ""){
		alert("Vui lòng nhập sản phẩm cần tìm");
	}
	else{
		//Chuyển đến trang tìm kiếm sp như mong muốn
		//index.html?timkiem?tentimkiem
		txttimkiem.value = xoa_dau(txttimkiem.value).toLowerCase();
		//alert(txttimkiem);
		window.location.assign("index.html?timkiem&"+txttimkiem.value+'&0');
	}
}
function timkiemnangcao(){
	//index.html?timkiemnangcao&timkiem=txttimkiem2&danhmucsanpham=sachta&tacgia=John+Green&giatu=value&giaden=value&vitritrang=0
	// alert(document.getElementById("danhmuc").value);
	// alert(document.getElementById("tacgia").value);
	// alert(document.getElementById("giatu").value);
	// alert(document.getElementById("giaden").value);
	// alert(document.getElementById("txttimkiem2").value);
	var dm = document.getElementById("danhmuc").value;
	var tg = document.getElementById("tacgia").value;
	var giatu = document.getElementById("giatu").value;
	var giaden = document.getElementById("giaden").value;
	var txttimkiem2 = document.getElementById("txttimkiem2").value;

	tg = xoa_dau(tg).toLowerCase();
	txttimkiem2 = xoa_dau(txttimkiem2).toLowerCase();


	if (txttimkiem2 == "") {
		window.location.assign('index.html?timkiemnangcao&timkiem='+'SCRIPT_SHOW_ALL'+'&danhmuc='+dm+'&tacgia='+tg+'&giatu='+giatu+'&giaden='+giaden+'&vitritrang=0');
	}
	//'index.html?timkiemnangcao&tim='+txttimkiem2+'&danhmuc='+dm+'&tacgia='+tg+'&giatu='+gt+'&giaden='+giaden+'&vitritrang=0';
	else window.location.assign('index.html?timkiemnangcao&timkiem='+txttimkiem2+'&danhmuc='+dm+'&tacgia='+tg+'&giatu='+giatu+'&giaden='+giaden+'&vitritrang=0');
}