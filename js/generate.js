// Calcula os gastos
function checkPrice(price){
  var canBuy = true;
  price = String(price).split(';');

  for(var i=0; i<price.length; i++){
    mat = price[i].split(':')[0];
    amt = price[i].split(':')[1];
    for(var j=0; j<MATERIAL.length; j++){
      if(MATERIAL[j].name == mat){
        if(amt > MATERIAL[j].amount){
          canBuy = false;
        }
      }
    }
  }
  if(canBuy){
    return price;
  }
  return 0;
}


// Funcao em loop que manipula os geradores
function gameLoop(){
  // Bloqueia e desbloqueia items possiveis de comprar com o money
  var elements = document.getElementsByClassName('elementItem');
  for(var i=0; i<elements.length; i++){
    var elId = '#' + elements[i].id;
    if(checkPrice($(elId).attr('price')) != 0){
      if($(elId).hasClass('elementLock'))
        $(elId).removeClass('elementLock');
    }
    else {
        if(!$(elId).hasClass('elementLock'))
          $(elId).addClass('elementLock');
    }
  }

  // Desseleciona o elemento caso o preco fique maior que o money
  if(checkPrice($('.elementSelected').attr('price')) == 0
    && $('.elementItem').hasClass('elementSelected')){
    $('.elementSelected').removeClass('elementSelected');
    $('#elementDesc').text('-');
    $('#elementDesc').removeClass('descCheck');
  }

  // Calcula os ganhos automaticos
  for(var i=0; i<MATERIAL.length; i++){
    MATERIAL[i].profit = MATERIAL[i].autoGen;
  }
  // Zera os spents para que sejam recalculados
  for(var i=0; i<MATERIAL.length; i++){
    MATERIAL[i].spent = 0;
  }

  // Varre os elementos da .grid
  var elements = document.getElementsByClassName('hasItem');
  for(var i=0; i<elements.length; i++){
    for(var j=0; j<ELEMENT.length; j++){
      // Se o elemento foi encontrado na grid -> ELEMENT[j]
      if($('#'+elements[i].id).attr('itemName') == ELEMENT[j].name){
        for(var k=0; k<ELEMENT[j].spent.length; k++){
          // Se o spent for null
          if(ELEMENT[j].spent[k].name == 'null'){
            for(var m=0; m<ELEMENT[j].gain.length; m++){
              for(var n=0; n<MATERIAL.length; n++){
                if(ELEMENT[j].gain[m].name == MATERIAL[n].name){
                  MATERIAL[n].profit += ELEMENT[j].gain[m].amount;
                }
              }
            }
            break;
          }
          for(var l=0; l<MATERIAL.length; l++){
            if(ELEMENT[j].spent[k].name == MATERIAL[l].name){
              if(ELEMENT[j].spent[k].amount <= (MATERIAL[l].amount - MATERIAL[l].spent)){
                // Diminuir spent
                MATERIAL[l].spent += ELEMENT[j].spent[k].amount;
                // Aumentar profit
                for(var m=0; m<ELEMENT[j].gain.length; m++){
                  for(var n=0; n<MATERIAL.length; n++){
                    if(ELEMENT[j].gain[m].name == MATERIAL[n].name){
                      MATERIAL[n].profit += ELEMENT[j].gain[m].amount;
                    }
                  }
                }
              }
              else
                break;
            }
          }
        }
        break;
      }
    }
  }

  // Atualiza #stats
  for(var i=0; i<MATERIAL.length; i++){
    matId = "#" + MATERIAL[i].name;
    $(matId).text(parseInt(MATERIAL[i].amount));
  }
  for(var i=0; i<MATERIAL.length; i++){
    prfId = "#" + MATERIAL[i].name + "Profit";
    $(prfId).text((MATERIAL[i].profit - MATERIAL[i].spent).toFixed(2));
  }

  // Atualiza cor da grid dos .elementItem
  if(!canSelectItem)
    $('.elementItem').addClass('elementBlock');
  else
    $('.elementItem').removeClass('elementBlock');
  
  
  // Move particula de click
  var particles = document.getElementsByClassName('particle');
  for(var i=0; i<particles.length; i++){
    var pid = '#'+particles[i].id;
    if($(pid).attr('particle') == 10){
      $(pid).fadeIn(speed=0);
      $(pid).fadeOut(speed='0.5s');
    }
    $(pid).attr('particle', $(pid).attr('particle')-1);
    $(pid).css('top', ($(pid).css('top').split('px')[0]-$(pid).attr('particle')*2)+'px');
    if($(pid).attr('particle') <= 0){
      $(pid).remove();
    }
  }


  // Checa se alguma condicao foi atingida
  for(var i=0; i<CONDITION.length; i++){
    for(var j=0; j<MATERIAL.length; j++){
      if(CONDITION[i].material == MATERIAL[j].name){
        if(CONDITION[i].amount <= 0 && CONDITION[i].amount*-1 >= MATERIAL[j].amount){
          FINALMESSAGE = CONDITION[i].desc;
          ENDGAME = CONDITION[i].result;
        }
        if(CONDITION[i].amount > 0 && CONDITION[i].amount <= MATERIAL[j].amount){
          FINALMESSAGE = CONDITION[i].desc;
          ENDGAME = CONDITION[i].result;
        }
      }
    }
  }


  // Atualiza o timer lateral
  $('#timer').text(TIMER.time);


  t=setTimeout("gameLoop()",50);
}


// Funcao em loop que adiciona os ganhos
function profitLoop(){
  if(!ENDGAME){
    for(var i=0; i<MATERIAL.length; i++){
      MATERIAL[i].amount += MATERIAL[i].profit;
      MATERIAL[i].amount -= MATERIAL[i].spent;
      if(MATERIAL[i].amount < 0)
        MATERIAL[i].amount = 0;
    }
    T=setTimeout('profitLoop()',1000);
  }
  else{
    var smile = ':(';
    if(ENDGAME == 'win'){
      document.body.style.setProperty('--block-color', 'var(--win-color)');
      smile = ':D';
    }
    document.body.style.setProperty('--selected-color', 'var(--block-color)');
    document.body.style.setProperty('--text-color', 'var(--block-color)');
    canSelectSlot = false;
    $('.campGrid').removeClass('campSelected');
    canSelectItem = false;
    $('.elementItem').removeClass('elementSelected');
    $('#elementDesc').removeClass('descCheck');
    $("#elementDesc").text('-');
    alert('You ' + ENDGAME +'! ' + smile + '\n> ' + FINALMESSAGE);
  }
}


// Funcao em loop que controla o cronometro
function timerLoop(){
  if(!ENDGAME){
    TIMER.time = secondsToTime(timeToSeconds(TIMER.time)-1);
    if(timeToSeconds(TIMER.time) <= 0){
      ENDGAME = TIMER.result;
      FINALMESSAGE = 'End of time';
      }
    else
      T=setTimeout('timerLoop()',1000);
  }
  else{
    

  }
}


function timeToSeconds(time){
  return parseInt(time.split(':')[0])*60 + parseInt(time.split(':')[1]);
}

function secondsToTime(seconds){
  var min = String(parseInt(seconds/60));
  var sec = String(parseInt(seconds%60));

  if(min.length == 1)
    min = '0' + min;
  if(sec.length == 1)
    sec = '0' + sec;
  
  return min + ':' + sec;
}
