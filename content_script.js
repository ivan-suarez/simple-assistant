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
        //tweetElement.querySelector('[lang]').innerText = tweetText + 'EXPLANATION: ' + response.explanation;
        showPopup(event, response.explanation); // Pass the event to showPopup
      });
    }
  }
});

document.addEventListener('mouseleave', function() {
  currentTweet = null;
});

function showPopup(event, text) {
  let popup = document.createElement('div');
  popup.id = 'my-extension-popup';
  popup.style.position = 'absolute';
  popup.style.top = `${event.pageY}px`; // Use event.pageY for Y coordinate
  popup.style.left = `${event.pageX}px`; // Use event.pageX for X coordinate
  popup.style.backgroundColor = 'white';
  popup.style.color = 'black';
  popup.style.border = '1px solid black';
  popup.style.padding = '10px';
  popup.innerHTML = `
    <h1>Explanation</h1>
    <p>${text}</p>`;

  document.body.appendChild(popup);

  // Remove the popup when clicking anywhere else
  document.addEventListener('click', function removePopup(event) {
    if (!popup.contains(event.target)) {
      popup.remove();
      document.removeEventListener('click', removePopup);
    }
  });
}
