function loadtable(){
	for (var i = 0; i < khachhang.length; i++) {
		var tr = document.createElement("tr");
		tr.id= "tr"+i;
		document.getElementById("khachhang").appendChild(tr);
		var s = '';
		s = s + '<td>'+khachhang[i].name+'</td>'
				+'<td>'+khachhang[i].username+'</td>'
				+'<td>'+khachhang[i].date+'</td>'
				+'<td>'+khachhang[i].sex+'</td>'
				+'<td>'+khachhang[i].thanthiet+'</td>'
				+'<td><button title="Xóa" onclick="xoa('+i+')">'
					+'X'
				+'</button></td>'
		document.getElementById("tr"+i).innerHTML = s;
	}
	
}
function xoa(value){
			var option = confirm("Bạn có thực sự muốn xóa");
			if(option)
				document.getElementById("tr"+value).parentNode.removeChild(document.getElementById("tr"+value));
		}
window.onload = function (){
	loadtable();
}