// Efeito de grade do #hsGrid
function hsGridFc(show){
	gridOn = !show;
	if(show){
		$('.campGrid').removeClass('gridHide');
	}
	else {
		$('.campGrid').addClass('gridHide');
	}
};

// Controla os eventos dos .controlButton
function activateControl(controlStat, id){
  if(!ENDGAME)
    switch(id){
      case '#information':
        var toWin = '';
        var toLose = '';
        for(var i=0; i<CONDITION.length; i++){
          if(CONDITION[i].result == 'win')
            toWin += CONDITION[i].desc + '\n';
          if(CONDITION[i].result == 'lose')
            toLose += CONDITION[i].desc + '\n';
        }
        // timer
        if(TIMER.result == 'win')
          toWin += 'End of time\n';
        else if(TIMER.result == 'lose')
            toLose += 'End of time\n';

        var msg = '';
        if(toWin != '')
          msg += 'How to win:\n' + toWin;
        else if(toLose != '')
            msg += 'How to lose:\n' + toLose;
        if(toLose != '' && toWin != '')
          msg += '\nHow to lose:\n' + toLose;
        alert(msg);
        break;
      case '#theme':
        if(themeSet == 0){ // Black theme to White
          themeSet = 1;
          $('body').css('background', 'var(--background-color) url("background-white.png") repeat');
          document.body.style.setProperty('--background-color', '#dddddd');
          document.body.style.setProperty('--text-color', '#000000');
          document.body.style.setProperty('--div-color', '#ffffff');
          document.body.style.setProperty('--grid-color', '#cccccc');
          document.body.style.setProperty('--grid-antiColor', '#ffffff');
          document.body.style.setProperty('--gridText-color', '#aaaaaa');
          document.body.style.setProperty('--hover-color', '#222222');
          document.body.style.setProperty('--selected-color', '#1c45ff');
          document.body.style.setProperty('--controlButton-color', '#999999');
          document.body.style.setProperty('--elementBorder-color', '#999999');
        }
        else if(themeSet == 1){ // White Theme to Black
          themeSet = 0;
          $('body').css('background', 'var(--background-color) url("background.png") repeat');
          document.body.style.setProperty('--background-color', '#060606');
          document.body.style.setProperty('--text-color', '#ffffff');
          document.body.style.setProperty('--div-color', '#1a1a1a');
          document.body.style.setProperty('--grid-color', '#333333');
          document.body.style.setProperty('--grid-antiColor', '#1a1a1a');
          document.body.style.setProperty('--gridText-color', '#4a4a4a');
          document.body.style.setProperty('--hover-color', '#ffffff');
          document.body.style.setProperty('--selected-color', '#1c45ff');
          document.body.style.setProperty('--controlButton-color', '#333333');
          document.body.style.setProperty('--elementBorder-color', '#333333 ');
        }
        break;
      case '#hsGrid':
        if(controlStat){
          hsGridFc(false);
          $(id).addClass('controlSelected');
        }
        else {
          hsGridFc(true);
          $(id).removeClass('controlSelected');
        }
        break;
      case '#config':
        if(controlStat){
          $('.controlSelected').removeClass('controlSelected');
          if(gridOn) $('#hsGrid').addClass('controlSelected');
          canSelectSlot = false;
          $('.campGrid').removeClass('campSelected');
          canSelectItem = false;
          $('.elementItem').removeClass('elementSelected');
          $('#elementDesc').removeClass('descCheck');
          $("#elementDesc").text('-');
          $(id).addClass('controlSelected');
        }
        else {
          $(id).removeClass('controlSelected');
          canSelectItem = true;
        }
        break;
      case '#move':
        if(controlStat){
          $('.controlSelected').removeClass('controlSelected');
          if(gridOn) $('#hsGrid').addClass('controlSelected');
          canSelectSlot = true;
          canSelectItem = false;
          $('.elementItem').removeClass('elementSelected');
          $('#elementDesc').removeClass('descCheck');
          $("#elementDesc").text('-');
          $(id).addClass('controlSelected');
        }
        else {
          canSelectSlot = false;
          $('.campGrid').removeClass('campSelected');
          canSelectItem = true;
          $(id).removeClass('controlSelected');
        }
        break;
      case '#destroy':
        if(controlStat){
          $('.controlSelected').removeClass('controlSelected');
          if(gridOn)
            $('#hsGrid').addClass('controlSelected');
          canSelectSlot = false;
          $('.campGrid').removeClass('campSelected');
          canSelectItem = false;
          $('.elementItem').removeClass('elementSelected');
          $('#elementDesc').removeClass('descCheck');
          $("#elementDesc").text('-');
          $(id).addClass('controlSelected');
        }
        else {
          $(id).removeClass('controlSelected');
          canSelectItem = true;
        }
        break;
      case '#configCode':
        localStorage.setItem("storageConfig",CONFIG);
        break;
    }
};