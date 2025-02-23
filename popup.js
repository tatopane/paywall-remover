document.addEventListener('DOMContentLoaded', () => {
  const domainsTextarea = document.getElementById('domains');
  const saveButton = document.getElementById('save');

  // Load saved domains
  chrome.storage.sync.get('domains').then((result) => {
    domainsTextarea.value = result.domains || '';
  }).catch((error) => {
    console.error('Error loading domains:', error);
  });

  // Save domains
  saveButton.addEventListener('click', () => {
    const domains = domainsTextarea.value;
    chrome.storage.sync.set({domains: domains}).then(() => {
      alert('Domains saved!');
    }).catch((error) => {
      console.error('Error saving domains:', error);
      alert('Error saving domains. Please try again.');
    });
  });
});
