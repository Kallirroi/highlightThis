
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	//if the highlight button is clicked
    if( request.message === "clicked_browser_action" ) {

      // Communicate with background.js
      chrome.runtime.sendMessage({
      	"message": "highlighted_element"
      });
    }
  }
);




