const defaults = {	
	"dataLayer1": "dataLayer", 
	"dataLayer2": "digitalData", 
	"dataLayer3": "tc_vars", 
	"dataLayer4": "utag_data", 
	"dataLayer5": "udo" 
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set(defaults)
});