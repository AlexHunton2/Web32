import * as React from "react";

/*
	When the home webpage loads the client will request to the server a json
	with the information from a user_entity object associated with the 
	current session and the logged in user. This user_entity object json
	will contain information on the widget_aggretator object associated 
	with the user_entity. The widget_aggretator has all the information
	on what widgets have been created by the user and the properties they
	have, ie the type that they are, their label name, and more. 

	The user_entity object mentioned above will have information on the
	user including what URL the widgets will either be sending or
	recieving GET/POST requests from. As such, once the webpage loads, not
	only will the widgets load, but also a marker on whether a signal
	is being recieved to the URL associated with the arduino. 
*/


export interface Widget {
	renderBackground(); //Renders the typical backgrond for the widget
	renderFeature(); // Renders the features of the widget (Ex: On Off Switch)
	renderLabel(); // Renders the user given label
}

export class WidgetAggretator implements Widget { // Singleton
	private widgetComposition: Widget[];
	private static instance: WidgetAggretator;

	private constructor() {
		// TODO: Code that steps up the aggreator by sending a request to
		// the server from all the user information. Populate the 
		// widgetComposition
		this.widgetComposition = [];

		var one = new WidgetOnOff();
		var two = new WidgetOnOff();

		this.addWidget(one);
		this.addWidget(two);
	}

	public static getInstance() {
		if (!WidgetAggretator.instance) {
			WidgetAggretator.instance = new WidgetAggretator();
		}

		return WidgetAggretator.instance;
	}

	public getWidget(index: number) : Widget { // Get widget from index
		return this.widgetComposition[index];
	}

	public isIncluded(widget: Widget) : boolean {
		return this.widgetComposition.includes(widget);
	}

	public indexOf(widget: Widget) : number {
		return this.widgetComposition.indexOf(widget);
	}

	public addWidget(widget: Widget) : number {
		// TODO: Code that sends information to the server about an update.

		if (!this.isIncluded(widget)) {
			this.widgetComposition.push(widget);
		} else {
			throw new Error("WidgetAggretator Error: widget already included in aggretator");
		}
		return this.getLength();
	}

	public removeWidget(index:number) {
		// TODO: Code that sends information to the server about an update

		if (this.isIncluded(this.getWidget(index))) {
			if (index > -1) {
				this.widgetComposition.splice(index, 1);
			} else {
				throw new Error()
			}
		} else {
			throw new Error("WidgetAggretator Error: widget already included in aggretator");
		}
	}

	public updateWidget(widget : Widget) {
		// TODO: This will accept a widget along with key and value pairs on
		// it's various updated properties and it's updated states that will
		// then be bundled in a request to the server to update
	}

	public getLength() : number {
		return this.widgetComposition.length;
	}

	public getUserID() {}

	public renderBackground() {
		var widgetRender: any[] = [];
		for (let widget of this.widgetComposition) {
			widgetRender.push(widget.renderBackground());
		}
		return widgetRender;
	}

	public renderFeature() {
		for (let widget of this.widgetComposition) {
			widget.renderFeature();
		}
	}

	public renderLabel() {
		for (let widget of this.widgetComposition) {
			widget.renderLabel();
		}
	}
}

abstract class WidgetObject implements Widget { // All "actual" widgets will derive from this
	public renderBackground() {}

	public renderFeature() {}

	public renderLabel() {}
}

abstract class WidgetHandler { // All widgets that interact with widget will derive from this


}

class WidgetOnOff extends WidgetObject {
	public renderBackground() {
		return (
			<p>Hello</p>
		)
	}
}
