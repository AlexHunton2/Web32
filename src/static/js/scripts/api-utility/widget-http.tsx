import BaseHTTP from "../api-utility/base-http";

class WidgetHTTP extends BaseHTTP {
	private api_route : string;

	constructor() {
		super();

		//this.api_route = "/api/widgets/"; REPLACE WITH THIS WHEN ON ACTUAL DOMAIN
		this.api_route = "/User-root/AAC/api/";
	}

	createWidget(type : string, route : string, label : string) {
		var url = "http://".concat(this.url, this.api_route, "widgets");
		const data = {'widget_type':type, 'route':route, 'label':label};
		var response = this.post(data, url);
		return response;
	}

	deleteWidget(id : number) {
		var url = "http://".concat(this.url,  this.api_route, "widgets/", String(id));
		var widget = this.delete(url);
		return widget;
	}

	updateWidgetData() {}

	updateWidgetDefaults(id : number, route : string, label : string) {
		var url = "http://".concat(this.url,  this.api_route, "widgets/", String(id));
		const data = {'widget_route':route, 'widget_label':label};
		var response = this.put(data, url)
		return response;
	}

	getAllWidgets() {
		var url = "http://".concat(this.url,  this.api_route, "widgets");
		var widgets = this.get(url);
		return widgets;
	}

	getWidget(id : number) {
		var url = "http://".concat(this.url,  this.api_route, "widgets/", String(id));
		var widget = this.get(url);
		return widget;
	}

	getWidgetData(id : number) {
		var url = "http://".concat(this.url,  this.api_route, "widgets/", String(id), "/*");
		var data = this.get(url);
		return data;
	}
}

export default WidgetHTTP;