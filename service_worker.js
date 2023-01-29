import checkUrl from './blocked-sites/checkUrl.js'
import getCurrentTab from './src/getCurrentTab.js';

chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {
      if (changeInfo.url) {
        checkUrl()
      }
    }
);

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        //chrome.tabs.create({url : "https://destroyporn.eu/cdn/ext/installed.html?ref=extension_chromium"});    
    }
});



chrome.tabs.onCreated.addListener(async (el)=>{
    chrome.scripting.
    executeScript({
        target : await getCurrentTab(),
        files : [ "./nsfw-detector/image/getAll.js" ],
    })
    console.log("detected tab creation")
})

console.log("service worker started")




