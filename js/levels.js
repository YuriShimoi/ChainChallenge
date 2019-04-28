var LEVEL = [
							{name:'Cookies Clicker'
							,about:'Very simple clicker hack example'
							,code:'cookies;50;0;-1&Cookie Maker;<i class="fas fa-cookie"></i>;cookies:0;cookies:0;null:0;cookies:1&Get 100 cookies;cookies;100;win%Just 10 cookies left;cookies;-10;lose&01:00;lose'}
						]

function fillLevels(){

}

$(document).ready(function(){
	fillLevels();

	for(var i=0; i<LEVEL.length; i++){
		var htmlAppend = '<div class="levelGrid col-4">'
											+'<div class="level row" name="' + LEVEL[i].name + '">'
												+'<img src="https://thumbs.dreamstime.com/b/fresh-chocolate-chip-cookie-isolated-white-above-dark-chocolate-chip-cookie-isolated-white-bakcground-top-view-128510868.jpg" class="image col-3" name="image">'
												+'</img>'
												+'<div class="content col-9">'
													+'<p class="title"> ' + LEVEL[i].name + ' </p>'
													+'<p class="about">' + LEVEL[i].about + '</p>'
												+'</div>'
											+'</div>'
										+'</div>'

		$('#levels').append(htmlAppend);
	}


	$('.level').click(function(){
		localStorage.clear();
		var code;
		for(var i=0; i<LEVEL.length; i++){
			if(LEVEL[i].name == $(this).attr('name'))
				code = LEVEL[i].code;
				break;
		}
		localStorage.setItem("storageConfig",code);
		window.location.href = "game.html";
	});
});