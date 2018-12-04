//file tao thanh aside
//localStorage.key(i) ra được cái key đứng vị trí thứ i
//localStorage.getItem(key) ra được value của key
//localStorage.setItem(key,value) tạo 1 biến là key và giá trị là value trong localStorage
function taoMenu(){
	var s = "";
	var aside = document.getElementById("aside");
	for(var i = 0 ; i < danhmuc.length ; i++){
		s = s + '<a class="aside" href="index.html?'+danhmuc[i].key+'&0">'+'<img src="'+iconaside[i]+'"/>'+danhmuc[i].name+'</a>';
	}	
	aside.innerHTML = s;
}
function xoasanphamgiohang(key,vitri){
	var lenh = confirm("Bạn có chắc là muốn xóa đi sản phẩm này khỏi giỏ hàng");
	if(lenh){
		localStorage.removeItem(key);
	}
	window.location.assign("index.html?giohang");
}
function setGioHang()
{
	// cg(tatcasp[].src);onsole.lo
	s = '';
	var tongtien = 0;
	var k = 0 ;
	for (var i = 0; i < localStorage.length; i++)
	{
		// console.log(localStorage.key(i)); //localStorage.getItem() lấy được giá trị trong cái key;
		// console.log(localStorage.getItem(localStorage.key(i))); //localStorage.key(i) lấy được tên sp thứ i
		// console.log(localStorage.key(i)); // lấy key ra;
		// console.log(localStorage.length);
		if(localStorage.key(i).length <=8 && localStorage.key(i) != "batdangnhap" && localStorage.key(i).indexOf("order-") == -1) 
		// VÌ MẬT KHẨU TỪ 8 KÍ TỰ TRỞ LÊN VÀ CÓ 1 KEY ĐÁNH DẤU ĐÃ ĐĂNG NHẬP "batdangnhap" NÊN CÒN LẠI SẼ LÀ KEY SP
		{
			var keysp = parseInt(localStorage.key(i))-1; //ĐÂY LÀ KEY SẢN PHẨM TRỪ 1 DO SP THỨ 0 MÀ KEY THỨ 1
			//console.log(tatcasp[keysp].price);
			//TÍNH TỔNG TIỀN
			tongtien = tongtien + parseInt(tatcasp[keysp].price)*parseInt(localStorage.getItem(localStorage.key(i)));
			console.log(localStorage.key(i));
			console.log(localStorage.key(i).length);
			console.log(i);
			s = s 
			+'<div class="giohang2">'
					+'<div class="contentbox">'
						+'<div class="img">'
							+'<img src="'+tatcasp[keysp].src+'">'
						+'</div>'
						+'<div class="content">'
							+'<div class="title">'+tatcasp[keysp].title+'</div>'
							+'<div class="author">'+tatcasp[keysp].author+'</div><div class="Giá">'+tatcasp[keysp].price+'đ</div>'
							+'<input class="pre" onclick="giamsoluong('+tatcasp[keysp].key+')" type="button" name="" value="-">'
							+'<input class="soluong" onchange=khungsoluong('+tatcasp[keysp].key+','+i+') id="sl'+i+'" type="text" name="" value="'+localStorage.getItem(localStorage.key(i))+'">'
							+'<input class="next" onclick="tangsoluong('+tatcasp[keysp].key+')" type="button" name="" value="+">'
							+'<button onclick="xoasanphamgiohang('+tatcasp[keysp].key+','+i+')"><i class="fas fa-trash-alt"></i> Xóa</button>'
							+'<button onclick="yeuthich()"><i style="color:red;font-size:19px;" class="fas fa-heart"></i> Yêu thích</button>'
						+'</div>'
					+'</div>'
				+'</div>'
		}
	}
	document.getElementById("content").innerHTML = s;
	console.log('tongtien '+tongtien);
	//ĐỔI SEARCH-BAR-2 THÀNH TỔNG TIỀN
	document.getElementById("tongtien").innerHTML = "Tổng tiền là : "+tongtien+'đ';
	//ĐỔI TỰA ĐỀ THÀNH GIỎ HÀNG
	document.getElementById("tuade").innerHTML = "Giỏ hàng";
	//THÊM NÚT MUA Hàng
	document.getElementById("muahang").innerHTML = '<button class="nutmuahang" onclick="muahang()">Mua hàng</button>';
	document.getElementById("content").className = "col-12";
	window.scrollTo(0,684);
}
function khungsoluong(key,i){
	var gt = parseInt(document.getElementById("sl"+i).value);
	localStorage.setItem(key,gt);
	window.location.assign("index.html?giohang");
}
function giamsoluong(key){
	var gt = parseInt(localStorage.getItem(key));
	gt = gt -1;
	if(gt != 0)
		localStorage.setItem(key,gt);
	else
		localStorage.removeItem(key);
	window.location.assign("index.html?giohang");
}
function tangsoluong(key){
	var gt = parseInt(localStorage.getItem(key));
	gt = gt + 1;
	localStorage.setItem(key,gt);
	window.location.assign("index.html?giohang");
}
function kiemtraDangNhap(){
	if (localStorage.getItem("batdangnhap") == null) // chừa cho 1 ô đăng kí lưu tài khoản
	{
		alert("Mời đăng nhập trước khi mua hàng");
		return false;
	}
	else
	{
		return true;
	}
}
function muahang()
{
	if(kiemtraDangNhap())
	{
		var confirm = window.confirm("Bạn có chắc chắn muốn mua hàng ");
		if(confirm) //1 la key thanh công 2 là cái username
		{
			var max = 0;
			// tìm giá trị cao nhất cao của order- tăng dần lên
			for (var i = 0; i < localStorage.length; i++) {
				if(localStorage.key(i).indexOf("order-") != -1)// tìm các order-
				{
					var x = localStorage.key(i);
					var vitri = x.split('-'); // tách theo dấu -
					x = parseInt(vitri[1]);
					if(x > max){
						max  = 	x;}
				}
			}
			//order-0(username,sp0:,sl0:,sp1:,sl1:);
			////order-1(username,sp0:,sl0:,sp1:,sl1:);
			/////order-2(username,sp0:,sl0:,sp1:,sl1:);
			var object = {
				username:'',
				key:[],
				sl:[],
				xuli:0,
			}; // tạo 1 object để lưu đơn hàng
			object.username = localStorage.getItem("batdangnhap"); // lấy được username;
			var k = 0;
			for(var  i = 0 ; i < localStorage.length;i++){
				if(localStorage.key(i) != 'batdangnhap' && localStorage.key(i).length <= 8 && localStorage.key(i).indexOf("order-") == -1)
				{
					// console.log(localStorage.key(i));
					// console.log(localStorage.getItem(localStorage.key(i)));
					object.key[k] = localStorage.key(i); //lưu key
					object.sl[k] = localStorage.getItem(localStorage.key(i)); // luu sl
					k++;
				}
			}
			console.log(object);
			localStorage.setItem("order-"+(max+1),JSON.stringify(object)); //giỏ hàng kế tiếp

			//xóa các item ra khỏi localStorage
			var i = 0;
			while(i < localStorage.length){
				if(localStorage.key(i) != 'batdangnhap' && localStorage.key(i).length <= 8 && localStorage.key(i).indexOf("order-") == -1)
					{
						localStorage.removeItem(localStorage.key(i)); // remove
						i = 0; // chạy lại từ đầu mảng
					}
					else{ 
						i++;
					}
			}
			alert("Mua thành công");
			window.location.assign("index.html?giohang");		
		}
	}
}
function yeuthich() {
	alert("Bạn đã thích 1 sản phẩm");
}
function kiemtramatkhau(){
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	// alert(username);
	// alert(password);
	// alert(localStorage.getItem(username));
	if(username == "" || password == ""){
		alert("Cần nhập đầy đủ");
	}
	else
	{
		var obj = JSON.parse(localStorage.getItem(username)) 
		if(localStorage.getItem(username) == null) alert("Không có tên tài khoản đó"); //NẾU KEY CHƯA CÓ THÌ THÔNG BÁO CHƯA CÓ TÀI KHOẢN ĐÓ
		else
		if(password != obj.password)
		{
			alert("Sai mật khẩu");
		}
		else
		{
			alert("Đăng nhập thành công");
			localStorage.setItem("batdangnhap",username);
			window.location.assign("index.html");
		}
	}
}
function kiemtradangki(){
	var username2 =document.getElementById("username2").value;
	var password2 = document.getElementById("password2").value;
	var password3 = document.getElementById("password3").value;
	var number = document.getElementById("number").value;
	var email = document.getElementById("email").value;
	if(username2 == "" || password2 == "" || password3 == "")
	{
		alert("Mời điền đầy đủ");
	}
	else{
		if(password2 != password3)
		{
			alert("2 mật khẩu không trùng khớp ");
		}
		else if(username2.length <= 8) 
			{	
				alert("Tài khoản cần trên 8 kí tự");
			}
			else
			{
				//localStorage.clear();
				var obj = {};
				var gioitinh = document.formdk.gioitinh.value;
				var ngaysinh = document.formdk.date.value;
				obj.username = username2;
				obj.password = password2;
				obj.gioitinh = gioitinh;
				obj.ngaysinh = ngaysinh;
				obj.number = number;
				obj.email = email;
				//bỏ object khách hàng vào trong localStorage
				localStorage.setItem(username2,JSON.stringify(obj));
				alert("Đăng kí thành công");
				window.location.assign("index.html?dangnhap");
			}
	}
}
function clearFunction()
{
	localStorage.removeItem('batdangnhap');
	alert("Đăng xuất thành công");
	window.location.assign("index.html");
}
function setSanPhamNoiBat(){
	var s = "";
			for (var i = 0; i < sanphamnoibat.length; i++) {
				s = s + '<div class="responsive"><div class="gallery"><a href="chitietsp.html?'+sanphamnoibat[i].key+'"><img src='+sanphamnoibat[i].src+'><div class="desc"><div class="title">'+sanphamnoibat[i].title+'</div><div class="author">'+sanphamnoibat[i].author+'</div><div class="price">'+sanphamnoibat[i].price+'đ <del>2000000đ</del></div></div></a><div class="giohang"><button onclick="bovaogiohang('+sanphamnoibat[i].key+')">Thêm vào giỏ</button></div></div></div>';
			}
			document.getElementById("content").innerHTML = s;	
}
function layurl(){
	// alert(gia);
	var mangtheotensanpham = []; // mang chua cac sp co ten nhu trong text
	var url = document.location.href; //lay dia chi url duoi dang index.html?danhmuc&vitritrang
	var pagrams = url.split('?'); 
	if(pagrams.length>1) // nếu tách được 2 phần
	{
		var chuoi = pagrams[1];//danhmuc&vitritrang
		chuoi = chuoi.split('&');// danhmuc || vitritrang
		var vitri = chuoi[1]; //vitritrang
		var loaisp = chuoi[0];
	}// nếu không tách được 2 phần
	// alert(chuoi[2]);
	var temp = [];
	var dem = 0;
	//hiển thị trang index.html
	if(pagrams.length == 1) //nghia la index.html thui còn phần sau chấm hỏi không có nên length sẽ = 1
	{
		setSanPhamNoiBat();
	}//hienthi trang index.html?giohang
	else if(chuoi[0]=='giohang'){
		setGioHang();
	}//hien thi trang index.html?timkiem
	else if(chuoi[0]=="timkiem"){
		var k=0;
		//GIÁ TRỊ TÌM KIẾM CÓ DẠNG CHUỖI TIM%20KIEM%20SP nên chúng ta sẽ split theo %20
		var giatritimkim = chuoi[1].split("%20");
		var chuoimoi = "";
		for (var i = 0; i < giatritimkim.length; i++) {
			chuoimoi = chuoimoi + giatritimkim[i];
			if(i!= giatritimkim.length-1) chuoimoi = chuoimoi + " "; // nói chung là chuyển %20 thành khoảng cách
		}
		for (var i = 0; i < tatcasp.length; i++) {
			var title = xoa_dau(tatcasp[i].title).toLowerCase();
			var author = xoa_dau(tatcasp[i].author).toLowerCase();
			if(title.indexOf(chuoimoi) != -1 || author.indexOf(chuoimoi) != -1 ){
				temp[k++] = tatcasp[i];
			}
		}
		dem=0;
		var s ="";
		var vitri = parseInt(chuoi[2]);
		for (var i = vitri; i < temp.length; i++) {
			dem++;
			s = s + '<div class="responsive"><div class="gallery"><a href="chitietsp.html?'+temp[i].key+'"><img src='+temp[i].src+'><div class="desc"><div class="title">'+temp[i].title+'</div><div class="author">'+temp[i].author+'</div><div class="price">'+temp[i].price+'đ <del>2000000đ</del></div></div></a><div class="giohang"><button onclick="bovaogiohang('+temp[i].key+')">Thêm vào giỏ</button></div></div></div>';
			if(dem==12) break;
		}
		document.getElementById("content").innerHTML = s;
		//In ra số trang
		var sotrang = Math.ceil(temp.length/12);
		s = "";
		chuoi[2] = parseInt(chuoi[2]);
		for (var i = 1; i <= sotrang; i++) {
			var vitritrang = (i-1)*12;
			if(vitritrang == chuoi[2]) s = s + '<a class="lockpage" href="index.html?'+chuoi[0]+'&'+chuoi[1]+'&'+vitritrang+'">'+i+'</a>';
			else s = s + '<a href="index.html?'+chuoi[0]+'&'+chuoi[1]+'&'+vitritrang+'">'+i+'</a>';
		}
		document.getElementById("pageofbook").innerHTML = s;
		window.scrollTo(0,684);
	}//tim kiem nang cao
	else if(chuoi[0]=="timkiemnangcao"){
		//XỬ LÍ LẠI CHUỖI CHUOI[1]
		//Lưu giá trị 
		var tentimkiem2 = chuoi[1];
		var danhmuc2 = chuoi[2];
		var tacgia2 = chuoi[3];
		var giatu2 = chuoi[4];
		var giaden2 = chuoi[5];

		while(chuoi[1].indexOf("%20") != -1) //con%20meo%vang
			chuoi[1] = chuoi[1].replace("%20"," ");//con meo vang
		var txttimkiem = chuoi[1].split('=');
		chuoi[1] = txttimkiem[1];
		while(chuoi[3].indexOf("%20") != -1)
			chuoi[3] = chuoi[3].replace("%20"," ");
		var tacgia = chuoi[3].split('=');
		chuoi[3] = tacgia[1];
		// alert(chuoi[1]);
		//BỎ CÁC DẤU BẰNG ĐI
		var x = chuoi[2].split('=');
		chuoi[2] = x[1];
		var x = chuoi[4].split('=');
		chuoi[4] = x[1];
		var x = chuoi[5].split('=');
		chuoi[5] = x[1];
		var x = chuoi[6].split('=');
		chuoi[6] = x[1];

		// alert(chuoi[1]);// Chuỗi cần tìm kiếm
		// alert(chuoi[2]); //danhmuc
		// alert(chuoi[3]); //tacgia
		// alert(chuoi[4]); //giatu
		// alert(chuoi[5]); //giaden		
		// alert(chuoi[3]);
		//IF MÀ CHỖ NÀO NULL THÌ MÌNH SẼ KHÔNG CẦN PHẢI XÉT CHO QUA LUÔN 
		//LỌC CÁI MẠNG THEO TEMP 
		var temp = [];
		var k = 0;
		if(chuoi[1] != "SCRIPT_SHOW_ALL") //theo tên sản phẩm tìm kiếm
			//alert(chuoi[1]);
			for (var i = 0; i < tatcasp.length; i++) {
				var title = xoa_dau(tatcasp[i].title).toLowerCase();
				// alert(title);
				if (title.indexOf(chuoi[1]) != -1)
				{
					temp[k++] = tatcasp[i];
				}
		}
		else//theo SCRIPT_SHOW_ALL tìm tất cả sp
		{
			temp = tatcasp;
		}
		var temp2 = [];
		var k = 0;
		if(chuoi[2] != "null") // theo danh mục sp
		{
			//alert("2");
			for (var i = 0; i < temp.length; i++) {
				if(temp[i].danhmuc.indexOf(chuoi[2]) != -1){
					temp2[k++] = temp[i];
				}
			}
			temp = temp2;
		}
		var temp3 = [];
		// nếu mà nó không vào TH chuoi[2] != null thì chúng ta cần cho chuoi 2 là chuoi temp
		temp2 = temp;
		var k = 0;
		if(chuoi[3] != "null") // theo tác giả
		{
			// alert("3");
			//alert(chuoi[3]);
			for (var i = 0; i < temp2.length; i++) 
			{
				var author = xoa_dau(temp2[i].author).toLowerCase();
				if(author.indexOf(chuoi[3]) != -1){
					temp3[k++] = temp2[i];
				}
			}
			temp = temp3;
		}
		var temp4 = [];
		temp3 = temp;
		var k = 0;
		if (chuoi[4] != "null" && chuoi[5] != "null") // theo giá từ giá đến và giá từ
		{
			//alert("4 5 ");
			var min = parseInt(chuoi[4]);
			//alert(min);
			var max = parseInt(chuoi[5]);
			//alert(max);
			if(min>max){
				var z = min;
				min = max;
				max = z;
			}
			for (var i = 0; i < temp3.length; i++) {
				//alert(temp3[i].price);
				if(temp3[i].price >= min && temp3[i].price <= max)
				{
					temp4[k++] = temp3[i];
				}
			}
			temp = temp4;
		}
		// IN RA NGOÀI KẾT QUẢ TÌM ĐƯỢC
		var s = "";
		var dem = 0;
		//alert(chuoi[6]);
		for (var i = parseInt(chuoi[6]); i < temp.length; i++) {
			dem++;
			s = s + '<div class="responsive"><div class="gallery"><a href="chitietsp.html?'+temp[i].key+'"><img src='+temp[i].src+'><div class="desc"><div class="title">'+temp[i].title+'</div><div class="author">'+temp[i].author+'</div><div class="price">'+temp[i].price+'đ <del>2000000đ</del></div></div></a><div class="giohang"><button onclick="bovaogiohang('+temp[i].key+')">Thêm vào giỏ</button></div></div></div>';
			if(dem == 12) break;
		}
		document.getElementById("content").innerHTML = s;

		//GHI SỐ TRANG
		s = "";
		var sotrang = Math.ceil(temp.length/12);
		//alert(sotrang);
		chuoi[6] = parseInt(chuoi[6]);
		for (var i = 1; i <= sotrang; i++) 
		{
			var vitritrang = +(i-1)*12;
			if(vitritrang == chuoi[6]) s = s + '<a class="lockpage" href="index.html?timkiemnangcao&'+tentimkiem2+'&'+danhmuc2+'&'+tacgia2+'&'+giatu2+'&'+giaden2+'&'+'vitritrang='+vitritrang+'">'+i+'</a>';
			else s = s + '<a href="index.html?timkiemnangcao&'+tentimkiem2+'&'+danhmuc2+'&'+tacgia2+'&'+giatu2+'&'+giaden2+'&'+'vitritrang='+vitritrang+'">'+i+'</a>';
		}
		document.getElementById("pageofbook").innerHTML = s;
		window.scrollTo(0,684);
		// var tentimkiem2 = chuoi[1];
		// var danhmuc2 = chuoi[2];
		// var tacgia2 = chuoi[3];
		// var giatu2 = chuoi[4];
		// var giaden2 = chuoi[5];
		// console.log(s);
		// console.log(temp);
	}
	else if(chuoi[0] == "dangki"){
		document.getElementById("tuade").innerHTML = "Đăng ký tài khoản";
		//document.getElementById("search-bar-2").innerHTML = "";
		s = "";
		s = '<form name="formdk" class="formdk">'
					+'<table style="margin:auto">'
						+'<tr>'
							+'<td>Tài khoản:</td>'
							+'<td><input placeholder="Nhập tài khoản" id="username2" type="text" name=""></td>'
						+'</tr>'
						+'<tr>'
							+'<td></td>'
							+'<td>(Tối thiểu 8 kí tự)</td>'
						+'</tr>'
						+'<tr>'
							+'<td>'
							+	'Mật khẩu:'
							+'</td>'
							+'<td>'
							+	'<input placeholder="Nhập mật khẩu" id="password2" type="password" name="">'
							+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td>'
							+	'Nhập lại mật khẩu:'
							+'</td>'
							+'<td>'
							+	'<input placeholder="Nhập lại mật khẩu" id="password3" type="password" name="">'
							+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td>'
								+'Số điện thoại:'
							+'</td>'
							+'<td>'
								+'<input type="text" id="number" name="" placeholder="Nhập số điện thoại">'
							+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td>'
								+'Email:'
							+'</td>'
							+'<td>'
								+'<input type="text" id="email" name="" placeholder="Nhập địa chỉ email">'
							+'</td>'
						+'</tr>'						
						+'<tr>'
							+'<td>'
								+'Giới tính:'
							+'</td>'
							+'<td>'
							+	'<input value="nam" type = "radio" name="gioitinh"/>Nam'
							+	'<input value="nữ" type = "radio" name="gioitinh"/>Nữ'
							+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td>'
								+'Ngày sinh:'
							+'</td>'
							+'<td>'
								+'<input type="date" name="date"/>'
							+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td></td>'
							+'<td>'
								+'<input onclick="kiemtradangki()" type="button" name="" value="Đăng kí">'
							+'</td>'
						+'</tr>'
					+'</table>'
				+'</form>';
		document.getElementById("content").innerHTML = s;
		document.getElementById("content").className = "col-12";
		window.scrollTo(0,684);
	}//hien thi trang index.html?dangnhap
	else if(chuoi[0] == "dangnhap")
	{
		// alert("yes");
		//document.getElementById("search-bar-2").innerHTML = "";
		if(localStorage.getItem("batdangnhap") == null) // nếu chưa đăng nhập thì hiện khung đăng nhập
		{
			document.getElementById("tuade").innerHTML = "Đăng nhập tài khoản";
			s = "";
			s = s + '<div class="boxdiv"> <h1>ĐĂNG NHẬP</h1><form><p>Tài khoản:</p><input id="username" type="text" name="" placeholder="Nhập tài khoản"><p>Mật khẩu:</p><input id="password" type="password" name="" placeholder="Nhập mật khẩu"><input class="kiemtramatkhau" onclick="kiemtramatkhau()" type="button" value="Đăng nhập"><a href="#">Quên mật khẩu ?</a><br><a href="index.html?dangki">Đăng ký tài khoản </a></form></div>';
			document.getElementById("content").innerHTML = s;
			document.getElementById("content").className = "col-12";
			window.scrollTo(0,684);
		}
		else //ngược lại thì xuất thông tin người dùng ra
		{
			var tentaikhoan = localStorage.getItem("batdangnhap");
			var x = localStorage.getItem(tentaikhoan); // lấy được dữ liệu của user
			x = JSON.parse(x); // chuyển từ string ify sang object
			s = "";
			s = s +	'<table style="margin:auto;border:1px solid #189eff;padding:40px;">'
						+'<tr>'
							+'<td>Tài khoản:</td>'
							+'<td>'+x.username+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td>Mật khẩu:</td>'
							+'<td>'+x.password+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td>Giới tính:</td>'
							+'<td>'+x.gioitinh+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td>Ngày sinh:</td>'
							+'<td>'+x.ngaysinh+'</td>'
						+'</tr>'
						+'<tr>'
							+'<td></td>'
							+'<td><button onclick="clearFunction()" style="background-color:#189eff;border:none;padding:10px;color:white">Đăng xuất</button></td>'
						+'</tr>'
					+'</table>'
			document.getElementById("content").innerHTML = s;
			document.getElementById("content").className = "col-12";
			document.getElementById("tuade").innerHTML = "Tài khoản của bạn";
			window.scrollTo(0,684);
		}
	}
	else if(chuoi[0] == "donhang"){
		document.getElementById("tuade").innerHTML = "Đơn hàng đã đặt";
		document.getElementById("timkiemnangcao").style.display = 'none';

		//tìm đúng id của khách và id của đơn hàng và xuất ra 
		var k = 0;
		for (var i = 0; i < localStorage.length; i++) {
			if(localStorage.key(i).indexOf("order-") != -1)
			{
				var obj = JSON.parse(localStorage.getItem(localStorage.key(i))); // chuyển từ json stringify sang obj
				if(obj.username == localStorage.getItem("batdangnhap")) // nếu mà key giỏ hàng trùng tên username
				{
					var table = document.createElement('table');
					// tạo row phần đầu tiên cho table
					table.id = "table"+k;
					table.setAttribute('cellspacing','0px');
					var s = "";
					s = s 
								+'<tr>'
									+'<th>ID đơn hàng</th>'
									+'<th>Nội dung</th>'
									+'<th>Tình trạng</th>'
								+'</tr>';		
					// tạo phần Nội dung bằng chuỗi
					var s2 = "";
					var tongtien = 0;
					s2 = s2 + '<td>ID0'+k+':</td><td>'
					for (var j = 0; j < obj.sl.length; j++) {
						// alert(obj.key[i]);
						s2 = s2 
							+'<div>Tên:'+tatcasp[obj.key[j]-1].title+'</div>'
							+'<div>Số lượng: '+obj.sl[j]+'</div>'
						tongtien = tongtien + tatcasp[obj.key[j]-1].price * obj.sl[j];
					}
					if(obj.xuli == 0)
						s2 = s2 + '</td><td>Tổng tiền: '+tongtien+'đ<br><span style="color:red">Chưa xử lí</span></td>';
					else
						s2 = s2 + '</td><td>Tổng tiền: '+tongtien+'đ<br><span style="color:blue":>Đã xử lí</span></td>';
					//tạo tr chứa s2 
					var tr  = document.createElement("tr");
					tr.id = "tr"+k;


					document.getElementById("content").appendChild(table);
					document.getElementById("table"+k).innerHTML = s;
					document.getElementById("table"+k).appendChild(tr);
					document.getElementById("tr"+k).innerHTML = s2;
					k++;
				}
			}
		}
		window.scrollTo(0,684);
	}
	else // hiện thị theo danh mục sp
	{
		for (var i = 0; i < tatcasp.length; i++) {
			// console.log(tatcasp[i]);
			if (tatcasp[i].danhmuc.indexOf(loaisp) != -1) 
			{
				temp[dem++] = tatcasp[i];
			}
		}
			var s = "";
			var dem  = 0 ;
			// HIỂN THỊ TẤT CẢ SẢN PHẨM CỦA DANH MỤC ĐÓ
			// B1: DO SẢN PHẨM LÀ 12 SP 1 TRANG, NÊN CHÚNG TA SẼ ĐẾM TỪ vitritrang ĐẾN LENGTH CỦA TEMP PHẢI BẰNG 12
			for (var i = vitri; i < temp.length; i++) {
				dem++;
				s = s + '<div class="responsive"><div class="gallery"><a href="chitietsp.html?'+temp[i].key+'"><img src='+temp[i].src+'><div class="desc"><div class="title">'+temp[i].title+'</div><div class="author">'+temp[i].author+'</div><div class="price">'+temp[i].price+'đ <del>2000000đ</del></div></div></a><div class="giohang"><button onclick="bovaogiohang('+temp[i].key+')">Thêm vào giỏ</button></div></div></div>';
				if(dem==12) break;
			}
			document.getElementById("content").innerHTML = s;
			// B2: TẠO SỐ TRANG CHO WEB
			s = "";
			var sotrang = Math.ceil(temp.length/12);
			vitri = parseInt(vitri);
			for (var i = 1; i <= sotrang; i++) 
			{
				//alert(typeof vitri);
				var vitritrang = (i-1)*12;
				//alert(typeof vitritrang);
				if(vitritrang == vitri) s = s + '<a class="lockpage" href="index.html?'+loaisp+'&'+vitritrang+'">'+i+'</a>';
				else s = s + '<a href="index.html?'+loaisp+'&'+vitritrang+'">'+i+'</a>';
			}
			document.getElementById("pageofbook").innerHTML = s;	
			//B3: TÌM TỰA ĐỀ CHO TRANG WEB	
			for (var i = 0; i < danhmuc.length; i++) 
			{
				if(danhmuc[i].key.indexOf(chuoi[0]) != -1) //TÌM THEO KEY DANH MỤC NẾU TRÙNG THÌ XUẤT CÁI NAME
				{
					document.getElementById("tuade").innerHTML = danhmuc[i].name; // SAU KHI TÌM ĐƯỢC CHÚNG TA GHI VÀO VÀ BREAK VÒNG LẶP
					break;
				}
			}
			for (var i = 0; i < danhmuc.length; i++) {
				if(danhmuc[i].key.indexOf(loaisp) != -1){
					 document.querySelectorAll("#aside .aside")[i].className = "clickmenu";
					//document.querySelectorAll("#aside .aside")[i].style.backgroundColor = "green";
					break;
				}
			}
			window.scrollTo(0,684);		
	}
}

