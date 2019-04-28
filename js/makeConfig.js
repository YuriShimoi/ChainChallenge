var MATERIAL = [];
var ELEMENT = [];
var CONDITION = [];

function makeConfig(){
	localStorage.clear();
	var e = checkMaterials()
	if(e == true){
		var configs = codeMaterials() + '&' + codeElements() + '&' + codeConditions() + '&' + codeChonometer();
		localStorage.setItem("storageConfig",configs);
	}
	else{
		alert("Has no material named '" + e + "'");
		var configs = "Has no material named '" + e + "'";
		localStorage.setItem("storageConfig",configs);
	}
}


function checkMaterials(){
	for(var i=0; i<ELEMENT.length; i++){
		for(var j=0; j<ELEMENT[i].price.length; j++){
			hasMaterial = ELEMENT[i].price[j].name;
			for(var k=0; k<MATERIAL.length; k++){
				if(ELEMENT[i].price[j].name == MATERIAL[k].name){
					hasMaterial = true;
					break;
				}
			}
			if(hasMaterial != true)
				return hasMaterial;
		}
		for(var j=0; j<ELEMENT[i].gain.length; j++){
			hasMaterial = ELEMENT[i].gain[j].name;
			for(var k=0; k<MATERIAL.length; k++){
				if(ELEMENT[i].gain[j].name == MATERIAL[k].name){
					hasMaterial = true;
					break;
				}
			}
			if(hasMaterial != true)
				return hasMaterial;
		}
		for(var j=0; j<ELEMENT[i].spent.length; j++){
			hasMaterial = ELEMENT[i].spent[j].name;
			for(var k=0; k<MATERIAL.length; k++){
				if(ELEMENT[i].spent[j].name == MATERIAL[k].name){
					hasMaterial = true;
					break;
				}
			}
			if(ELEMENT[i].spent[j].name == 'null'){
				ELEMENT[i].spent[j].amount = 0;
			}
			else
				if(hasMaterial != true)
					return hasMaterial;
		}
		for(var j=0; j<ELEMENT[i].click.length; j++){
			hasMaterial = ELEMENT[i].click[j].name;
			for(var k=0; k<MATERIAL.length; k++){
				if(ELEMENT[i].click[j].name == MATERIAL[k].name){
					hasMaterial = true;
					break;
				}
			}
			if(ELEMENT[i].click[j].name == 'null'){
				ELEMENT[i].click[j].amount = 0;
			}
			else
				if(hasMaterial != true)
					return hasMaterial;
		}
	}
	for(var i=0; i<CONDITION.length; i++){
		hasMaterial = CONDITION[i].material;
		for(var j=0; j<MATERIAL.length; j++){
			if(CONDITION[i].material == MATERIAL[j].name){
				hasMaterial = true;
				break;
			}
		}
		if(hasMaterial != true)
			return hasMaterial;
	}
	
	return true;
}

function codeMaterials(){
	var code = '';
	for(var i=0; i<MATERIAL.length; i++){
		code += MATERIAL[i].name + ';'
					 +MATERIAL[i].amount + ';'
					 +MATERIAL[i].profit + ';'
					 +MATERIAL[i].autoGen
		
		if(i+1 < MATERIAL.length)
			code += '%'
	}

	return code;
}

function codeElements(){
	var code = '';
	for(var i=0; i<ELEMENT.length; i++){
		var elPrice = '';
		var elGain = '';
		var elSpent = '';
		var elClick = '';
		for(var j=0; j<ELEMENT[i].price.length; j++){
			elPrice += ELEMENT[i].price[j].name + ':' + ELEMENT[i].price[j].amount;
			if(j+1 < ELEMENT[i].price.length)
				elPrice += ','
		}
		for(var j=0; j<ELEMENT[i].gain.length; j++){
			elGain += ELEMENT[i].gain[j].name + ':' + ELEMENT[i].gain[j].amount;
			if(j+1 < ELEMENT[i].gain.length)
				elGain += ','
		}
		for(var j=0; j<ELEMENT[i].spent.length; j++){
			elSpent += ELEMENT[i].spent[j].name + ':' + ELEMENT[i].spent[j].amount;
			if(j+1 < ELEMENT[i].spent.length)
				elSpent += ','
		}
		for(var j=0; j<ELEMENT[i].click.length; j++){
			elClick += ELEMENT[i].click[j].name + ':' + ELEMENT[i].click[j].amount;
			if(j+1 < ELEMENT[i].click.length)
				elClick += ','
		}
		code += ELEMENT[i].name + ';'
					 +ELEMENT[i].image + ';'
					 +elPrice + ';'
					 +elGain + ';'
					 +elSpent + ';'
					 +elClick
		
		if(i+1 < ELEMENT.length)
			code += '%'
	}

	return code;
}

