browser.browserAction.onClicked.addListener((tab) => {
  var xhttp = new XMLHttpRequest()
  xhttp.open("POST", "http://localhost:8000/add", true)
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  var url = encodeURIComponent(tab.url)
  xhttp.send("url="+url)
});
