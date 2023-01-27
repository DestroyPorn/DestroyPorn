



/*
chrome.runtime.onInstalled.addListener((details)=>{
    if(details.reason == "install"){
        //chrome.tabs.create({url : "https://destroyporn.eu/cdn/ext/installed.html?ref=extension_chromium"});    
    }
});
*/

async function getCurrentTabId():Promise<number| undefined> {
    let queryOptions = { active: true, lastFocusedWindow: true };

    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
}


chrome.tabs.onCreated.addListener(async (el)=>{
    chrome.scripting.
    executeScript({
        target : {tabId: 1},
        files : [ "./nsfw-detector/image/getAll.js" ],
    })
    console.log("detected tab creation")
})

console.log("service worker started")




