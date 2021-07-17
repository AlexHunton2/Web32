import * as React from "react";
import * as Structs from "../../widget-structures/widget-structure";

interface WidgetTestSelfLabelProps {
	structure : Structs.WidgetStructure;
	updateDynamicComponents;
	getDynamicComponents;
}

interface WidgetTestSelfLabelState {
	value : string;
	text_value : string;
}


class WidgetTestSelfLabel extends React.Component<WidgetTestSelfLabelProps, WidgetTestSelfLabelState> {
	constructor(props) {
		super(props);
		this.state = {value : '', text_value : ''}


		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({value : event.target.value})
	}

	handleSubmit(event) {
		const comps : Array<Structs.WidgetStructure> = this.props.getDynamicComponents();
		const new_comps = new Array<Structs.WidgetStructure>();

		this.setState({text_value : this.state.value})

		event.preventDefault();
	}

	render() {
		return ( <div> 
				<form onSubmit={this.handleSubmit}>
				<h1>{this.state.text_value}</h1>
				<label>Update Value:<br />
					<input type="text" id="fname" name="fname" value={this.state.value} onChange={this.handleChange} /><br />
				</label>
				<input type="submit" value="Submit" />	
				</form>
			</div>)
	}
} 

export default WidgetTestSelfLabel;