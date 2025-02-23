function modifyLinks() {
  const links = document.getElementsByTagName('a');
  for (let link of links) {
    if (link.href && !link.href.startsWith('https://smry.ai/')) {
      link.href = 'https://smry.ai/' + link.href;
    }
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'modifyLinks') {
    modifyLinks();
    sendResponse({status: 'Links modified'});
  }
});
