
//running in background all the time (ADD THIS)
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) { 
    console.log('Hello' + request.message);
    if( request.message === "highlighted_element" ) {
  		chrome.tabs.executeScript(null, {
        file: "insert.js"
  		});

  		chrome.tabs.insertCSS({
  			file: "styles.css"
  		});

    }
  }
);


// Called when the user clicks on the browser action.
// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
//   console.log('Turning ' + tab.url + ' red!');
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="red"'
//   });
// });
