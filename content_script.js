// content_script.js
let currentTweet = null;

document.addEventListener('mouseover', function (event) {
  let tweetElement = event.target.closest('article');
  if (tweetElement && tweetElement !== currentTweet) {
    // Update the current tweet
    currentTweet = tweetElement;

    

    if (tweetElement) {
      let tweetText = tweetElement.querySelector('[lang]').innerText;
      console.log("Hovered Tweet Text: ", tweetText);

      chrome.runtime.sendMessage({ tweetText: tweetText }, function (response) {
        console.log('Response from background', response);
        chrome.runtime.sendMessage({ tweetText: response.explanation });
      })

    }
  }

});

document.addEventListener('mouseleave', function() {
  currentTweet = null;
});