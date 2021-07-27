import BaseHTTP from "../api-utility/base-http";

class WidgetHTTP extends BaseHTTP {
	constructor() {
		super();
	}

	createWidget(type : string, route : string, label : string) {
		//var url = "http://".concat(this.url, "/api/widgets/"); REPLACE WITH THIS WHEN ON ACTUAL DOMAIN
		var url = "http://".concat(this.url, "/User-root/AAC/api/widgets");
		const data = {'widget_type':type, 'route':route, 'label':label};
		var response = this.post(data, url);
		return response;
	}

	updateWidgetData() {}

	updateWidgetDefaults() {}

	getAllWidgets() {
		//var url = "http://".concat(this.url, "/api/widgets/"); REPLACE WITH THIS WHEN ON ACTUAL DOMAIN
		var url = "http://".concat(this.url, "/User-root/AAC/api/widgets");
		var widgets = this.get(url);
		return widgets;
	}

	getWidget(id : number) {
		//var url = "http://".concat(this.url, "/api/widgets/", String(id)); REPLACE WITH THIS WHEN ON ACTUAL DOMAIN
		var url = "http://".concat(this.url, "/User-root/AAC/api/widgets/", String(id));
		var widget = this.get(url);
		return widget;
	}

	getWidgetData(id : number) {
		//var url = "http://".concat(this.url, "/api/widgets/", String(id), "/*"); REPLACE WITH THIS WHEN ON ACTUAL DOMAIN
		var url = "http://".concat(this.url, "/User-root/AAC/api/widgets/", String(id), "/*");
		var data = this.get(url);
		return data;
	}
}

export default WidgetHTTP;