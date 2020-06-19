function copyToClipboad(text) {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

browser.browserAction.onClicked.addListener((tab) => {
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    copyToClipboad(xhttp.responseText)
  }
  xhttp.open("POST", "http://localhost:8000/add", true)
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  var url = encodeURIComponent(tab.url)
  xhttp.send("url="+url)
});
