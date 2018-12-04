// var arrayGioHang = [];
// var giaohang = 0;
function bovaogiohang(loai)
{
	// arrayGioHang[giaohang] = loai;
	// giaohang = giaohang + 1;
	// console.log(loai);
	// console.log(localStorage.getItem(loai));
		if(localStorage.getItem(loai) == null) // NẾU MÀ LOẠI SP ĐÓ CHƯA CÓ TRONG GIỎ HÀNG
		{
			alert("Thêm vào giỏ thành công");
			localStorage.setItem(loai,1);
			// console.log(localStorage.getItem(String(loai)));
			// console.log(localStorage.getItem(String(loai)));
		}
		else // NẾU LOẠI SP NÀY CÓ TRONG GIỎ HÀNG TỪ TRƯỚC
		{
			alert("Thêm vào giỏ thành công");
			var giatri = parseInt(localStorage.getItem(loai));
			localStorage.setItem(loai,giatri+1);
		}
}