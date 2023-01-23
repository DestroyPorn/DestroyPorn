function setCheckingUrl(){
    console.info("DestroyPorn | Interval set - success.")

    setInterval(() => {
        checkUrl()
    }, 500);
}

chrome.windows.onCreated.addListener(function() {
    setCheckingUrl()
})

setCheckingUrl()