import * as React from "react";
import * as Structs from "../../widget-structures/widget-structure";

interface WidgetTestFormProps {
	structure : Structs.WidgetStructure;
	updateDynamicComponents;
	getDynamicComponents;
}

interface WidgetTestFormState {
	value : string;
}


class WidgetTestForm extends React.Component<WidgetTestFormProps, WidgetTestFormState> {
	constructor(props) {
		super(props);
		this.state = {value : ''}


		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({value : event.target.value})
	}

	handleSubmit(event) {
		const comps : Array<Structs.WidgetStructure> = this.props.getDynamicComponents();
		const new_comps = new Array<Structs.WidgetStructure>();

		comps.forEach(comp => {
			if (comp.getPair("type") == "TestLabel") {
				comp.updatePair("text_value", this.state.value);
			}
			new_comps.push(comp);
		});

		this.props.updateDynamicComponents(new_comps);
		event.preventDefault();
	}

	render() {
		return ( <div> 
				<form onSubmit={this.handleSubmit}>
				  <label>Update Value:<br />
				  	<input type="text" id="fname" name="fname" value={this.state.value} onChange={this.handleChange} /><br />
				  </label>
				  <input type="submit" value="Submit" />	
				</form>
			</div>)
	}
} 

export default WidgetTestForm;