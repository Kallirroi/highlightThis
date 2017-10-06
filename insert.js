var mySelection = window.getSelection().getRangeAt(0); 
var selectionContents=mySelection.cloneContents();
var bias = selectionContents.textContent ;  
var site = window.location.href;
var highlight_color = '';

var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'selection_bubble');
document.body.appendChild(bubbleDOM);


document.addEventListener('mouseup', function (e) {
  var selection = window.getSelection().toString();
  if (selection.length > 0) {
    renderBubble(e.clientX, e.clientY, selection);
  }
}, false);


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
 
function highlightText(color, tr){
  var span = document.createElement("span");
  span.className = color;
  span.appendChild(tr.extractContents());
  tr.insertNode(span);
  sendToDatabase(color,tr.toString()); 
  window.getSelection().empty();
  bubbleDOM.style.visibility = 'hidden';
}

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