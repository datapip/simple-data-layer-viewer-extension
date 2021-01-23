// keys for saved data layer names
var keys =	[
	"customDataLayer1", 
	"customDataLayer2", 
	"customDataLayer3", 
	"customDataLayer4", 
	"customDataLayer5", 
	"customDataLayer6", 
	"customDataLayer7", 
	"customDataLayer8"
];

function create_names() {	
	// write saved data layer name to options html
	chrome.storage.sync.get(keys, function(items) {
		for(var i = 1; i <= Object.keys(items).length; i++) {
			var currentValue = items["customDataLayer"+i];
			document.getElementById("dataLayer"+i).value = currentValue;
			if(currentValue.length > 0) {
				valuesFound = true;
			}
		}
	});
}

function save_names() {
	// create options object from data layer names in options html
	var customNames = {};
	for(var i = 1; i <= keys.length; i++) {
		customNames["customDataLayer"+i] = document.getElementById("dataLayer"+i).value
	}
	
	// save data layer names to storage and show success message
	chrome.storage.sync.set(customNames, function() {
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
		status.textContent = '';
		}, 2000);
	});
}

function close_window() {
	window.close();
}

window.onload = create_names();

document.querySelector("#save").addEventListener('click', save_names);
document.querySelector("#close").addEventListener('click', close_window);