function codeConditions(){
	var code = '';
	for(var i=0; i<CONDITION.length; i++){
		code += CONDITION[i].desc + ';'
					 +CONDITION[i].material + ';'
					 +CONDITION[i].amount + ';'
					 +CONDITION[i].result
		
		if(i+1 < CONDITION.length)
			code += '%'
	}

	return code;
}

function codeChonometer(){
	var code = '';
	if($('#hasChronos').text() == 'on'){
		if(document.getElementById('timeChronos').value.split(':').length == 3)
		 	code += document.getElementById('timeChronos').value.split(':')[1] + ':'
						 +document.getElementById('timeChronos').value.split(':')[2]
		else
			code += document.getElementById('timeChronos').value.split(':')[1] + ':'
						 +'00'
		code += ';' + $('#resultChronos').text();
	}

	return code;
}





function notIn(name, dic, tag='name'){
	for(var i=0; i<dic.length; i++){
		if(tag == 'name')
			if(name == dic[i].name)
				return false;
		if(tag =='desc')
			if(name == dic[i].desc)
				return false;
	}
	return true;
}

function addMaterial(){
	if( $('#matName').val() != ''
		&&$('#matAmount').val() != ''
		&&$('#matAutoGen').val() != ''
		&&notIn($('#matName').val(), MATERIAL)){
		var mat = {
				name: $('#matName').val(),
				amount: parseFloat($('#matAmount').val()),
				profit:0,
				autoGen: parseFloat($('#matAutoGen').val())
			};
			MATERIAL.push(mat);

			atualizeList('material');
	}
}

function addElement(){
	if( $('#elmName').val() != ''
		&&$('#elmImage').val() != ''
		&&$('#elmGainName').val() != ''
		&&$('#elmGainAmount').val() != ''
		&&$('#elmPriceName').val() != ''
		&&$('#elmPriceAmount').val() != ''
		&&$('#elmSpentName').val() != ''
		&&$('#elmClickName').val() != ''
		&&notIn($('#elmName').val(), ELEMENT)){
		var prices = [];
		var gains = [];
		var spents = [];
		var clicks = [];
		for(var i=0; i<$('#elmPriceName').val().split(';').length; i++){
			var prc = {
				name: $('#elmPriceName').val().split(';')[i],
				amount: $('#elmPriceAmount').val().split(';')[i]
			}
			prices.push(prc);
		}
		for(var i=0; i<$('#elmGainName').val().split(';').length; i++){
			var gan = {
				name: $('#elmGainName').val().split(';')[i],
				amount: $('#elmGainAmount').val().split(';')[i]
			}
			gains.push(gan);
		}
		for(var i=0; i<$('#elmSpentName').val().split(';').length; i++){
			var spn = {
				name: $('#elmSpentName').val().split(';')[i],
				amount: $('#elmSpentAmount').val().split(';')[i]
			}
			spents.push(spn);
		}
		for(var i=0; i<$('#elmClickName').val().split(';').length; i++){
			var clk = {
				name: $('#elmClickName').val().split(';')[i],
				amount: $('#elmClickAmount').val().split(';')[i]
			}
			clicks.push(clk);
		}
		var elm = {
			name: $('#elmName').val(),
			image: $('#elmImage').val(),
			price: prices,
			gain: gains,
			spent: spents,
			click: clicks
		}
		ELEMENT.push(elm);

		atualizeList('element');
	}
}

function addCondition(){
	if( $('#condDesc').val() != ''
		&&$('#condMaterial').val() != ''
		&&$('#condAmount').val() != ''
		&&notIn($('#condDesc').val(), CONDITION, tag='desc')){
		var cond = {
				desc: $('#condDesc').val(),
				material: $('#condMaterial').val(),
				amount: parseInt($('#condAmount').val()),
				result: $('#resultCondition').text()
			};
			CONDITION.push(cond);

			atualizeList('condition');
	}
}




