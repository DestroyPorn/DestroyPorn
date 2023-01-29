import { createBlacklist, getCurrentTabId } from "../service_worker";

let blacklist = await createBlacklist()

export function checkUrl(url:string | URL) {
    url = new URL(url)
    return blacklist.has(url.hostname)
}

export async function replacecurrentTab(blockedSite:string){
    chrome.tabs.get(await getCurrentTabId(),(tab)=>{
        chrome.tabs.update({
            url:`https://destroyporn.eu/cdn/ext/blocked-website.html?ref=extension_chromium&website=${blockedSite}`
        })
    })
}
