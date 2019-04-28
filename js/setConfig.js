var CONFIG = localStorage.getItem("storageConfig");

function submitConfig(){
	localStorage.clear();
	var configs = $('#cnfg').val();
	localStorage.setItem("storageConfig",configs);
	window.location.href = "game.html";
}

function editConfig(){
	localStorage.clear();
	var configs = $('#cnfg').val();
	localStorage.setItem("storageConfig",configs);
	window.location.href = "makeconfig.html";
}

$(document).ready(function(){
	$('#cnfg').val(CONFIG);
})