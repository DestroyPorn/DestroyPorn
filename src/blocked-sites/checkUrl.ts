import { createBlacklist } from "../service_worker.js";

export default function checkUrl(url:string | URL) {

    async function fetchAndCheck(domainName){
        let blacklist = await createBlacklist()

            var domain = domainName.toString().split('.').reverse().splice(0,2).reverse().join('.')

            if(blacklist.has(domain)){
                chrome.tabs.query({ active: true }, function(tabs) {
                    chrome.tabs.remove(tabs[0].id);
                    chrome.tabs.create({url : `https://destroyporn.eu/cdn/ext/blocked-website.html?ref=extension_chromium&website=${domain}`});     
                });  

                return;
            } else {
                
            }
        
    }

    function callbackFromClose(){
        console.info("DestroyPorn | This tab contained adult content.")
    }
}