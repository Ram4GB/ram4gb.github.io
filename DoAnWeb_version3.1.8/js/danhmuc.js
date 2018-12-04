function loadtable() {
	for (var i = 0; i < danhmuc.length; i++) {
		var tr = document.createElement("tr");
		tr.id= "tr"+i;
		document.getElementById("danhmuc").appendChild(tr);
		var s = '';
		s = s + '<td>'+(i+1)+'</td>'
				+'<td>'+danhmuc[i].key+'</td>'
				+'<td>'+danhmuc[i].name+'</td>'
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