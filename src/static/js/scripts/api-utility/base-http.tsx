// Stolen from: https://www.geeksforgeeks.org/simple-get-and-post-request-using-fetch-api-method-by-making-custom-http-library/?ref=rp

class BaseHTTP {
	protected url : string;

	constructor(u?: string) {
		this.url = u || window.location.host;
	}

	// Make an HTTP GET Request 
    protected async get(url: string) {
        const response = await fetch(url, {
        	method: 'GET',
        	headers : {
        		'Accept': 'application/json'
        	}
        });
  
        const resData = await response.json();
        return resData;
    }
  
    // Make an HTTP POST Request
    protected async post(data, url?: string) {
    	url = url || this.url;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
  
        const resData = await response;
        return resData;
    }

    // Make an HTTP PUT Request
    protected async delete(url: string) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers : {
                'Accept': 'application/json'
            }
        });
  
        const resData = await response;
        return resData;
    }

    // Make an HTTP PUT Request
    protected async put(data, url?: string) {
    	url = url || this.url;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
  
        const resData = await response
        return resData;
    }
}

export default BaseHTTP;