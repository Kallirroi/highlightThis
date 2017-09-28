
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });

});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "highlighted_element" ) {
		
		chrome.tabs.executeScript({
			code: 'var mySelection = window.getSelection().getRangeAt(0); var selectionContents=mySelection.cloneContents(); console.log(selectionContents.textContent)'
		});

		// chrome.tabs.insertCSS({
		// 	file: "addedStyles.css"
		// });

        // chrome.tabs.create({"url": request.url});
    }
  }
);