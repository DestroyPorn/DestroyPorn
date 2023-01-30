import nsfw from "@bakedpotatolord/nsfwjs"
import type { message,imageMessage } from "./injectorScript";
import type { prediction } from "./classify";

let model:nsfw.NSFWJS;

console.log(nsfw);

(async()=>{
    model = await nsfw.load()
})()

export interface identificationMessage extends message{
    prediction:prediction
}

chrome.runtime.onMessage.addListener(async (message:imageMessage,sender,sendResponse)=>{
    if(message.from == "injector"){

        sendResponse(<identificationMessage>{

            from:"worker",
            prediction: await model.classify(message.image)[0]
        })
    }
})

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

chrome.tabs.onUpdated.addListener(async (tabId, info)=>{
    chrome.scripting.
    executeScript({
        target :{tabId: await getCurrentTabId()},
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


