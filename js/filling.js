// Carrega itens da pagina
function fillPage(){
  var htmlAppend;
  
  // Carrega elementos em #elements
  for(var i=0; i<ELEMENT.length; i++) {
		var elPrice = "";
		for(var j=0; j<ELEMENT[i].price.length; j++){
			elPrice += ELEMENT[i].price[j].name + ":" + ELEMENT[i].price[j].amount;
			if(j+1 < ELEMENT[i].price.length)
				elPrice += ";";
		}
    htmlAppend = "<div class='elementGrid col-md-2 col-sm-2 col-xs-2 col-2 col-lg-2'>"
                    +"<div class='elementItem' id=itemSlot"+i+" price="+elPrice+">"
                      +"<div class='centerP'>"
                        + "<div style='font-size:3.5vw'>" + ELEMENT[i].image + "</div>"
                        + ELEMENT[i].name
                      +"</div>"
                    +"</div>"
                  +"</div>"

    $("#elements").append(htmlAppend);
  }

  // Carrega grade do #camp
  for(var i=0; i<CAMP_WIDTH*CAMP_HEIGHT; i++) {
    htmlAppend = "<div class='campGrid col-md-1 col-sm-1 col-xs-1 col-1 col-lg-1' id=campSlot"+i+">"
                    + "<p class='centerP'>" + i + "</p>"
                  +"</div>"

    $("#camp").append(htmlAppend);
  }

  // Carrega materiais em #stats
  for(var i=0; i<MATERIAL.length; i++) {
    htmlAppend = MATERIAL[i].name + ":<p id='"+MATERIAL[i].name+"'>" + parseInt(MATERIAL[i].amount) + "</p>"
    if(i+1<MATERIAL.length)
      htmlAppend += "<div class='hr2'></div>"
    $("#amount").append(htmlAppend);

    htmlAppend = MATERIAL[i].name + " profit /s:" + "<p id='"+MATERIAL[i].name+"Profit'>" + MATERIAL[i].profit + "</p>"
    if(i+1<MATERIAL.length)
      htmlAppend += "<div class='hr2'></div>"
    $("#profit").append(htmlAppend);
  }
}