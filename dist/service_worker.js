/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocked-sites/checkUrl.js":
/*!***************************************!*\
  !*** ./src/blocked-sites/checkUrl.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkUrl)
/* harmony export */ });
function checkUrl() {
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
                        chrome.tabs.update(tabs[0].id, { url: `https://destroyporn.eu/cdn/ext/blocked-website.html?ref=extension_chromium&website=${domain}` });
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/service_worker.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createBlacklist": () => (/* binding */ createBlacklist),
/* harmony export */   "getCurrentTabId": () => (/* binding */ getCurrentTabId)
/* harmony export */ });
/* harmony import */ var _blocked_sites_checkUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocked-sites/checkUrl.js */ "./src/blocked-sites/checkUrl.js");


chrome.runtime.onInstalled.addListener((details)=>{
    if(details.reason == "install"){
        chrome.tabs.create({url : "https://destroyporn.eu/cdn/ext/installed.html?ref=extension_chromium"});    
    }
});

async function getCurrentTabId(){
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
        (0,_blocked_sites_checkUrl_js__WEBPACK_IMPORTED_MODULE_0__["default"])()
      }
    }
);

chrome.runtime.onStartup.addListener(async ()=>{

})

async function createBlacklist(){
    let list = await(await fetch("https://raw.githubusercontent.com/DestroyPorn/NSFW-Websites/main/Lists/simple-list.json")).json()
    return new Set(list.domains)
}

console.log("service worker started");

(async()=>{
    console.log(await createBlacklist())
})()