function atualizeList(type){
	switch(type){
		case 'material':
			atualizeMaterial();
			break;
		case 'element':
			atualizeElement();
			break;
			case 'condition':
				atualizeCondition();
				break;
		case 'all':
			atualizeMaterial();
			atualizeElement();
			atualizeCondition();
			break;
		default:
			console.log('atualization "' + type + '" not found');
	}

	reloadEvents();
}

function atualizeMaterial(){
	$('#listMaterials').find('.Slot').remove();

	for(var i=0; i<MATERIAL.length; i++){
		var htmlAppend = "<div class='Slot row'>"
											+"<spam class='col-5 col-xs-5 col-sm-5 col-md-5 col-lg-5'>"
												+"Name: " + MATERIAL[i].name
											+"</spam>"
											+"<spam class='col-3 col-xs-3 col-sm-3 col-md-3 col-lg-3'>"
												+"Amount: " + MATERIAL[i].amount
											+"</spam>"
											+"<spam class='col-3 col-xs-3 col-sm-3 col-md-3 col-lg-3'>"
												+"AutoGen: " + MATERIAL[i].autoGen
											+"</spam>"
											+"<div id='material-"+i+"' class='delete col-1 col-xs-1 col-sm-1 col-md-1 col-lg-1'>"
												+"<i class='fas fa-times'></i>"
											+"</div>"
										+"</div>"

		$('#listMaterials').find('#internal').append(htmlAppend);
	}
}

function atualizeElement(){
	$('#listElements').find('.Slot').remove();

	for(var i=0; i<ELEMENT.length; i++){
		var thisPrice = '';
		for(var j=0; j<ELEMENT[i].price.length; j++){
			thisPrice += ELEMENT[i].price[j].name + ':' + ELEMENT[i].price[j].amount;
			if(j+1<ELEMENT[i].price.length)
				thisPrice += ',<br>'
		}
		var thisGain = '';
		for(var j=0; j<ELEMENT[i].gain.length; j++){
			thisGain += ELEMENT[i].gain[j].name + ':' + ELEMENT[i].gain[j].amount;
			if(j+1<ELEMENT[i].gain.length)
				thisGain += ',<br>'
		}
		var thisSpent = '';
		for(var j=0; j<ELEMENT[i].spent.length; j++){
			thisSpent += ELEMENT[i].spent[j].name + ':' + ELEMENT[i].spent[j].amount;
			if(j+1<ELEMENT[i].spent.length)
				thisSpent += ',<br>'
		}
		var thisClick = '';
		for(var j=0; j<ELEMENT[i].click.length; j++){
			thisClick += ELEMENT[i].click[j].name + ':' + ELEMENT[i].click[j].amount;
			if(j+1<ELEMENT[i].click.length)
				thisClick += ',<br>'
		}

		var htmlAppend = "<div class='Slot row'>"
											+"<div class='image col-1 col-xs-1 col-sm-1 col-md-1 col-lg-1'>"
												+ELEMENT[i].image
											+"</div>"
											+"<div class='col-2 col-xs-2 col-sm-2 col-md-2 col-lg-2'>"
												+"Name:<br>" + ELEMENT[i].name
											+"</div>"
											+"<div class='col-2 col-xs-2 col-sm-2 col-md-2 col-lg-2'>"
												+"Price: <p>" + thisPrice + "</p>"
											+"</div>"
											+"<div class='col-2 col-xs-2 col-sm-2 col-md-2 col-lg-2'>"
												+"Gain: <p>" + thisGain + "</p>"
											+"</div>"
											+"<div class='col-2 col-xs-2 col-sm-2 col-md-2 col-lg-2'>"
												+"Spent: <p>" + thisSpent + "</p>"
											+"</div>"
											+"<div class='col-2 col-xs-2 col-sm-2 col-md-2 col-lg-2' style='border-right: solid 1px var(--div-color);'>"
												+"Click: <p>" + thisClick + "</p>"
											+"</div>"
											+"<div id='element-"+i+"' class='delete col-1 col-xs-1 col-sm-1 col-md-1 col-lg-1'>"
												+"<i class='fas fa-times'></i>"
											+"</div>"
										+"</div>"

		$('#listElements').find('#internal').append(htmlAppend);
	}
}

