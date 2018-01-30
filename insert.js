var site = window.location.href;
var filename = site.replace(/^.*[\\\/]/, '')
var highlight_color = '';
var myAPIKey = "insert your mlab API key here";

//Create div that will have highlighting options
var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'selection_bubble');
document.body.appendChild(bubbleDOM);

//If there is text selected on the page, render the highlighting bubble
document.addEventListener('mouseup', function (e) {
  var selection = window.getSelection().toString();
  if (selection.length > 0) {
    renderBubble(e.clientX, e.clientY, window.getSelection().getRangeAt(0));
  } else {
    bubbleDOM.style.visibility = 'hidden';
  }
  
}, false);


//Render highlighting bubble
function renderBubble(mouseX, mouseY, selection) {
  bubbleDOM.innerHTML = "<button class='green'></button><button class='yellow'></button><button class='red'></button>";
  bubbleDOM.style.top = mouseY + 5 +'px';
  bubbleDOM.style.left = mouseX + 'px';
  bubbleDOM.style.visibility = 'visible';
  $('.green').on('mousedown', function(e) {
      highlightText('green',selection);
  })
  $('.yellow').on('mousedown', function(e) {
    highlightText('yellow',selection);
  })
  $('.red').on('mousedown', function(e) {
    highlightText('red',selection);
  })
}
 
//Highlight text, push visual to webpage and send info to database 
function highlightText(color, tr){
 
  var extracted = tr.extractContents();
  var span = document.createElement("span");
  span.className = color;
  span.appendChild(extracted);
  tr.insertNode(span);
  var cleaned = clean_string(tr.toString());

  if(cleaned != ""){
    sendToMongoDb(color,tr.toString());
  } 
  window.getSelection().empty();
  bubbleDOM.style.visibility = 'hidden';

}

function clean_string(text){ 
  var cleaned = text.replace(/\s/g, "")
  return cleaned;
}

function sendToMongoDb(color,text){
  // Connect to the db  
  if(not_saved(color,text) == true){
    var send_url = "https://api.mlab.com/api/1/databases/highlights/collections/highlights?apiKey=" + myAPIKey;
    var json = '';
    json = '{"url":' + '"' + filename + '",' + '"text":' + '"' + text + '",' + '"color":' + '"' + color + '"'+'}';
    var xhr = new XMLHttpRequest();
    xhr.open("POST", send_url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(json);
  }  
}

function not_saved(color,text){
  var get_data_url =  "https://api.mlab.com/api/1/databases/highlights/collections/highlights?q={'color':" + '"' + color + '",' + '"url":' + '"' + filename + '"'+ "}&apiKey=" + myAPIKey;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", get_data_url, false); // false for synchronous request
  xmlHttp.send(null);
  var data_objects = JSON.parse(xmlHttp.responseText); 
  for (var i =0; i < data_objects.length; i++){ 
    if((text == data_objects[i].text) && (data_objects[i].color == color)){ 
      updateItem(data_objects[i]);
    }
    if(((text == data_objects[i].text) || (data_objects[i].text.indexOf(text) !== -1)) && (data_objects[i].color == color)){ 
      return false;
    } //else {
      //replace color if exact match is re highlighted 
      //if subset is rehighlighted, save highlighted text into new object and remove text from longer string. 
    //}
  }
  return true;
}