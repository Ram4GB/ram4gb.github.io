function taobang(){
	for (var i = 0; i < donhang.length; i++) {
		var tr = document.createElement("tr");
		tr.id = "tr"+i;
		document.getElementById("donhang").appendChild(tr);
		var s = '';
		s = s 		+'<td>'+donhang[i].khachhang+'</td>'
					+'<td>'+donhang[i].thoidiem+'</td>'
					+'<td>'+donhang[i].tongtien+'</td>'
					+ '<td>'+donhang[i].tinhtrang+'</td>';
		document.getElementById("tr"+i).innerHTML = s;
	}	
}
window.onload = function(){
	taobang();
}