function atualizeCondition(){
	$('#listConditions').find('.Slot').remove();

	for(var i=0; i<CONDITION.length; i++){
		var condColor = 'var(--block-color)';
		if(CONDITION[i].result == 'win')
			condColor = 'var(--win-color)';

		var htmlAppend = "<div class='Slot row'>"
											+"<spam class='col-4 col-xs-4 col-sm-4 col-md-4 col-lg-4'>"
												+"Description: " + CONDITION[i].desc
											+"</spam>"
											+"<spam class='col-3 col-xs-3 col-sm-3 col-md-3 col-lg-3'>"
												+"Material: " + CONDITION[i].material
											+"</spam>"
											+"<spam class='col-3 col-xs-3 col-sm-3 col-md-3 col-lg-3'>"
												+"Amount: " + CONDITION[i].amount
											+"</spam>"
											+"<spam class='col-1 col-xs-1 col-sm-1 col-md-1 col-lg-1' style='background-color:"+condColor+"'>"
											+"</spam>"
											+"<div id='condition-"+i+"' class='delete col-1 col-xs-1 col-sm-1 col-md-1 col-lg-1'>"
												+"<i class='fas fa-times'></i>"
											+"</div>"
										+"</div>"

		$('#listConditions').find('#internal').append(htmlAppend);
	}
}



function reloadEvents(){
	$('.delete').click(function(){
		var type = $(this).attr('id').split('-')[0];
		var pos = parseFloat($(this).attr('id').split('-')[1]);

		if(type == 'material')
			MATERIAL.splice(pos, 1);
		if(type == 'element')
			ELEMENT.splice(pos, 1);
		if(type == 'condition')
			CONDITION.splice(pos, 1);
	
			atualizeList(type);
	});
}


function changeHasChronos(id, stat){
	id = '#' + id;
	switch(stat){
		case 'on':
			$(id).text('off');
			$(id).css('color', 'var(--div-color)');
			$(id).css('background-color', 'var(--background-color)');
			$('.chronos').find('.innerSpan').css('color', 'var(--grid-color)');

			$('#timeChronos').attr('disabled', '');
			$('#timeChronos').css('color', 'var(--grid-color)');
			$('#timeChronos').css('background-color', 'var(--div-color)');

			$('#resultChronos').attr('disabled', '');
			$('#resultChronos').css('color', 'var(--grid-color)');
			$('#resultChronos').css('background-color', 'var(--div-color)');

			$('.chronos').css('border', 'dashed 2px var(--grid-color)');
			break;
		case 'off':
			$(id).text('on');
			$(id).css('color', 'var(--text-color)');
			$(id).css('background-color', 'var(--selected-color)');
			$('.chronos').find('.innerSpan').css('color', 'var(--text-color)');

			$('#timeChronos').removeAttr('disabled');
			$('#timeChronos').css('color', 'var(--text-color)');
			$('#timeChronos').css('background-color', 'var(--grid-color)');

			$('#resultChronos').removeAttr('disabled');
			$('#resultChronos').css('color', 'var(--text-color)');
			if($('#resultChronos').text() == 'Win')
				$('#resultChronos').css('background-color', 'var(--win-color)');
			else
				$('#resultChronos').css('background-color', 'var(--block-color)');

			$('.chronos').css('border', 'dashed 2px var(--text-color)');
			break;
	}
}

function changeResultChronos(id, stat){
	id = '#' + id;
	switch(stat){
		case 'win':
			$(id).text('lose');
			$(id).css('background-color', 'var(--block-color)');
			break;
		case 'lose':
			$(id).text('win');
			$(id).css('background-color', 'var(--win-color)');
			break;
	}
}

function changeResultCondition(id, stat){
	id = '#' + id;
	switch(stat){
		case 'win':
			$(id).text('lose');
			$(id).css('background-color', 'var(--block-color)');
			break;
		case 'lose':
			$(id).text('win');
			$(id).css('background-color', 'var(--win-color)');
			break;
	}
}





$(document).ready(function(){
	fillVariables();
	atualizeList('all');
});