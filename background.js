function matchDomain(urlDomain, targetDomain) {
  // Remove 'www.' from both domains for comparison
  const normalizedUrlDomain = urlDomain.replace(/^www\./, '');
  const normalizedTargetDomain = targetDomain.replace(/^www\./, '');

  // Check if the domains match exactly or if the URL domain ends with '.' + target domain
  return normalizedUrlDomain === normalizedTargetDomain ||
         normalizedUrlDomain.endsWith('.' + normalizedTargetDomain);
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.sync.get('domains').then((result) => {
      const domains = result.domains ? result.domains.split(',').map(d => d.trim()) : [];
      
      if (!tab.url) {
        console.log('Tab URL is undefined:', tab);
        return; // Exit if tab.url is undefined
      }

      let currentDomain;
      try {
        const url = new URL(tab.url);
        currentDomain = url.hostname;
      } catch (error) {
        console.error('Invalid URL:', tab.url, 'Error:', error.message);
        return; // Exit the function if the URL is invalid
      }
      
      const matchedDomain = domains.find(domain => matchDomain(currentDomain, domain));
      if (matchedDomain) {
        chrome.tabs.sendMessage(tabId, {action: 'modifyLinks'});
      }
    }).catch((error) => {
      console.error('Error retrieving domains:', error);
    });
  }
});
