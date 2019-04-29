var LEVEL = [
		{name:'Cookies Clicker'
		,about:'Very simple clicker hack example'
		,code:'cookies;50;0;-1&Cookie Maker;<i class="fas fa-cookie"></i>;cookies:0;cookies:0;null:0;cookies:1&Get 100 cookies;cookies;100;win%Just 10 cookies left;cookies;-10;lose&01:00;lose'
		,image:'https://thumbs.dreamstime.com/b/fresh-chocolate-chip-cookie-isolated-white-above-dark-chocolate-chip-cookie-isolated-white-bakcground-top-view-128510868.jpg'}
		,{name:'Zombie Apocalipse'
		,about:'A Frenetic Survival in 3 minutes'
		,code:'Survivor;20;0;-0.2%Zombie;100;0;0.5%Gun;0;0;0%Bullet;0;0;0%Vacine;0;0;0%Herb;0;0;0&Shelter;<i class="fas fa-warehouse"></i>;Survivor:1;Zombie:0.2;null:0;Survivor:0.2%Science Lab;<i class="fas fa-microscope"></i>;Survivor:1;Vacine:0.1;Herb:1;Vacine:0.5%Greenhouse;<i class="fas fa-seedling"></i>;Survivor:1;Herb:0.5;null:0;Herb:0.2%Explorer;<i class="fas fa-hiking"></i>;Survivor:1;Herb:0.2,Bullet:0.1;Survivor:0.1;null:0%Enginner;<i class="fas fa-user-cog"></i>;Survivor:1;Gun:0.1;null:0;Bullet:1%Medic;<i class="fas fa-user-md"></i>;Survivor:1,Vacine:1;Survivor:1,Zombie:-1;Vacine:1;null:0%Defender;<i class="fas fa-user-shield"></i>;Survivor:1,Gun:1;Survivor:0.1,Zombie:-1;Bullet:1;null:0&No one person survive;Survivor;0;lose%Kill all zombies;Zombie;0;win&03:00;lose'
		,image:'https://i.postimg.cc/mrz7W9ZW/icon.png'}
	    ]

function fillLevels(){

}

$(document).ready(function(){
	fillLevels();

	for(var i=0; i<LEVEL.length; i++){
		var htmlAppend = '<div class="levelGrid col-4">'
				  +'<div class="level row" name="' + LEVEL[i].name + '">'
				    +'<img src="' + LEVEL[i].image + '" class="image col-3" name="image">'
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
			if(LEVEL[i].name == $(this).attr('name')){
				code = LEVEL[i].code;
				break;
			}
		}
		localStorage.setItem("storageConfig",code);
		window.location.href = "game.html";
	});
});
