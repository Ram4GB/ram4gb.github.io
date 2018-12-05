//k17 đại học sài gòn
var bienchayichitietsp = 0;
function preclick()
{
	bienchayichitietsp--;
	if(bienchayichitietsp<0) bienchayichitietsp = 0;
	var sl = document.getElementById("slsp");
	sl.value = bienchayichitietsp;
}
function nextclick()
{
	bienchayichitietsp++;
	var sl = document.getElementById("slsp");
	sl.value = bienchayichitietsp;
}
function mua()
{
	if(document.getElementById('slsp').value > 0)
		alert("Mua thành công")
}
function quaylai(){
	window.history.back();
}