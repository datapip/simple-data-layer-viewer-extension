window.onload = getAndDisplayDataLayer();

function getAndDisplayDataLayer() {	
	document.querySelector("#close").addEventListener("click", function() {
        window.close();
    });
	chrome.tabs.getSelected(null, function(tab) {
		// Send a request to the content script.
		//try{
			var getData = chrome.tabs.sendRequest(tab.id, {action: "getData"}, function(response) {
				if(response) {
					var version = "Version 1.5";
					if(response.data.length > 0) {
						var index = 0;
						var div = document.getElementById("loadercontainer");
						div.parentNode.removeChild(div);
						var now = new Date();
						document.getElementById("content").innerHTML = 
							'<h2 id="headline">'+response.data[0][0]+'</h2>\
							<p id="details"><i id="location"><b>on </b>'+response.url+'</i><br><i id="time"><b>at </b>'+now.toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })+'</i></p>\
							<div id="selector"></div>\
							<div id="buttons"><div id="collapseall">Collapse all</div><div id="expandall" style="display: none">Expand all</div><div id="copytoclipboard">Copy to clipboard</div></div>\
							<div id="data"></div>\
							<div id="version">'+version+'</div>';
						
						var dataContainer = document.getElementById("data");
						dataContainer.appendChild(
							renderjson//.set_icons('+', '-')
							.set_show_to_level("all")(JSON.parse(response.data[0][1]))
						);

						var copyButton = document.getElementById('copytoclipboard');
						copyButton.addEventListener('click', copyObject);

						function copyObject() {
							var copyText = document.createElement("textarea");
							document.body.appendChild(copyText);
							copyText.value = response.data[index][1];
							copyText.select();
							document.execCommand("copy");
							document.body.removeChild(copyText);
						}

						var collapseButton = document.getElementById('collapseall');
						collapseButton.addEventListener('click', function() {handleSyntax('collapse')});

						var expandButton = document.getElementById('expandall');
						expandButton.addEventListener('click', function() {handleSyntax('expand')});

						function handleSyntax(task) {
							console.log(this.id);
							console.log(response.data);
							if(task==="expand") {
								expandButton.style.display = "none";
								collapseButton.style.display = "inline-block";
								dataContainer.innerHTML = "";
								dataContainer.appendChild(
									renderjson//.set_icons('+', '-')
									.set_show_to_level("all")(JSON.parse(response.data[index][1]))
								);
								document.getElementById("headline").innerHTML = response.data[index][0];
							}
							if(task==="collapse") {
								expandButton.style.display = "inline-block";
								collapseButton.style.display = "none";
								dataContainer.innerHTML = "";
								dataContainer.appendChild(
									renderjson//.set_icons('+', '-')
									.set_show_to_level("1")(JSON.parse(response.data[index][1]))
								);
								document.getElementById("headline").innerHTML = response.data[index][0];
							}
						}
						
						if(response.data.length > 1) {
							for(var i=0; i<response.data.length; i++) {
								var button = document.createElement('button');
								button.id = i;
								button.innerHTML = response.data[i][0];
								(i==0) && (button.className = 'activated');
								button.addEventListener('click', changeObject);
								document.getElementById('selector').appendChild(button);
							}

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
								document.getElementById("headline").innerHTML = response.data[index][0];
							}
							
						}
							
					} else {
						
						var div = document.getElementById("loadercontainer");
						div.parentNode.removeChild(div);				
						
						document.getElementById("content").innerHTML = 
							'<h2 id="headline">Sorry</h2>\
							<div id="data">None of the declared data layer names were found.</br>You can declare custom data layer names in the options area.</div>\
							<div id="version">'+version+'</div>';
					}
				}
			});
		//} catch(err) {}
	});	
};