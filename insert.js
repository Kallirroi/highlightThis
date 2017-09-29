

var mySelection = window.getSelection().getRangeAt(0); 
var selectionContents=mySelection.cloneContents(); 
var bias = selectionContents.textContent ; 
// console.log(bias);

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
		url: 'https://www.siteIread.com',
	})
})
.then((result)=>{ 
	// if (result.ok)
	return result.json();
}).then((json)=>{ 
	console.log(json);
})