chrome.runtime.setUninstallURL("https://destroyporn.eu/cdn/ext/uninstalled.html?ref=extension_chromium")

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZV93b3JrZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTs7QUFFVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0NBQXdDLGNBQWM7QUFDdEQseURBQXlELDJGQUEyRixPQUFPLEdBQUc7QUFDOUoscUJBQXFCOztBQUVyQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7O1VDdENBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTmtEOztBQUVsRDtBQUNBO0FBQ0EsNEJBQTRCLDZFQUE2RTtBQUN6RztBQUNBLENBQUM7O0FBRU07QUFDUDtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsK0JBQStCO0FBQ2hEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0VBQVE7QUFDaEI7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRU07QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZXN0cm95cG9ybi8uL3NyYy9ibG9ja2VkLXNpdGVzL2NoZWNrVXJsLmpzIiwid2VicGFjazovL2Rlc3Ryb3lwb3JuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Rlc3Ryb3lwb3JuL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kZXN0cm95cG9ybi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Rlc3Ryb3lwb3JuL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZGVzdHJveXBvcm4vLi9zcmMvc2VydmljZV93b3JrZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tVcmwoKSB7XG4gICAgY2hyb21lLnRhYnMucXVlcnkoe1xuICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgIGxhc3RGb2N1c2VkV2luZG93OiB0cnVlXG4gICAgfSwgZnVuY3Rpb24odGFicykge1xuICAgICAgICB2YXIgdGFiID0gdGFic1swXTtcbiAgICAgICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgZG9tYWluID0gKG5ldyBVUkwodGFiLnVybCkpO1xuICAgICAgICAgICAgZG9tYWluID0gZG9tYWluLmhvc3RuYW1lO1xuXG4gICAgICAgICAgICBmZXRjaEFuZENoZWNrKGRvbWFpbilcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGZldGNoQW5kQ2hlY2soZG9tYWluTmFtZSl7XG4gICAgICAgICAgICBmZXRjaCgnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0Rlc3Ryb3lQb3JuL05TRlctV2Vic2l0ZXMvbWFpbi9MaXN0cy9zaW1wbGUtbGlzdC5qc29uJykgLy9hIGxpc3Qgb2YgbnNmdyB3ZWJzaXRlcy5cbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oKGZldGNoZWRMaXN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGRvbWFpbiA9IGRvbWFpbk5hbWUudG9TdHJpbmcoKS5zcGxpdCgnLicpLnJldmVyc2UoKS5zcGxpY2UoMCwyKS5yZXZlcnNlKCkuam9pbignLicpXG5cbiAgICAgICAgICAgICAgICBpZihmZXRjaGVkTGlzdC5kb21haW5zLmluY2x1ZGVzKGRvbWFpbikpe1xuICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSB9LCBmdW5jdGlvbih0YWJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy51cGRhdGUodGFic1swXS5pZCwgeyB1cmw6IGBodHRwczovL2Rlc3Ryb3lwb3JuLmV1L2Nkbi9leHQvYmxvY2tlZC13ZWJzaXRlLmh0bWw/cmVmPWV4dGVuc2lvbl9jaHJvbWl1bSZ3ZWJzaXRlPSR7ZG9tYWlufWAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pOyAgXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2FsbGJhY2tGcm9tQ2xvc2UoKXtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIkRlc3Ryb3lQb3JuIHwgVGhpcyB0YWIgY29udGFpbmVkIGFkdWx0IGNvbnRlbnQuXCIpXG4gICAgICAgIH1cbiAgICB9KTsgXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgY2hlY2tVcmwgZnJvbSAnLi9ibG9ja2VkLXNpdGVzL2NoZWNrVXJsLmpzJ1xuXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoZGV0YWlscyk9PntcbiAgICBpZihkZXRhaWxzLnJlYXNvbiA9PSBcImluc3RhbGxcIil7XG4gICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7dXJsIDogXCJodHRwczovL2Rlc3Ryb3lwb3JuLmV1L2Nkbi9leHQvaW5zdGFsbGVkLmh0bWw/cmVmPWV4dGVuc2lvbl9jaHJvbWl1bVwifSk7ICAgIFxuICAgIH1cbn0pO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudFRhYklkKCl7XG4gICAgdHJ5e1xuICAgICAgICBsZXQgcXVlcnlPcHRpb25zID0geyBhY3RpdmU6IHRydWUsIGxhc3RGb2N1c2VkV2luZG93OiB0cnVlIH07XG4gICAgICAgIGxldCBbdGFiXSA9IGF3YWl0IGNocm9tZS50YWJzLnF1ZXJ5KHF1ZXJ5T3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0YWIuaWQ7XG4gICAgfWNhdGNoKGVycil7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICB9XG59XG5cbmNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcihhc3luYyAodGFiSWQsIGluZm8pPT57XG4gICAgY2hyb21lLnNjcmlwdGluZy5cbiAgICBleGVjdXRlU2NyaXB0KHtcbiAgICAgICAgdGFyZ2V0IDp7dGFiSWQ6IGF3YWl0IGdldEN1cnJlbnRUYWJJZCgpfSxcbiAgICAgICAgZmlsZXM6IFtcIi4vZGlzdC9pbmplY3RvcnNjcmlwdC5qc1wiXVxuICAgIH0pXG4gICAgXG4gICAgY29uc29sZS5sb2coXCJkZXRlY3RlZCB0YWIgdXBkYXRlXCIpXG59KVxuXG5jaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb25cbiAgICAodGFiSWQsIGNoYW5nZUluZm8sIHRhYikge1xuICAgICAgaWYgKGNoYW5nZUluZm8udXJsKSB7XG4gICAgICAgIGNoZWNrVXJsKClcbiAgICAgIH1cbiAgICB9XG4pO1xuXG5jaHJvbWUucnVudGltZS5vblN0YXJ0dXAuYWRkTGlzdGVuZXIoYXN5bmMgKCk9PntcblxufSlcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUJsYWNrbGlzdCgpe1xuICAgIGxldCBsaXN0ID0gYXdhaXQoYXdhaXQgZmV0Y2goXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vRGVzdHJveVBvcm4vTlNGVy1XZWJzaXRlcy9tYWluL0xpc3RzL3NpbXBsZS1saXN0Lmpzb25cIikpLmpzb24oKVxuICAgIHJldHVybiBuZXcgU2V0KGxpc3QuZG9tYWlucylcbn1cblxuY29uc29sZS5sb2coXCJzZXJ2aWNlIHdvcmtlciBzdGFydGVkXCIpO1xuXG4oYXN5bmMoKT0+e1xuICAgIGNvbnNvbGUubG9nKGF3YWl0IGNyZWF0ZUJsYWNrbGlzdCgpKVxufSkoKVxuXG5jaHJvbWUucnVudGltZS5zZXRVbmluc3RhbGxVUkwoXCJodHRwczovL2Rlc3Ryb3lwb3JuLmV1L2Nkbi9leHQvdW5pbnN0YWxsZWQuaHRtbD9yZWY9ZXh0ZW5zaW9uX2Nocm9taXVtXCIpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=