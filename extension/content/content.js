function handleMessage(request, sender, sendResponse) {
  browser.runtime.sendMessage({
    content: document.documentElement.outerHTML,
    url: window.location.href
  });
}
browser.runtime.onMessage.addListener(handleMessage);
