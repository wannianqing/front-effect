document.addEventListener('mouseup',function(e){
  const txt = window.getSelection().toString()
  if(txt !== ''){
    chrome.runtime.sendMessage({text:txt},function(response){
      console.log(response,'content script')
    })
  }
})