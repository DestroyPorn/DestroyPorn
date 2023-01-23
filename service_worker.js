import { checkUrl } from './blocked-sites/checkUrl.js'

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