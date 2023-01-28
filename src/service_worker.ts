import getAll from "./nsfw-detector/image/getAll.js";

import example from "./nsfw-detector/image/example.js"

let blacklistSet:Set<string>

chrome.runtime.onInstalled.addListener((details)=>{
    if(details.reason == "install"){
        chrome.tabs.create({url : "https://destroyporn.eu/cdn/ext/installed.html?ref=extension_chromium"});    
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

chrome.tabs.onUpdated.addListener(async (tabId, info)=>{
    chrome.scripting.
    executeScript({
        target :{tabId: await getCurrentTabId()},
        func: getAll
    })
    
    console.log("detected tab update")
})

chrome.runtime.onStartup.addListener(async ()=>{

    
    
    
})

export async function createBlacklist(){
    let list:string[] = await(await fetch("https://raw.githubusercontent.com/DestroyPorn/NSFW-Websites/main/Lists/simple-list.json")).json()
    
    return new Set(list)
}


console.log("service worker started")

console.log(example())
