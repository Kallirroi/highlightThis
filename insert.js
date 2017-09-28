

var mySelection = window.getSelection().getRangeAt(0); 
var selectionContents=mySelection.cloneContents(); 
var bias = selectionContents.textContent ; 
// console.log(bias);

var howMany = Object.keys(localStorage).length + 1;
localStorage.setItem('highlight '+ howMany, JSON.stringify(bias));

Object.keys(localStorage).forEach(key => console.log(localStorage[key]));
console.log("------//--------")

// var div=document.createElement("div"); 
// document.body.appendChild(div); 
// div.className="notepad";
// div.innerText=bias;