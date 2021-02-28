document.addEventListener('sendDataLayerNames', function(e) {

    const names = e.detail.names

    let result = {
        url: document.location.href,
        data: []
    };

    if (names.length != 0) {
        names.forEach((name) => {
            if(window[name] !== undefined) {
                result.data.push([
                    name,
                    JSON.stringify(window[name])
                ]);
            }
        });
    } else {
        result.error = "There are no data layer names defined. You can add names under options.";
    }
    
    document.dispatchEvent(new CustomEvent('sendDataLayerInformation', {detail: result}))
});