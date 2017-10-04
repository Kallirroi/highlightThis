var mySelection = window.getSelection().getRangeAt(0); 
var selectionContents=mySelection.cloneContents(); 
var bias = selectionContents.textContent ; 

var site = window.location.href; 
console.log(mySelection); 

// Add bubble to the top of the page.
var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'selection_bubble');
document.body.appendChild(bubbleDOM);

// Lets listen to mouseup DOM events.
document.addEventListener('mouseup', function (e) {

  var selection = window.getSelection().toString();
  if (selection.length > 0) {
    renderBubble(e.clientX, e.clientY, selection);
  }
}, false);

// Close the bubble when we click on the screen.
document.addEventListener('mousedown', function (e) {
  var tooltip = document.getElementById('container');
  tooltip.style.visibility = 'hidden';
}, false);

//change background color when button is clicked
$('.green').on('mousedown', function(e) {
  var selection = window.getSelection().toString();
  console.log(selection)
  if (selection.length > 0) {
    var tr = window.getSelection().getRangeAt(0);
    var span = document.createElement("span"); 
    span.className = 'green';
    span.appendChild(tr.extractContents());
    tr.insertNode(span);
  }
})

$('.red').on('mousedown', function(e) {
  var selection = window.getSelection().toString();
  console.log(selection)
  if (selection.length > 0) {
    var tr = window.getSelection().getRangeAt(0);
    var span = document.createElement("span"); 
    span.className = 'red';
    span.appendChild(tr.extractContents());
    tr.insertNode(span);
  }
})

$('.yellow').on('mousedown', function(e) {
  var selection = window.getSelection().toString();
  console.log(selection)
  if (selection.length > 0) {
    var tr = window.getSelection().getRangeAt(0);
    var span = document.createElement("span"); 
    span.className = 'yellow';
    span.appendChild(tr.extractContents());
    tr.insertNode(span);
  }
})

$('.none').on('mousedown', function(e) {
  var selection = window.getSelection().toString();
  if (selection.length > 0) {
    var tr = window.getSelection().getRangeAt(0);
    var span = document.createElement("span"); 
    span.className = 'none-highlight';
    span.appendChild(tr.extractContents());
    tr.insertNode(span);
  }
})


// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, selection) {
  var tooltip = document.getElementById('container');
  tooltip.style.top = mouseY + 5 + 'px';
  tooltip.style.left = mouseX + 'px';
  tooltip.style.visibility = 'visible';
}
// var howMany = Object.keys(localStorage).length + 1;
// localStorage.setItem('highlight '+ howMany, JSON.stringify(bias));


fetch('https://learningapi-6bca4.firebaseio.com/highlights.json', { 
	method: 'POST', 
	headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
	body: JSON.stringify({
		text: bias,
		color: 'green',
		url: site
	})
})
.then((result)=>{
	return result.json();
}).then((json)=>{ 
	console.log(json);
})
