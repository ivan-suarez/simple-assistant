// background.js

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.tweetText) {
      console.log('Received tweet text:', request.tweetText);
      
      fetch('http://localhost:11434/api/generate', { // Replace with your local Ollama server URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama2',
          prompt: 'Explain this tweet in a single sentence'+request.tweetText
      })
      })
      .then(response => response.text())
      .then(text => {
        const jsonObjects = text.split('\n').filter(line => line.trim() !== '');
        const data = jsonObjects.map(json => JSON.parse(json));
                
                // Combine the responses
        const combinedResponse = data.map(item => item.response).join('');
        console.log('Explanation from Ollama:', combinedResponse);
        sendResponse({ explanation: combinedResponse });
      })
      .catch(error => {
        console.log('Error:', error);
        sendResponse({ explanation: error });
      });
  
      // Return true to indicate that the response will be sent asynchronously
      return true;
    }
  });
  