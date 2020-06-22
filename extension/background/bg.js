function copyToClipboad(text) {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

browser.browserAction.onClicked.addListener((tab) => {
  browser.tabs.sendMessage(tab.id, {})
});

function handleMessage(request, sender, sendResponse) {
  console.log(request)
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    copyToClipboad(xhttp.responseText)
  }
  xhttp.open("POST", "http://localhost:8000/add", true)
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  var url = encodeURIComponent(request.url)
  var cont = encodeURIComponent(request.content)
  console.log(cont)
  xhttp.send("url="+url+"&content="+cont)
  console.log("sent")
}

browser.runtime.onMessage.addListener(handleMessage);
