export default function getCurrentTab() {
    chrome.tabs.query({ active: true }, function(tabs) {
        return tabs[0].id
    });  
}