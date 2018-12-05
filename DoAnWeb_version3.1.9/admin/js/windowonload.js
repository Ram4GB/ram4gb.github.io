//k17 đại học sài gòn
function layur(){
	// Khởi tạo các biến
	var url = window.location.href;
	var pagrams = url.split('?');
	var title_nav;
	var chuoi;
	var vitri
	if(pagrams.length > 1) // có 2 trường hợp 1 là split ra index.html và index.html?danhmuc index.html?dangki
	{
		chuoi = pagrams[1].split('&');
		title_nav = chuoi[0];
		vitri = chuoi[1];
	}

	if(pagrams.length == 1)  //hiển thị trang index.html
	{
		var s = '';
		s = s 
	+'<div id="title">'
		+'<h1>Thống kê</h1>'
		+'<div class="url" id="url">'
			
		+'</div>'
	+'</div>'
	+'<div class="row">'
		+'<div class="container-panel">'
			+'<div class="col-3 panel">'
				+'<div class="icon"><i class="fas fa-shopping-cart"></i></div>'
				+'<div class="number">21</div>'
				+'<div class="meaning">ĐƠN HÀNG MỚI</div>'
			+'</div>'
			+'<div class="col-3 panel">'
				+'<div class="icon"><i style="color: #FFB53E" class="fas fa-comments"></i></div>'
				+'<div class="number">110</div>'
				+'<div class="meaning">BÌNH LUẬN</div>'
			+'</div>'
			+'<div class="col-3 panel">'
				+'<div class="icon"><i style="color: #1EBFAE" class="fas fa-users"></i></div>'
				+'<div class="number">10</div>'
				+'<div class="meaning">KHÁCH HÀNG MỚI</div>'
			+'</div>'
			+'<div class="col-3 panel">'
				+'<div class="icon"><i style="color: #F9243F" class="fas fa-search"></i></div>'
				+'<div class="number">120.000</div>'
				+'<div class="meaning">LƯỢT TRUY CẬP</div>'
		+'</div>'
		+'</div>'
	+'</div><!--  panel end -->'
	+'<div class="row">'
		+'<div class="col-8">'
			+'<div class="row row-box">'
				+'<div class="col-4 box">'
					+'<i class="fas fa-envelope"></i>'
					+'<div class="title">Tin nhắn</div>'
				+'</div>'
				+'<div class="col-4 box">'
					+'<i class="fas fa-money-bill-alt"></i>'
					+'<div class="title">Doanh thu</div>'
				+'</div>'
				+'<div class="col-4 box">'
					+'<i class="fas fa-exchange-alt"></i>'
					+'<div class="title">Phản hồi</div>'
				+'</div>'
				+'<div class="col-4 box">'
					+'<i class="fas fa-save"></i>'
					+'<div class="title">Kho lưu trữ</div>'
				+'</div>'
				+'<div class="col-4 box">'
					+'<i class="fas fa-bullhorn"></i>'
					+'<div class="title">Thông báo</div>'
				+'</div>'
				+'<div class="col-4 box">'
					+'<i class="fas fa-sort-down"></i>'
					+'<div class="title">Thêm</div>'
				+'</div>'
			+'</div>'
		+'</div><!-- end col - 8 dashboard -->'
		+'<div class="col-4">'
			+'<div class="row user-progress">'
				+'<div class="title-progress">'
					+'<div class="left-title">Sách Tiếng Việt</div>'
					+'<div class="percent-title">78%</div>'
				+'</div>'
				+'<div class="bar-progress">'
					+'<div style="background-color:#0886C6;width:78% "></div>'
				+'</div>'
			+'</div>'
			+'<div class="row user-progress">'
				+'<div class="title-progress">'
					+'<div class="left-title">Sách Tiếng Anh</div>'
					+'<div class="percent-title">29%</div>'
				+'</div>'
				+'<div class="bar-progress">'
					+'<div style="background-color: #59AF59;width:29%"></div>'
				+'</div>'
			+'</div>'
			+'<div class="row user-progress">'
				+'<div class="title-progress">'
					+'<div class="left-title">Sách Thiếu Nhi</div>'
					+'<div class="percent-title">8%</div>'
				+'</div>'
				+'<div class="bar-progress">'
					+'<div style="background-color: #D37F08;width:8%"></div>'
				+'</div>'
			+'</div>'
			+'<div class="row user-progress">'
				+'<div class="title-progress">'
					+'<div class="left-title">Sách Giáo Khoa</div>'
					+'<div class="percent-title">19%</div>'
				+'</div>'
				+'<div class="bar-progress">'
					+'<div style="background-color: #CE443E;width:19%"></div>'
				+'</div>'
			+'</div>'
		+'</div>'
	+'</div> <!-- end row all the box -->';
	document.getElementById("content").innerHTML = s;
	}
	else if(title_nav == 'khachhang'){
		var table  = document.createElement('table');
		var s = '';
		table.id = "khachhang";
		table.setAttribute('cellspacing','0px');
		s = s + 
		'<tr>'
			+'<th><i class="fas fa-user"></i></th>'
			+'<th>User</th>'
			+'<th>Password</th>'
			+'<th>Phone Number</th>'
			+'<th>Giới tính</th>'
			+'<th>Ngày sinh</th>'
			+'<th>Email</th>'
			+'<th>Delete</th>'
		+'</tr>';
		for (var i = 0; i < localStorage.length; i++) {
			if(localStorage.key(i) != 'batdangnhap' && localStorage.key(i).indexOf("order-") == -1 && localStorage.key(i).length >8) // lọc ra username
			{
				var obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
				s = s 
				+'<tr id = "tr'+i+'">'
					+'<td><img src="img/murom.jpg"></td>'
					+'<td>'+obj.username+'</td>'
					+'<td>'+obj.password+'</td>'
					+'<td>'+obj.number+'</td>'
					+'<td>'+obj.gioitinh+'</td>'
					+'<td>'
						+'<div class="last-login">Birthday</div>'
						+'<div class="online">'+obj.ngaysinh+'</div>'
					+'</td>'
					+'<td>'
						+'<div>'+obj.email+'</div>'
					+'</td>'
					+'<td>'
						+'<button onclick="xoakhachhang(\''+obj.username+'\')">X</button>'
					+'</td>'
				+'</tr>';
			}
		}
		console.log(s);
		document.getElementById("content").appendChild(table);
		document.getElementById("khachhang").innerHTML = s;
	}
	else if(title_nav == 'danhmuc'){
		var table  = document.createElement('table');
		var s = '';
		form = document.createElement("form");
		form.id = "formdanhmuc";
		form.className = "form";
		var s2 = '';
		table.id = "danhmuc";
		table.className = 'danhmuc'; //thêm class để chỉnh cho tale này phụ hợp 
		table.setAttribute('cellspacing','0px');
		s = s 
		+'<tr>'
			+'<th>'
				+'Key'
			+'</th>'
			+'<th>'
				+'Name'
			+'</th>'
			+'<th>'
				+'Hiệu chỉnh'
			+'</th>'
		+'</tr>'
		for (var i = 0; i < danhmuc.length; i++) {
			s = s 
			+'<tr id="tr'+i+'">'
				+'<td>'
					+danhmuc[i].key
				+'</td>'
				+'<td>'
					+danhmuc[i].name
				+'</td>'
				+'<td>'
					+'<button onclick="xoa('+i+')">Xóa</button>'
					+'<button onclick="sua_danh_muc('+i+')">Sửa</button>'
				+'</td>'
			+'</tr>';
		}

		s2 = s2
				+'<h2>Thêm danh mục</h2>'
				+'<label>Key danh mục</label>'
				+'<input id="key_danh_muc" type="text" name="" value="">'
				+'<label>Tên danh mục</label>'
				+'<input id="ten_danh_muc" type="text" name="" value="">'
				+'<input type="button" onclick="them_danh_muc()" value="Thêm">'

		document.getElementById("content").appendChild(table); // tạo table
		document.getElementById("danhmuc").innerHTML = s; // inner chuỗi vào table
		document.getElementById("content").appendChild(form); // tạo form
		document.getElementById("formdanhmuc").innerHTML = s2; //inner chuỗi vào form
	}
	else if(title_nav == 'sanpham'){
		var table = document.createElement("table");
		table.id = "table_san_pham";
		//chỉnh lại các thuộc tính cho table
		table.setAttribute('cellspacing','0px');
		table.className = 'table_sp';
		//div form thêm sản phẩm
		var div0 = document.createElement("div");
		div0.id = "them_san_pham";
		div0.className = "form_them_sp";
		var s3  = '';
		s3 = s3 + 
		'<form>'
			+'<h2>Thêm sản phẩm</h2>'
			+'<label>Ảnh</label>'
			+'<input type="file" name="" accept="image/png, image/jpeg">'
			+'<label>Tên sản phẩm</label>'
			+'<input type="text" name="">'
			+'<label>Mã sản phẩm</label>'
			+'<input type="text" name="">'
			+'<label>Danh mục</label>'
			+'<input type="text" name="">'
			+'<label>Giá</label>'
			+'<input type="text" name="">'
			+'<label>Tác giả</label>'
			+'<input type="text" name="">'
			+'<input type="button" value="Thêm" onclick="thanhcong()">'
		+'</form>';


		///////////////////////////////////////////////////
		
		var s = '';
		s = s + 
		'<tr>'
			+'<th>Hình ảnh</th>'
			+'<th>Mã sản phẩm</th>'
			+'<th>Tên sản phẩm</th>'
			+'<th>Danh mục</th>'
			+'<th>Giá</th>'
			+'<th>Tác giả</th>'
			+'<th>Thao tác</th>'
		+'</tr>';
		var dem = 0;
		for (var i = vitri; i < tatcasp.length; i++) {
			dem++;
			s = s + 
			'<tr id="tr'+i+'">'
				+'<td>'
					+'<img src="../'+tatcasp[i].src+'">'
				+'</td>'
				+'<td>'
				+	tatcasp[i].key
				+'</td>'
				+'<td>'
				+	tatcasp[i].title
				+'</td>'
				+'<td>'
				+	tatcasp[i].danhmuc
				+'</td>'
				+'<td>'
				+	tatcasp[i].price
				+'</td>'
				+'<td>'
				+	tatcasp[i].author
				+'</td>'
				+'<td>'
				+	'<button onclick="xoa('+i+')">Xóa</button>'
				+	'<button onclick="sua_san_pham('+tatcasp[i].key+','+i+')">Sửa</button>'
				+'</td>'
			+'</tr>	'	;
			if(dem==12)
			break;	
		}
		//tạo số trang ở đây
		//tạo 1 div chứa số trang
		var div = document.createElement("div");
		div.id = "pageofbook";

		var sotrang = Math.ceil(tatcasp.length/12)
		var s2 = '';
		for (var i = 1; i <= sotrang; i++) {
			var vitritrang = (i-1)*12;
				if(vitritrang == vitri)
					s2 = s2 + '<a class="lockpage" href="index.html?sanpham&'+vitritrang+'">'+i+'</a>';
				else s2 = s2 + '<a href="index.html?sanpham&'+vitritrang+'">'+i+'</a>';
		}	

		var clear_both = document.createElement('div');
		clear_both.className = 'clear-both';
		//innerHTML các giá trị vào
		document.getElementById("content").appendChild(table);
		document.getElementById('content').appendChild(clear_both);
		// sau khi in table ra do mình float nó mà t muốn ở trên ko bị tràn nên clear hết để cho nó xuống dưới
		document.getElementById("content").appendChild(div0);
		document.getElementById("content").appendChild(div);
		//--------------------------------------
		document.getElementById("table_san_pham").innerHTML = s;
		document.getElementById("them_san_pham").innerHTML = s3;
		document.getElementById("pageofbook").innerHTML = s2;
	}
	else if(title_nav == 'donhang'){
		var table  = document.createElement('table');
		table.id = "table_donhang";
		table.setAttribute('cellspacing','0px');

		var s = '';
		s = s 
		+'<tr>'
			+'<td colspan="3">Ngày từ: <input type="date" name="">Ngày đến: <input type="date" name=""></td>'
			+'<td colspan="4">'
				+'Trạng thái'
				+'<select>'
					+'<option>[Chọn trạng thái]</option>'
					+'<option>Đã xử lí</option>'
					+'<option>Chưa xử lí</option>'
				+'</select>'
			+'</td>'
		+'</tr>'
		+'<tr class="reset-psedo">'
			+'<th>STT</th>'
			+'<th>Đơn hàng</th>'
			+'<th>Thời điểm đặt</th>'
			+'<th>Thành tiền</th>'
			+'<th>Tình trạng</th>'
			+'<th>Thao tác</th>'
		+'</tr>';
		var k= 0;
		for (var i = 0; i < localStorage.length; i++) {
			if(localStorage.key(i).indexOf("order-") != -1)// tìm dc đơn hàng
			{
				// chuyển đơn hàng từ stringify sang parse
				var obj = JSON.parse(localStorage.getItem(localStorage.key(i))); 
				var username = obj.username; //username
				var xuli; // xuli //order-vitri
				var chuoi = localStorage.key(i);
				chuoi = chuoi.split('-');
				var vitri = chuoi[1]; // để chúng ta có thể lấy key và xóa nó trong local dễ dàng
				if(obj.xuli == 0)
				{
					xuli = "Chưa xử lí"
				}
				else{
					xuli = "Xử lí";
				}

				//tinh tổng tiền
				var tongtien = 0;
				for (var j = 0; j < obj.sl.length; j++) {
					console.log(tatcasp[obj.key[j]-1].price);
					tongtien = tongtien + tatcasp[obj.key[j]-1].price * obj.sl[j];
				}
				s = s 
				+'<tr>'
					+'<td>'+(k+1)+'</td>' // số thứ tự chạy theo i thì nó ko theo thứ tự do nó trúng cái if mới vào
					+'<td>'+"DOHANG"+k+'</td>'
					+'<td>'+obj.date+'</td>'
					+'<td>'+tongtien+'</td>'
					+'<td>'+'<input type="checkbox" onclick="tinhtrangdonhang('+vitri+')">'+xuli+'</td>'
					+'<td><button onclick="xoadonhang('+vitri+')">Xóa</button><button onclick="chitietsp('+vitri+')">Chi tiết</button></td>'
				+'</tr>';

				k++;
			}
		}	
		document.getElementById("content").appendChild(table);
		document.getElementById("table_donhang").innerHTML = s; 
	}
}
function thanhcong(){
	alert("Thêm thành công")
}
function xoakhachhang(key){
	var confirm;
	if(confirm = window.confirm("Bạn chắc chắn muốn xóa"))
	{
		// xóa những đơn hàng liên quan tới khách hàng đó
		var i = 0;
		while( i < localStorage.length) 
		{
			if(localStorage.key(i).indexOf("order-") != -1)
			{
				var obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
				if(obj.username == key) // đúng là giỏ hàng của user
				{
					localStorage.removeItem(localStorage.key(i)); // xóa cái hiện tại
					i = 0;
				}
				else // đúng là giỏ hàng nhưng không phải của user
				{
					i++;
				}
			}
			else //ngược lại thì vẫn cộng i lên
				i++;
		}
		localStorage.removeItem(key);
	}
	if(localStorage.getItem("batdangnhap") == key) // nếu tài khoản đó đang đăng nhập thì cho nó đăng xuất để tránh lỗi
		localStorage.removeItem("batdangnhap");
	window.location.assign("index.html?khachhang");
}
function chitietsp(vitri){
	document.getElementsByClassName('overplay')[2].style.display = 'block';// mở cái tab overplay thứ 2 trong index.html
	var obj = JSON.parse(localStorage.getItem("order-"+vitri)); // chuyển từ dạng json sang dạng object
	var s = '';
	s = s + '<div>Username: '+obj.username+'</div>' 
	for (var i = 0; i < obj.sl.length; i++) {
		s = s + '<div>Tên sản phẩm: '+tatcasp[obj.key[i]-1].title+'</div>'
		s = s + '<div>Số lượng sản phẩm: '+obj.sl[i]+'</div>';
	}

	document.getElementById("chitiet").innerHTML = s; // tất cả sẽ được inner vào chi tiết sản phẩm
}
function xoadonhang(vitri)
{
	var confirm;
	if(confirm = window.confirm("Bạn có thực sự chắc chắn xóa không ?"))
		localStorage.removeItem("order-"+vitri);
	window.location.assign("index.html?donhang");
}
function tinhtrangdonhang(vitri) // vị trí của nó trong locaStorage
{
	var obj = JSON.parse(localStorage.getItem("order-"+vitri));  // lấy được giá trị của nó trong localStorage
	if(obj.xuli == 0){
		obj.xuli = 1;
	}
	else{
		obj.xuli = 0;
	}
	localStorage.setItem("order-"+vitri,JSON.stringify(obj)); // set lại giá trị của nó
	window.location.assign("index.html?donhang");
}	
function closepopup()
{
	document.getElementsByClassName('overplay')[0].style.display = 'none';
	document.getElementsByClassName('overplay')[1].style.display = 'none';
	document.getElementsByClassName('overplay')[2].style.display = 'none';
}
// cái này là gọi pop up sửa bên danh mục sản phẩm nha
function sua_danh_muc(key) // key đây là vị trí nó trong bảng
{
	document.getElementById("key_danh_muc_1").value = danhmuc[key].key;
	document.getElementById("ten_danh_muc_1").value = danhmuc[key].name;
	document.getElementById("btn-luu").setAttribute('onclick','luudanhmuc('+key+')')
	document.getElementsByClassName("overplay")[0].style.display = "block";
}
function sua_san_pham(key,vitri) //  sửa theo cái 
{
	document.getElementById("img").src = "../"+tatcasp[key-1].src;
	document.getElementById("ma_san_pham").value = tatcasp[key-1].key;
	document.getElementById("ten_san_pham").value = tatcasp[key-1].title;
	document.getElementById("danh_muc").value = tatcasp[key-1].danhmuc;
	document.getElementById("gia").value = tatcasp[key-1].price;
	document.getElementById("tac_gia").value = tatcasp[key-1].author;
	document.getElementsByClassName('overplay')[1].style.display = "block";
	document.getElementById("btn_luu_san_pham").setAttribute('onclick','luu('+vitri+')'); // khi vừa bấm lưu thì get cái key nó vào
}
function xoa(key) // xóa chỉ display none 
{
	var confirm  = window.confirm("Bạn chắc chắn muốn xóa");
	if(confirm)
		document.getElementById("tr"+key).style.display = 'none';
}
function luu(vitri)
{
	if(document.getElementById("file").files.length != 0 ) //kiểm tra đường dẫn nếu chưa dc ch
		document.querySelectorAll("tr#tr"+vitri+' td img')[0].src = "../img/test-img/"+document.getElementById("file").files[0].name;
	document.querySelectorAll("tr#tr"+vitri+' td')[1].innerText = document.getElementById("ma_san_pham").value;
	document.querySelectorAll("tr#tr"+vitri+' td')[2].innerText = document.getElementById("ten_san_pham").value;
	document.querySelectorAll("tr#tr"+vitri+' td')[3].innerText = document.getElementById("danh_muc").value;
	document.querySelectorAll("tr#tr"+vitri+' td')[4].innerText = document.getElementById("gia").value;
	document.querySelectorAll("tr#tr"+vitri+' td')[5].innerText = document.getElementById("tac_gia").value;
	closepopup();
}
function luudanhmuc(key)
{
	document.querySelectorAll("tr#tr"+key+' td')[0].innerText = document.getElementById("key_danh_muc_1").value;
	document.querySelectorAll("tr#tr"+key+' td')[1].innerText = document.getElementById("ten_danh_muc_1").value;
	closepopup();
}
function them_danh_muc(){
	var key = document.getElementById("key_danh_muc").value;
	var name = document.getElementById("ten_danh_muc").value;
	var s = '';
	var tr = document.createElement('tr');

	//tìm giá trị tr-id hiện tại là bao nhiêu
	var max = document.querySelectorAll('tr').length;
	max  = max - 1; // vị trí id tiếp theo là max - 1
	tr.id = "tr"+max;


	s = s
		+'<td>'+key+'</td>'
		+'<td>'+name+'</td>'
		+'<td><button onclick="xoa('+max+')">Xóa</button><button onclick="sua_danh_muc('+max+')">Sửa</button></td>' // sửa chưa được do nó không nằm trong mảng

	document.getElementById("danhmuc").appendChild(tr);
	document.getElementById("tr"+max).innerHTML = s;
}
window.onload = function(){
	layur();
}