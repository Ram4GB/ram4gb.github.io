var tk='1';
var mk='1';

function kiemtradn(){
	var taikhoan= document.getElementById("taikhoan");
	var pass=document.getElementById("pass");
	if(taikhoan.value=="")
	{
		alert("Bạn chưa nhập tài khoản!!!");
		taikhoan.focus();
		end();
	}
	if(pass.value=="")
	{
		alert("Bạn chưa nhập mật khẩu!!!");
		pass.focus();
		end();
	}

	if(taikhoan.value==tk&&pass.value==mk)
	{
		alert("Đăng nhập thành công!!!");
		window.location.assign("index.html");
	}else {
		alert("Tài khoản hoặc mật khẩu không đúng !!!");
		pass.focus();
	}
}