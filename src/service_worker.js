import checkUrl from './blocked-sites/checkUrl.js'

chrome.runtime.onInstalled.addListener((details)=>{
    if(details.reason == "install"){
        chrome.tabs.create({url : "https://destroyporn.eu/cdn/ext/installed.html?ref=extension_chromium"});    
    }
});

export async function getCurrentTabId(){
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

chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {
      if (changeInfo.url) {
        checkUrl()
      }
    }
);

chrome.runtime.onStartup.addListener(async ()=>{

})

export async function createBlacklist(){
    let list = await(await fetch("https://raw.githubusercontent.com/DestroyPorn/NSFW-Websites/main/Lists/simple-list.json")).json()
    return new Set(list.domains)
}

console.log("service worker started");

(async()=>{
    console.log(await createBlacklist())
})()

chrome.runtime.setUninstallURL("https://destroyporn.eu/cdn/ext/uninstalled.html?ref=extension_chromium")
