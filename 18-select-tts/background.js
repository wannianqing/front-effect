console.log('background.js')

chrome.runtime.onMessage.addListener(
  (request,sender,sendResponse) => {
    console.log(request,sender,sendResponse)
    chrome.tts.speak(request.text)
    sendResponse({farewell:'ok'})
  }
)