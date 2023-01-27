import checkUrl from './blocked-sites/checkUrl.js'
import getCurrentTab from './src/getCurrentTab.js';


/*
chrome.runtime.onInstalled.addListener((details)=>{
    if(details.reason == "install"){
        //chrome.tabs.create({url : "https://destroyporn.eu/cdn/ext/installed.html?ref=extension_chromium"});    
    }
});
*/


chrome.tabs.onCreated.addListener(async (el)=>{
    chrome.scripting.
    executeScript({
        target : await getCurrentTab(),
        files : [ "./nsfw-detector/image/getAll.js" ],
    })
    console.log("detected tab creation")
})

console.log("service worker started")




