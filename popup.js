// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.tweetText) {
      document.getElementById('tweetText').innerText = message.tweetText;
  }
});
