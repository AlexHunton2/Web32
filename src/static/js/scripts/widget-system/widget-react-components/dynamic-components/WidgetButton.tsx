import * as React from "react";
import { Button, Spinner } from 'react-bootstrap';
import * as Structs from "../../widget-structures/widget-structure";

interface WidgetButtonProps {
	structure : Structs.WidgetStructure;
	updateDynamicComponents;
	getDynamicComponents;
}

interface WidgetButtonState {
	isProcessing : boolean;
}

class WidgetButton extends React.Component<WidgetButtonProps,WidgetButtonState> {
	constructor(props) {
		super(props);

		this.state = {
			isProcessing : false
		}

		this.handlePress = this.handlePress.bind(this);
	}

	handlePress = event => {
		this.setState({
			isProcessing : true
		})

		new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
			this.setState({
				isProcessing : false
			})
		})

		event.preventDefault();
	}

	render() {
		let buttonValue = this.state.isProcessing ? 
		<Spinner
		      as="span"
		      animation="border"
		      size="lg"
		      role="status"
		      aria-hidden="true"
		/> : <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" className="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
			  <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
			</svg>;
		return ( 
			<div className="text-center">
				<Button variant="info" size='lg' disabled={this.state.isProcessing} onClick={!this.state.isProcessing ? this.handlePress : null}>
					{buttonValue}
				</Button>
			</div> 
		)
	}
} 

export default WidgetButton;