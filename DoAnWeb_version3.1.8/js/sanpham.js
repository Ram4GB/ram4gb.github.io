// cái này bên trang admin trong danh mục sp
function loadtable(){
	var dem=0;	
	// tach chuoi
	var url=document.location.href;
	var pagrams= url.split('?');
	var tam = pagrams[1].split('=');
	var vitri = tam[1];
	vitri = parseInt(vitri);
	var s = '<tr>'
					+'<th colspan="8">TẤT CẢ SẢN PHẨM</th>'
			+'</tr>'
			+'<tr style="background-color: #333;color: #fff">'
					+'<td>ẢNH</td>'
					+'<td>KEY</td>'
					+'<td>DANH MỤC</td>'
					+'<td>TÊN SẢN PHẨM</td>'
					+'<td>TÁC GIẢ</td>'
					+'<td>GIÁ</td>'
					+'<td>CHỨC NĂNG</td>'
				+'</tr>'
	for(var i= vitri; i<tatcasp.length;i++)
	{
		
		dem++;
		s+="<tr id='tr"+(i+1)+"'>"   
					+"<td>"
						+"<img src='img/product/book"+(i+1)+".jpg' width='100px'>"
					+"</td>"
					+"<td>"+i+"</td>"
					+"<td>"+tatcasp[i].danhmuc+"</td>"
					+"<td>"+tatcasp[i].title+"</td>"
					+"<td>"+tatcasp[i].author+"</td>"
					+"<td>"+tatcasp[i].price+"</td>"
					+'<td>'
					+'<button title="Sửa" onclick="sua('+(i+1)+')">'
						+'Sửa'
					+'</button>'
					+'<br>'
					+'<br>'
					+'<button title="Xóa" onclick="xoa('+(i+1)+')">'
						+'Xóa'
					+'</button>'
					+'</td>'
			+'</tr>'
		if(dem==12)	break;
	}
	document.getElementById("sanpham").innerHTML = s;

	// tạo số trang
	s='';
	var sotrang= Math.ceil(tatcasp.length/12);
	for(var i=1;i<= sotrang;i++)
	{
		var vitritrang= (i-1)*12;
		if(vitritrang == vitri)
			s+='<a class="lockpage" href="sanpham.html?vitri='+vitritrang+'">'+i+'</a>';
		else
			s+='<a href="sanpham.html?vitri='+vitritrang+'">'+i+'</a>';
	}
	document.getElementById("pageofbook").innerHTML = s;

}
function xoa(value){
			var option = confirm("Bạn có thực sự muốn xóa");
			if(option)
				document.getElementById("tr"+value).parentNode.removeChild(document.getElementById("tr"+value));
}
function sua(value){
	var tr = document.getElementById("tr"+value);
	var s="<tr>"
 			+"<td>"
				+"<img src='img/product/book"+value+".jpg' width='100px'>"
			+"</td>"
 			+"<td>"
 				+"<input type='text' size='1px'>"
 			+"</td>"
 			+"<td>"
 				+"<input type='text' size='6px' >"
 			+"</td>"
 			+"<td>"
 				+"<input type='text' size='20px' >"
 			+"</td>"
 			+"<td>"
 				+"<input type='text' size='10px' >"
 			+"</td>"
 			+"<td>"
 				+"<input type='text'size='5px' >"
 			+"</td>"
 			+'<td>'
				+'<button title="Lưu" onclick="luu('+value+')">'
					+'Lưu'
				+'</button>'
			+'</td>'
 			+"</tr>";
 	
 	tr.innerHTML = s;
}
function luu(value){
	var tr = document.getElementById("tr"+value);
	var i = value-1;
	var s ="<tr id='tr"+(i+1)+"'>"   
					+"<td>"
						+"<img src='img/product/book"+(i+1)+".jpg' width='100px'>"
					+"</td>"
					+"<td>"+i+"</td>"
					+"<td>"+tatcasp[i].danhmuc+"</td>"
					+"<td>"+tatcasp[i].title+"</td>"
					+"<td>"+tatcasp[i].author+"</td>"
					+"<td>"+tatcasp[i].price+"</td>"
					+'<td>'
					+'<button title="Sửa" onclick="sua('+(i+1)+')">'
						+'Sửa'
					+'</button>'
					+'<br>'
					+'<br>'
					+'<button title="Xóa" onclick="xoa('+(i+1)+')">'
						+'Xóa'
					+'</button>'
					+'</td>'
			+'</tr>';
	alert("Lưu thành công");
	tr.innerHTML = s;
}
window.onload = function (){
	loadtable();
}