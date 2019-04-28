// Configura item selecionado na grid
function configureItem(id){
	console.log('configure ' + $(id).attr('itemName') + ' in ' + id);
	for(var i=0; i<ELEMENT.length; i++){
		if($(id).attr('itemName') == ELEMENT[i].name){
			var alertGain = '';
			for(var j=0; j<ELEMENT[i].gain.length; j++){
				alertGain += ELEMENT[i].gain[j].name + ':' + ELEMENT[i].gain[j].amount;
				if(j+1<ELEMENT[i].gain.length)
					alertGain += ','
			}
			var alertSpent = '';
			for(var j=0; j<ELEMENT[i].spent.length; j++){
				alertSpent += ELEMENT[i].spent[j].name + ':' + ELEMENT[i].spent[j].amount;
				if(j+1<ELEMENT[i].spent.length)
					alertSpent += ','
			}
			var alertClick = '';
			for(var j=0; j<ELEMENT[i].click.length; j++){
				alertClick += ELEMENT[i].click[j].name + ':' + ELEMENT[i].click[j].amount;
				if(j+1<ELEMENT[i].click.length)
					alertClick += ','
			}
			var msg = 'NAME: ' + ELEMENT[i].name + '\n'
							 +'\n- GAIN -\n'
							 +alertGain + '\n'
			if(alertSpent.split(':')[0] != 'null')
				msg += '\n- SPENT -\n' + alertSpent
				if(alertClick.split(':')[0] != 'null')
					msg += '\n- CLICK -\n' + alertClick
			alert(msg);
			break;
		}
	}
}


// Controla a movimentacao dos elementos em .campGrid
function moveElementSlot(fromId, toId){
	console.log('move ' + fromId + ' to ' + toId);
	
	if($(fromId).hasClass('hasItem')){
		var item1 = $(fromId).find('p').html();
		var name1 = $(fromId).attr('itemName');
		var has1 = true;
	}
	else {
		var item1 = $(toId).attr('id').split('campSlot')[1];
		var has1 = false;
	}
	if($(toId).hasClass('hasItem')){
		var item2 = $(toId).find('p').html();
		var name2 = $(toId).attr('itemName');
		var has2 = true;
	}
	else {
		var item2 = $(fromId).attr('id').split('campSlot')[1];
		var has2 = false;
	}

	if(!has1 && has2){
		$(fromId).addClass('hasItem');
		$(fromId).attr('itemName', name2);
		$(toId).removeClass('hasItem');
		$(toId).attr('itemName', '');
	}
	else if(has1 && !has2){
		$(fromId).removeClass('hasItem');
		$(fromId).attr('itemName', '');
		$(toId).addClass('hasItem');
		$(toId).attr('itemName', name1);
	}
	else if(has1 && has2){
		$(fromId).attr('itemName', name2);
		$(toId).attr('itemName', name1);
	}
	// else !has1 && !has2 do nothing

	$(fromId).find('p').html(item2);
	$(toId).find('p').html(item1);
}

