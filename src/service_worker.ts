
import type { message,imageMessage } from "./injectorScript";
import type { prediction } from "./classify";


export interface identificationMessage extends message{
    prediction:prediction
}



chrome.runtime.onInstalled.addListener((details)=>{
    if(details.reason == "install"){
        chrome.tabs.create({url : "https://destroyporn.eu/cdn/ext/installed.html?ref=extension_chromium"});    
    }
});

export async function getCurrentTabId():Promise<number| undefined> {
    try{
        let queryOptions = { active: true, lastFocusedWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        return tab.id;
    }catch(err){
        console.log(err)
    }
}

chrome.tabs.onUpdated.addListener(async (tabId)=>{
    chrome.scripting.
    executeScript({
        target :{tabId},
        files: ['./lib/tensorflow.js',"./lib/nsfwjs.js"]
        
    })
    chrome.scripting.
    executeScript({
        target :{tabId},
        files: ["./dist/injectorscript.js"]
        
    })
    
    console.log("detected tab update")
})


chrome.runtime.onStartup.addListener(async ()=>{

})

export async function createBlacklist(){
    let list:{domains:string[]} = await(await fetch("https://raw.githubusercontent.com/DestroyPorn/NSFW-Websites/main/Lists/simple-list.json")).json()
    return new Set(list.domains)
}

console.log("service worker started");

(async()=>{
    console.log(await createBlacklist())
})()


