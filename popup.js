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

function set_defaults() {
	chrome.storage.sync.get(keys, function(items) {
		// set default data layer names 
		if(Object.keys(items).length === 0) {
			var defaultNames = {
				"customDataLayer1": "dataLayer",
				"customDataLayer2": "digitalData",
				"customDataLayer3": "tc_vars",
				"customDataLayer4": "utag.data",
				"customDataLayer5": "udo"
			};
			chrome.storage.sync.set(defaultNames, initate_check);
		} else {
			initate_check();
		}
	})
}

function initate_check() {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {action: "getData"}, function(response) {
			
			var index = 0;
			var version = "Version 1.5";
			
			// set content for nor result
			if(!response || !response.data.length > 0) {
				var noResult = '<div id="data"><br>Sorry, none of the declared data layer names were found.<br><br>\
					You can declare custom data layer names in the options area.</div><br>\
					<div id="version">'+version+'</div>';
				displayContent(noResult);
				return;
			}
			
			// set content for result
			var result = '<p id="details"><i id="location"><b>on </b>'+response.url+'</i><br><i id="time"><b>at </b>'+new Date().toLocaleString({ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })+'</i></p>\
				<div id="selector"></div>\
				<div id="actions"><div id="collapseall">Collapse all</div><div id="expandall" style="display: none">Expand all</div><div id="copytoclipboard">Copy to clipboard</div></div>\
				<div id="data"></div>\
				<div id="version">'+version+'</div>';
			displayContent(result);
	
			// render data layer with syntax highlighting 
			var dataContainer = document.getElementById("data");
			dataContainer.appendChild(
				renderjson//.set_icons('+', '-')
				//.set_max_string_length(100)
				.set_show_to_level("all")(JSON.parse(response.data[index][1]))
			);
			
			// in case of several data layers found display navigation
			for(var i=0; i<response.data.length; i++) {
				var button = document.createElement('button');
				button.id = i;
				button.innerHTML = response.data[i][0];
				(i==0) && (button.className = 'activated');
				button.addEventListener('click', changeObject);
				document.getElementById('selector').appendChild(button);
			}

			// add event listeners
			var copyButton = document.getElementById('copytoclipboard');
			copyButton.addEventListener('click', copyObject);

			var collapseButton = document.getElementById('collapseall');
			collapseButton.addEventListener('click', handleSyntax);

			var expandButton = document.getElementById('expandall');
			expandButton.addEventListener('click', handleSyntax);

			
			// define helper functions
			// move between data layer objects
			function changeObject() {
				index = parseInt(this.id);
				expandButton.style.display = "none";
				collapseButton.style.display = "inline-block";
				for(var i=0; i < response.data.length; i++ ) {
					if(index != i) {
						document.getElementById(i).className = "";
					} else {
						document.getElementById(i).className = "activated";
					}
				}
				dataContainer.innerHTML = "";
				dataContainer.appendChild(
					renderjson//.set_icons('+', '-')
					.set_show_to_level("all")(JSON.parse(response.data[index][1]))
				);
			}

			// write to main 
			function displayContent(html) {
				var div = document.getElementById("loadercontainer");
				div.parentNode.removeChild(div);
				document.querySelector("main").innerHTML = html;
			}

			// copy json object to clipboard
			function copyObject() {
				var copyText = document.createElement("textarea");
				document.body.appendChild(copyText);
				copyText.value = response.data[index][1];
				copyText.select();
				document.execCommand("copy");
				document.body.removeChild(copyText);
			}

			// expand or collapse json object
			function handleSyntax() {
				var level = "all";
				if(this.id==="expandall") {
					expandButton.style.display = "none";
					collapseButton.style.display = "inline-block";
				}
				if(this.id==="collapseall") {
					expandButton.style.display = "inline-block";
					collapseButton.style.display = "none";
					level = "1";
				}
				dataContainer.innerHTML = "";
				dataContainer.appendChild(
					renderjson//.set_icons('+', '-')
					.set_show_to_level(level)(JSON.parse(response.data[index][1]))
				);
			}
		});
	});	
};

var optionsUrl = chrome.extension.getURL("options.html"); 
var content = '<a href="' + optionsUrl + '" target="_blank">&#9881;</a>';
document.querySelector("#options").innerHTML = content;

window.onload = set_defaults();