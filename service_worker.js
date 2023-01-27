import checkUrl from './blocked-sites/checkUrl.js'
import getCurrentTab from './src/getCurrentTab.js';

function setCheckingUrl(){
    console.info("DestroyPorn | Interval set - success.")

    setInterval(() => {
        checkUrl()
    }, 500);
}

chrome.windows.onCreated.addListener(function() {
    setCheckingUrl()
})

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        chrome.tabs.create({url : "https://destroyporn.eu/cdn/ext/installed.html?ref=extension_chromium"});    
    }
});

setTimeout(() => {
    chrome.tabs.query({ active: true }, function(tabs) {
        chrome.scripting
        .executeScript({
          target : {tabId: tabs[0].id},
          files : [ "./nsfw-detector/image/getAll.js" ],
        })
        .then(() => console.log("script injected"));
    });  
}, 5000);

