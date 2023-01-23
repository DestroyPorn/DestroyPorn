export function checkUrl() {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        var tab = tabs[0];
        
        try {
            let domain = (new URL(tab.url));
            domain = domain.hostname;

            fetchAndCheck(domain)
        } catch (err) {

        }

        function fetchAndCheck(domainName){
            fetch('https://raw.githubusercontent.com/DestroyPorn/NSFW-Websites/main/Lists/simple-list.json') //a list of nsfw websites.
            .then((response) => response.json())
            .then((fetchedList) => {
                var domain = domainName.toString().split('.').reverse().splice(0,2).reverse().join('.')

                if(fetchedList.domains.includes(domain)){
                    chrome.tabs.query({ active: true }, function(tabs) {
                        chrome.tabs.remove(tabs[0].id);
                        chrome.tabs.create({url : `https://destroyporn.eu/cdn/ext/blocked-website.html?ref=extension_chromium&website=${domain}`});     
                    });  

                    return;
                } else {
                    
                }
            });
        }

        function callbackFromClose(){
            console.info("DestroyPorn | This tab contained adult content.")
        }
    }); 
}