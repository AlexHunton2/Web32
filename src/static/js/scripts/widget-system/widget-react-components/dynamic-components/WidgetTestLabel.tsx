import * as React from "react";
import * as Structs from "../../widget-structures/widget-structure";

interface WidgetTestLabelProps {
	structure : Structs.WidgetStructure;
	updateDynamicComponents;
	getDynamicComponents;
}

interface WidgetTestLabelState {}

class WidgetTestLabel extends React.Component<WidgetTestLabelProps,WidgetTestLabelState> {
	constructor(props) {
		super(props);
		//props.structure.updatePair("text_value", "Hello!!");
	}

	render() {
		return ( <h1>{this.props.structure.getPair("text_value")}</h1>)
	}
} 

export default WidgetTestLabel;