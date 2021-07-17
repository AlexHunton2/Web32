import * as React from "react";
import * as Structs from "../../widget-structures/widget-structure";
import { LEDButton } from "../../../led_button"

interface WidgetOnOffProps {
	structure : Structs.WidgetStructure;
	updateDynamicComponents;
	getDynamicComponents;
}

interface WidgetOnOffState {}

class WidgetOnOff extends React.Component<WidgetOnOffProps,WidgetOnOffState> {
	constructor(props) {
		super(props);
	}

	render() {
		return ( <LEDButton /> )
	}
} 

export default WidgetOnOff;