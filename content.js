// forward incoming data from website to popup.js
document.addEventListener('sendDataLayerInformation', function(e) {
	chrome.runtime.sendMessage(e.detail);
});

// append inject.js to current website
(() => {
	var script = document.createElement("script");
	script.id = "simpleDataLayerViewerHelper";
	script.src = chrome.runtime.getURL("inject.js");
	(document.head||document.documentElement).appendChild(script);
})();