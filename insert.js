var mySelection = window.getSelection().getRangeAt(0); 
var selectionContents=mySelection.cloneContents();
var bias = selectionContents.textContent ;  
var site = window.location.href;
var highlight_color = '';

//Create div that will have highlighting options
var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'selection_bubble');
document.body.appendChild(bubbleDOM);

//If there is text selected on the page, render the highlighting bubble
document.addEventListener('mouseup', function (e) {
  var selection = window.getSelection().toString();
  if (selection.length > 0) {
    renderBubble(e.clientX, e.clientY, selection);
  }
}, false);


//Render highlighting bubble
function renderBubble(mouseX, mouseY, selection) {
  bubbleDOM.innerHTML = "<button class='green'></button><button class='yellow'></button><button class='red'></button>";
  bubbleDOM.style.top = mouseY + 5 +'px';
  bubbleDOM.style.left = mouseX + 'px';
  bubbleDOM.style.visibility = 'visible';
  var tr = window.getSelection().getRangeAt(0); 
  $('.green').on('mousedown', function(e) {
      highlightText('green',tr);
  })
  $('.yellow').on('mousedown', function(e) {
    highlightText('yellow',tr);
  })
  $('.red').on('mousedown', function(e) {
    highlightText('red',tr);
  })
}
 
//Highlight text, push visual to webpage and send info to database 
function highlightText(color, tr){
  var span = document.createElement("span");
  span.className = color;
  span.appendChild(tr.extractContents());
  tr.insertNode(span);
  sendToDatabase(color,tr.toString()); 
  window.getSelection().empty();
  bubbleDOM.style.visibility = 'hidden';
}

//Send text, highlight color and url to firbase API
function sendToDatabase(color,tr){
  fetch('https://learningapi-6bca4.firebaseio.com/highlights.json', { 
    method: 'POST', 
    headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         },
    body: JSON.stringify({
      text: tr,
      color: color,
      url: site
    })
  })
  .then((result)=>{
    return result.json();
  }).then((json)=>{ 
    console.log(json);
  })
}