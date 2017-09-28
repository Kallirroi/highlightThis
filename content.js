chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {

      // Communicate with background.js
      chrome.runtime.sendMessage({
      	"message": "highlighted_element"
      });
    }
  }
);