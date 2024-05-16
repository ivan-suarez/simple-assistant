// content_script.js

document.addEventListener('mouseover', function(event) {
    let tweetElement = event.target.closest('article');
    
    if (tweetElement) {
      let tweetText = tweetElement.querySelector('[lang]').innerText;
      console.log("Hovered Tweet Text: ", tweetText);
    }
  });
  