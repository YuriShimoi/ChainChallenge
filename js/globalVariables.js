var CONFIG = localStorage.getItem("storageConfig");

var ELEMENT = [];
var MATERIAL = [];
var CONDITION = [];
var TIMER = {time:'',result:''};

var CAMP_WIDTH;
var CAMP_HEIGHT;

var ENDGAME = false;
var FINALMESSAGE = '';
var PARTICLES = 0;

var Mouse ={x:0, y:0};

var selectedItem;
var selectedSlot;
var selectedControl;
var canSelectSlot = false;
var canSelectItem = true;
var gridOn = false;
var themeSet = 0;


function fillVariables(){
	var cfgMaterials = CONFIG.split('&')[0].split('%');
	var cfgElements = CONFIG.split('&')[1].split('%');
	var cfgConditions = CONFIG.split('&')[2].split('%');
	var cfgChonometer = CONFIG.split('&')[3];

	// Preenche ELEMENT
	for(var i=0; i<cfgElements.length; i++){
		var cfgEl;
		var cfgElName = cfgElements[i].split(';')[0] // Name
		var cfgElImage = cfgElements[i].split(';')[1] // Image
		var cfgElPrice = []
		for(var j=0; j<cfgElements[i].split(';')[2].split(',').length; j++){ // Price
			var cfgPricePart;
			cfgPricePart = {name:cfgElements[i].split(';')[2].split(',')[j].split(':')[0]
										 ,amount:parseFloat(cfgElements[i].split(';')[2].split(',')[j].split(':')[1])};
			cfgElPrice.push(cfgPricePart);
		}
		var cfgElGain = []
		for(var j=0; j<cfgElements[i].split(';')[3].split(',').length; j++){ // Gain
			var cfgGainPart;
			cfgGainPart = {name:cfgElements[i].split(';')[3].split(',')[j].split(':')[0]
										 ,amount:parseFloat(cfgElements[i].split(';')[3].split(',')[j].split(':')[1])};
			cfgElGain.push(cfgGainPart);
		}
		var cfgElSpent = []
		for(var j=0; j<cfgElements[i].split(';')[4].split(',').length; j++){ // Spent
			var cfgSpentPart;
			cfgSpentPart = {name:cfgElements[i].split(';')[4].split(',')[j].split(':')[0]
										 ,amount:parseFloat(cfgElements[i].split(';')[4].split(',')[j].split(':')[1])};
			cfgElSpent.push(cfgSpentPart);
		}
		var cfgElClick = []
		for(var j=0; j<cfgElements[i].split(';')[5].split(',').length; j++){ // Click
			var cfgClickPart;
			cfgClickPart = {name:cfgElements[i].split(';')[5].split(',')[j].split(':')[0]
										 ,amount:parseFloat(cfgElements[i].split(';')[5].split(',')[j].split(':')[1])};
			cfgElClick.push(cfgClickPart);
		}
		cfgEl = {name: cfgElName
						,image: cfgElImage
						,price: cfgElPrice
						,gain: cfgElGain
						,spent: cfgElSpent
						,click: cfgElClick}
		ELEMENT.push(cfgEl);
	}

	// Preenche MATERIAL
	for(var i=0; i<cfgMaterials.length; i++){
		var cfgMat;
		var cfgMatName = cfgMaterials[i].split(';')[0]; // Name
		var cfgMatAmount = parseFloat(cfgMaterials[i].split(';')[1]); // Amount
		var cfgMatProfit = parseFloat(cfgMaterials[i].split(';')[2]); // Profit
		var cfgMatAutoGen = parseFloat(cfgMaterials[i].split(';')[3]); // AutoGen
		cfgMat = {name: cfgMatName
						 ,amount: cfgMatAmount
						 ,profit: cfgMatProfit
						 ,autoGen: cfgMatAutoGen
						 ,spent: 0}
		MATERIAL.push(cfgMat);
	}

	// Preenche CONDITION
	for(var i=0; i<cfgConditions.length; i++){
		var cfgCond;
		var cfgCondDesc = cfgConditions[i].split(';')[0]; // Desc
		var cfgCondMaterial = cfgConditions[i].split(';')[1]; // Material
		var cfgCondAmount = parseInt(cfgConditions[i].split(';')[2]); // Amount
		var cfgCondResult = cfgConditions[i].split(';')[3]; // Result
		cfgCond = {desc: cfgCondDesc
						 ,material: cfgCondMaterial
						 ,amount: cfgCondAmount
						 ,result: cfgCondResult}
		CONDITION.push(cfgCond);
	}

	// Checa cronometro e ativa caso exista
	if(cfgChonometer != ''){
		TIMER.time = cfgChonometer.split(';')[0];
		TIMER.result = cfgChonometer.split(';')[1];

		$('body').append('<div id="timer" class="' + TIMER.result + '">' + TIMER.time + '</div>');
	}


	CAMP_WIDTH = 12;
	CAMP_HEIGHT = 6;
}

function particle(text){
      var randX = Math.floor((Math.random() * 20));
      var randY = Math.floor((Math.random() * 5));
      var randC = Math.floor((Math.random() * 3));
      var randColor = '';
      var randShad = 'black';
      if(randC == 0)
	randColor = 'var(--text-color)';
      if(randC == 1)
	randColor = 'var(--selected-color)';
      if(randC == 2){
	randShad = 'gray';
	randColor = 'var(--background-color)';
      }

      $('body').append('<p id="p'+PARTICLES+'" class="particle" style="position:fixed;'
			+'top:'+(Mouse.y-25-randY)+'px; left:'+(Mouse.x-25+randX)
			+'px; color:'+randColor + '; text-shadow: -1px 0 '+randShad+', 0 1px '+randShad+', 1px 0 '+randShad+', 0 -1px '+randShad+';'
			+'z-axis:2; font-weight:bold" particle=10>' + text + '</p>');
      PARTICLES += 1;
}
