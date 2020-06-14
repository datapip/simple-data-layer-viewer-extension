chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.action == "getData"){
		
		document.addEventListener('sendDataLayerInformation', function(e) {
			if (e.detail != undefined){
				sendResponse(e.detail);
			}
		});
		
		chrome.storage.sync.get(["customDataLayer1", "customDataLayer2", "customDataLayer3", "customDataLayer4", "customDataLayer5", "customDataLayer6", "customDataLayer7", "customDataLayer8"], function(items) {

			var keys = [];
			
			(items.customDataLayer1!="" && items.customDataLayer1!=" " && items.customDataLayer1!=undefined) && (keys.push(items.customDataLayer1));
			(items.customDataLayer2!="" && items.customDataLayer2!=" " && items.customDataLayer2!=undefined) && (keys.push(items.customDataLayer2));
			(items.customDataLayer3!="" && items.customDataLayer3!=" " && items.customDataLayer3!=undefined) && (keys.push(items.customDataLayer3));
			(items.customDataLayer4!="" && items.customDataLayer4!=" " && items.customDataLayer4!=undefined) && (keys.push(items.customDataLayer4));
			(items.customDataLayer5!="" && items.customDataLayer5!=" " && items.customDataLayer5!=undefined) && (keys.push(items.customDataLayer5));
			(items.customDataLayer6!="" && items.customDataLayer6!=" " && items.customDataLayer6!=undefined) && (keys.push(items.customDataLayer6));
			(items.customDataLayer7!="" && items.customDataLayer7!=" " && items.customDataLayer7!=undefined) && (keys.push(items.customDataLayer7));
			(items.customDataLayer8!="" && items.customDataLayer8!=" " && items.customDataLayer8!=undefined) && (keys.push(items.customDataLayer8));

			if(keys.length==0) {
				keys = ["dataLayer", "digitalData", "tc_vars", "utag.data", "udo"];
			}
			
			injectionCode = `setTimeout(function(){
				var keyList = ['`+keys.join("','")+`'];
				var resultList = [];	
				for(var i=0; i<keyList.length; i++) {
					if(keyList[i].indexOf(".")!==-1) {
						if(window[keyList[i].split(".")[0]]) {
							var keyArray = keyList[i].split(".");
							var dataObject = window[keyArray[0]];
							for(var j = 1; j < keyArray.length; j++) {
								if(typeof(dataObject)=='object') {
									dataObject = dataObject[keyArray[j]];
								}
							}
							nestedObject = [keyArray[0], (JSON.stringify(dataObject, null, 2)||"")];
							resultList.push(nestedObject);
						}
					} else if(window[keyList[i]]) {
						dataObject = [keyList[i], (JSON.stringify(window[keyList[i]], null, 2)||"")];
						resultList.push(dataObject);
					}
				}
				document.dispatchEvent(new CustomEvent('sendDataLayerInformation', {
					detail: {
						url: document.location.href,
						data: resultList
					}
				}));
				document.getElementById('simpleDataLayerScript').remove();
			}, 0);
			`;
				
			var script = document.createElement('script');
			script.id = 'simpleDataLayerScript';
			script.textContent = injectionCode;
			(document.head||document.documentElement).appendChild(script);	
		});				
	}
});