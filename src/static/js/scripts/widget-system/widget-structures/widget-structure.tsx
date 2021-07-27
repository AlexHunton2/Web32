/*

6/5/2021

Description: The whole point of this WidgetStructure System is to sit ontop of the existing React Components and act as
the layer liason between the server (database and persistence) and what the user sees. 

*/
import WidgetHTTP from "../../api-utility/widget-http";


export interface WidgetStructure {
	updatePair(key : string, value : any) : void;
	getPair(key : string) : any;
}

/*
This class acts the wrapper for the data that the widget will hold.
It will control the data flow 
*/
class WidgetCustomData {
	private widgetData : {};

	constructor() {
		this.widgetData = {};
	}

	public setPair(key : string, value : any) : void {
		this.widgetData[key] = value;
	}

	public removePair(key : string) : void {
		this.widgetData[key] = null;
	}

	public getPair(key : string) : any {
		return this.widgetData[key];
	}

	public hasPair(key : string) : boolean {
		for (var k in this.widgetData) {
			if (key == k) {
				return true;
			}
		}
		return false;
	}

	private convertJSON() {

	}


}


abstract class WidgetStructureBase implements WidgetStructure {
	private widgetCustomData : WidgetCustomData;

	protected static totalWidgets = 0;
	private static defaultKeys = ["type", "label", "route", "dbID"]; // Default keys
	private static finalKeys = ["dbID", "type"]; // Once itialized, these keys cannot be changed. You gotta delete the widget

	constructor() {
		WidgetStructureBase.totalWidgets++;
		this.setCustomData(new WidgetCustomData());
	}

	private isDefaultKey(key : string) {
		return WidgetStructureBase.defaultKeys.includes(key);
	}

	private isFinalKey(key : string) {
		return WidgetStructureBase.finalKeys.includes(key);
	}

	private setCustomData(data : WidgetCustomData) {
		this.widgetCustomData = data;
	}

	//Used for the first loads into the data. No database updates
	//MUST BE AN DEFAULT KEY
	protected initalPair(key : string, value : any) : void {
		if (this.isDefaultKey(key)) {
			// TODO: Seperate this from existingPair() by adding requirements for the various defaults
			this.widgetCustomData.setPair(key, value);
		} else {
			throw new Error("WidgetStructureBase Error: Not a default key.");
		}
	}

	//Used for when loading the existing pairs
	protected existingPair(key : string, value : any) : void {
		if (!this.isDefaultKey(key)) {
			this.widgetCustomData.setPair(key, value);
		} else {
			throw new Error("WidgetStructureBase Error: Is a default key, use initalPair");
		}
	}

	// Purpose: Real-time communication to database
	// Should be used when a specific widget wants to save a piece of information about itself
	// example: type or route, or ANY piece of data that needs to be saved and cannot be retrived
	// via a request to the route
	public updatePair(key : string, value : string) : void {
		if (!this.isFinalKey(key)) {
			//SENDS REQUEST TO DATABASE FOR AN UPDATE

			this.widgetCustomData.setPair(key, value);
		} else {
			throw new Error("WidgetStructureBase Error: Cannot set a final key");
		}
	}

	public getPair(key : string) : any {
		return this.widgetCustomData.getPair(key);
	}
}


export class NewWidgetStructure extends WidgetStructureBase {
	constructor(type: string, label : string, route : string) {
		super();
		// TODO: Send request to append to the database with the new widget
		this.initalPair("type", type);
		this.initalPair("label", label);
		this.initalPair("route", route);
		this.initalPair("dbID", WidgetStructureBase.totalWidgets);
	}
}


export class ExistingWidgetStructure extends WidgetStructureBase {
	constructor(dbID : number, type: string, label: string, route: string) {
		super();
		this.initalPair("dbID", dbID);
		this.initalPair("type", type);
		this.initalPair("label", label);
		this.initalPair("route", route);
		this.loadData();
	}

	private loadData() {
		var dbID = this.getPair("dbID");

		var widgetHTTP = new WidgetHTTP();
		var self = this;
		widgetHTTP.getWidgetData(dbID).then(data => {
			if (!(data === null)) {
				data.forEach(function (pair) {
					var key : string = pair['widget_key'];
					var value = pair['widget_value'];
					self.existingPair(key, value);
				});
			}
		});
	}
}


// Provides an array of all the existing widgets that the user has
export function requestWidgets() {
	//TODO : Use requestor to ask for all the widgets
	

	var widgetHTTP = new WidgetHTTP();
	var result = widgetHTTP.getAllWidgets().then(widgets => {
		if (!widgets.length) {
			// TODO Add Failure Message
			console.log("Failed to get Widgets");
		}
		var result:ExistingWidgetStructure[] = [];
		widgets.forEach(function (widget) {
			const id = widget['widget_id']; 
			const type = widget['widget_type'];
			const label = widget['label'];
			const route = widget['route'];
			var w = new ExistingWidgetStructure(id, type, label, route);

			result.push(w);
		});
		return result;
	});
	return result;
}