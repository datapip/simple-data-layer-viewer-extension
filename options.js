window.onload = function () {	
	var tableContent = '<table id="table">\
		  <tr>\
			<td>1:</td>\
			<td><input type="text" id="dataLayer1"></td>\
		  </tr>\
		  <tr>\
			<td>2:</td>\
			<td><input type="text" id="dataLayer2"></td>\
		  </tr>\
		  <tr>\
			<td>3:</td>\
			<td><input type="text" id="dataLayer3"></td>\
		  </tr>\
		  <tr>\
			<td>4:</td>\
			<td><input type="text" id="dataLayer4"></td>\
		  </tr>\
		  <tr>\
			<td>5:</td>\
			<td><input type="text" id="dataLayer5"></td>\
		  </tr>\
		  <tr>\
			<td>6:</td>\
			<td><input type="text" id="dataLayer6"></td>\
		  </tr>\
		  <tr>\
			<td>7:</td>\
			<td><input type="text" id="dataLayer7"></td>\
		  </tr>\
		  <tr>\
			<td>8:</td>\
			<td><input type="text" id="dataLayer8"></td>\
		  </tr>\
		</table>\
	';
	document.getElementById("table").innerHTML = tableContent;
	chrome.storage.sync.get(["customDataLayer1", "customDataLayer2", "customDataLayer3", "customDataLayer4", "customDataLayer5", "customDataLayer6", "customDataLayer7", "customDataLayer8"], function(items) {
		if(Object.keys(items).length==0) {
			document.getElementById('dataLayer1').value = "dataLayer";
			document.getElementById('dataLayer2').value = "digitalData";
			document.getElementById('dataLayer3').value = "tc_vars";
			document.getElementById('dataLayer4').value = "utag.data";
			document.getElementById('dataLayer5').value = "udo";
		}
	});
}	

// Saves options to chrome.storage
function save_options() {
	var dataLayer1 = document.getElementById('dataLayer1').value;
	var dataLayer2 = document.getElementById('dataLayer2').value;
	var dataLayer3 = document.getElementById('dataLayer3').value;
	var dataLayer4 = document.getElementById('dataLayer4').value;
	var dataLayer5 = document.getElementById('dataLayer5').value;
	var dataLayer6 = document.getElementById('dataLayer6').value;
	var dataLayer7 = document.getElementById('dataLayer7').value;
	var dataLayer8 = document.getElementById('dataLayer8').value;

	chrome.storage.sync.set({
			customDataLayer1: dataLayer1,
			customDataLayer2: dataLayer2,
			customDataLayer3: dataLayer3,
			customDataLayer4: dataLayer4,
			customDataLayer5: dataLayer5,
			customDataLayer6: dataLayer6,
			customDataLayer7: dataLayer7,
			customDataLayer8: dataLayer8
		}, function() {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
		  status.textContent = '';
		}, 2000);
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get(["customDataLayer1", "customDataLayer2", "customDataLayer3", "customDataLayer4", "customDataLayer5", "customDataLayer6", "customDataLayer7", "customDataLayer8"], function(items) {
	(items.customDataLayer1) && (document.getElementById('dataLayer1').value = items.customDataLayer1);
	(items.customDataLayer2) && (document.getElementById('dataLayer2').value = items.customDataLayer2);
	(items.customDataLayer3) && (document.getElementById('dataLayer3').value = items.customDataLayer3);
	(items.customDataLayer4) && (document.getElementById('dataLayer4').value = items.customDataLayer4);
	(items.customDataLayer5) && (document.getElementById('dataLayer5').value = items.customDataLayer5);
	(items.customDataLayer6) && (document.getElementById('dataLayer6').value = items.customDataLayer6);
	(items.customDataLayer7) && (document.getElementById('dataLayer7').value = items.customDataLayer7);
	(items.customDataLayer8) && (document.getElementById('dataLayer8').value = items.customDataLayer8);
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);