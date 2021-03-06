// Funcao principal que carrega a pagina
$(document).ready(function(){
  fillVariables();
  fillPage();

  onmousemove = function(e){
    Mouse.x = e.clientX;
    Mouse.y = e.clientY;
  }

  // Altera o estado dos .controlButton
  $(".controlButton").click(function(){
    var id = "#" + $(this).attr('id');
    activateControl(!$(this).hasClass('controlSelected'),id);
  });


  // Trata eventos de .campGrid
  $(".campGrid").click(function(){
    if(canSelectSlot){
      if($('.campGrid').hasClass('campSelected')){
        // Trata movimentacao dos .campGrid selecionados
        var fromId = "#" + $('.campSelected').attr('id');
        var toId = "#" + $(this).attr('id');
        moveElementSlot(fromId,toId);
        $('.campGrid').removeClass('campSelected');
      }
      else {
        $(this).addClass('campSelected');
      }
    }
    else {
      if($('#elementDesc').text() != '-' && !$(this).hasClass('hasItem')){
        // Adiciona o item de #elementDesc para o p no .campGrid selecionado / Compra item
        price = $('#elementDesc').text().split('(')[1].split(')')[0].split(';');
        for(var i=0; i<price.length; i++){
          for(var j=0; j<MATERIAL.length; j++){
            if(price[i].split(':')[0] == MATERIAL[j].name){
              MATERIAL[j].amount -= parseInt(price[i].split(':')[1]);
              break;
            }
          }
        }
        console.log('set ' + $('#elementDesc').text().split(' - ')[0] + " to " + $(this).attr('id'));
        $(this).attr('itemName', $('#elementDesc').text().split(' - ')[0]);
        $(this).addClass('hasItem');
        for(var i=0; i<ELEMENT.length; i++){
          if($('#elementDesc').text().split(' - ')[0] == ELEMENT[i].name)
            $(this).find('p').html(ELEMENT[i].image);
        }
      }
      else if(!ENDGAME){
        if($('#destroy').hasClass('controlSelected') && $(this).hasClass('hasItem')){
          // Destroi item em .campSlot caso exista
          console.log('destroy ' + $(this).attr('itemName') + ' in ' + $(this).attr('id'));
          particle('-' + $(this).attr('itemName'));
          $(this).attr('itemName','');
          $(this).removeClass('hasItem');
          $(this).find('p').text($(this).attr('id').split('campSlot')[1]);
        }
        else {
          if($('#config').hasClass('controlSelected') && $(this).hasClass('hasItem')){
            // Envia id do .campSlot clicado para a funcao de configuracao
            configureItem('#' + $(this).attr('id'));
          }
          else {
            if($(this).hasClass('hasItem')){
              console.log('click on ' + $(this).attr('itemName') + ' in ' + $(this).attr('id'));

              for(var i=0; i<ELEMENT.length; i++){
                if($(this).attr('itemName') == ELEMENT[i].name){
                  for(var j=0; j<ELEMENT[i].click.length; j++){
                    for(var k=0; k<MATERIAL.length; k++){
                      if(ELEMENT[i].click[j].name == MATERIAL[k].name){
                        MATERIAL[k].amount += ELEMENT[i].click[j].amount;
                        particle('+' + ELEMENT[i].click[j].name);
                        break;
                      }
                    }
                  }
                }
              }
            }

          }
        }
      }
    }
  });


  // Altera #elementDesc com o nome do item e preco que o cursor sobrepoe
  $(".elementItem").hover(function(){
    if(!$('#elementDesc').hasClass('descCheck')){
      $("#elementDesc").text($(this).text() + " - Price(" + $(this).attr('price') + ")");
    }
  }, function(){
    if(!$('#elementDesc').hasClass('descCheck'))
      $("#elementDesc").text('-');
  });


  // Altera a cor de .elementItem quando clicado
  $(".elementItem").click(function(){
    if(canSelectItem && !$(this).hasClass('elementLock')){
      if($(this).hasClass('elementSelected')){
        $(this).removeClass('elementSelected');
        $('#elementDesc').removeClass('descCheck');
      }
      else {
        $('.elementItem').removeClass('elementSelected');
        $(this).addClass('elementSelected');
        $("#elementDesc").text($(this).text() + " - Price(" + $(this).attr('price') + ")");
        $('#elementDesc').addClass('descCheck');
      }
    }
    else if($('#config').hasClass('controlSelected')){
      configureItem($(this).text());
    }
  });

  gameLoop();
  profitLoop();
  if(TIMER.time != '')
    timerLoop();
});
