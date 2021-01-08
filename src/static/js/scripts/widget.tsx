import * as React from "react";

interface Widget {
	render (message : string);
}

export class WidgetTest implements Widget {
	constructor() { }

	render(message: string) {
		console.log(message);
	}
}