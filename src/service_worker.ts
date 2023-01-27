import getAll from "./nsfw-detector/image/getAll.js";




chrome.runtime.onInstalled.addListener((details)=>{
    if(details.reason == "install"){
        //chrome.tabs.create({url : "https://destroyporn.eu/cdn/ext/installed.html?ref=extension_chromium"});    
    }
});


async function getCurrentTabId():Promise<number| undefined> {
    try{
        let queryOptions = { active: true, lastFocusedWindow: true };
    
        let [tab] = await chrome.tabs.query(queryOptions);
        return tab.id;
    }catch(err){
        console.log(err)
    }
}




chrome.tabs.onCreated.addListener(async (el)=>{
    chrome.scripting.
    executeScript({
        target :{tabId: await getCurrentTabId()},
        func: getAll
    })
    console.log("detected tab creation")
})

console.log("service worker started")