var chayslide = 0;
var imgsrc = ["img/slideshow/24fe10a36c0d51aadcbb2caa38a538bf.jpg",
"img/slideshow/27a56954965f895a7b8a3fa0c68f4c33.png",
"img/slideshow/49765e80e7ed47d25bcde050c583e6aa.jpg",
"img/slideshow/af0edafaacf20f01b663cf9f1bdd28f9.jpg",
"img/slideshow/a255b13740f07e89032f98e384c8d8f9.jpg",
"img/slideshow/8f1f2c5091ea2c21ac650313f5e38ee9.jpg",
"img/slideshow/7d2eeaa9af3073913f63acf7bf2beb61.png"];
function slideshow()
{
	chayslide++;
	// alert("yes");
	if(chayslide > imgsrc.length - 1) chayslide = 0;
	document.getElementById("slideshowimg").src = imgsrc[chayslide];
	setTimeout(slideshow,2000); // như đệ quy vậy sau khi onload vào chạy hàm này xong 2000 lại gọi và chạy hàm này 1 nữa;
}
function pre(){
	chayslide--;
	if(chayslide==-1) chayslide = imgsrc.length-1;
	document.getElementById("slideshowimg").src = imgsrc[chayslide];
}
function next()
{
	chayslide++;
	if (chayslide>imgsrc.length-1) {chayslide=0;}
	document.getElementById("slideshowimg").src = imgsrc[chayslide];
}
function setTimKiemNangCao(){
	//viết cho danh mục
		for (var i = 0; i < danhmuc.length; i++) {
			var node = document.createElement("option");
			var text = document.createTextNode(danhmuc[i].name);
			node.value = danhmuc[i].key;
			node.appendChild(text);
			document.getElementById("danhmuc").appendChild(node);
		}
		//viết cho giá từ
		for (var i = 0; i <= 10; i++)
		{
			var node = document.createElement("option");
			var text = document.createTextNode(i*100000+'đ');
			node.value = i*100000;
			node.appendChild(text);
			document.getElementById("giatu").appendChild(node);
		}
		//giá đến
		for (var i = 0; i <= 10; i++)
		{
			var node = document.createElement("option");
			var text = document.createTextNode(i*100000+'đ');
			node.value = i*100000;
			node.appendChild(text);
			document.getElementById("giaden").appendChild(node);
		}
		var mangtacgia = [];
		k = 0;
		for (var i = 0; i < tatcasp.length; i++) {
			ma = 0;
			for (var j = 0; j < mangtacgia.length; j++) {
				if(tatcasp[i].author.indexOf(mangtacgia[j]) != -1){
					ma = 1;
					break;
				}
			}
			if(ma == 0) mangtacgia[k++] = tatcasp[i].author;
		}
		for (var i = 0; i < mangtacgia.length; i++)
		{
			var node = document.createElement("option");
			var text = document.createTextNode(mangtacgia[i]);
			node.value = mangtacgia[i];
			node.appendChild(text);
			document.getElementById("tacgia").appendChild(node);
		}
		// console.log(mangtacgia);
}
function fixed_nav(){
	var html = document.documentElement;
	var header = document.getElementsByTagName("header")[0];
	var aside = document.getElementById("aside");
	window.addEventListener('scroll', function() 
	{
        if (html.scrollTop > 90) {
            header.className = 'none';
            // aside.className = "responsive";
        } else
        {
        	header.className = 'block';
            aside.className = "col-2";
        } 
    })
}
function toTop(){
	window.scrollTo(0,0);
}
function showheader() {
	// body...
	if (document.getElementById("header1").className == "none")
		document.getElementById("header1").className = "block";
	else 
		if (document.documentElement.scrollTop > 105) 
			document.getElementById("header1").className = "none";
}
window.onload = function(){
	slideshow();
	taoMenu();
	layurl();
	var url = window.location.href;
	var pagrams = url.split('?');
	var chuoi;
	if(pagrams.length>1) 
	{
		chuoi = pagrams[1].split('&');
		//alert(chuoi[0].indexOf("giohang") != -1);
		if(chuoi[0].indexOf("dangnhap") != -1 || chuoi[0].indexOf("dangki") != -1 || chuoi[0].indexOf("giohang") != -1)
			{
				console.log("hmmm....");
				document.getElementById("timkiemnangcao").style.display = "none"; // xóa tìm kiếm nâng cao
			}
		else setTimKiemNangCao(); //thêm giá trị vào tìm kiếm nâng cao // do nếu mình // document.getElementById("timkiemnangcao").innerHTML = "" thì nếu mà mình setTimKiemNang Cao sẽ bị lỗ
	}
	else
		setTimKiemNangCao();
	fixed_nav();
}