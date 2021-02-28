const keys =	[
	"dataLayer1", 
	"dataLayer2", 
	"dataLayer3", 
	"dataLayer4", 
	"dataLayer5", 
];

// get saved data layer names
chrome.storage.sync.get(keys, (items) => {
	keys.forEach((key) => {
		document.querySelector(`#${key}`).value = items[key];
	})
});

// add event listeners
(() => {
	document.querySelector("#save").addEventListener('click', save_names);
	document.querySelector("#close").addEventListener('click', close_window);
})();


/**
 * HELPER FUNCTIONS
 */

function save_names() {
	let names = {};
	
	keys.forEach((key) => {
		const value = document.querySelector(`#${key}`).value;
		names[key] = value;
	});
	
	chrome.storage.sync.set(names, function() {
		let status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(() => {
			status.textContent = '';
		}, 2000);
	});
}

function close_window() {
	window.close();
}