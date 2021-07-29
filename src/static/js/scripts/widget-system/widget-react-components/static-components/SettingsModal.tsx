import * as React from "react";
import * as Structs from "../../widget-structures/widget-structure";
import { AlertQueue } from "./Alerts";
import WidgetHTTP from "../../../api-utility/widget-http";

interface SettingsModalProps {
	struct : Structs.WidgetStructure;
	refreshWithRequest;
}

interface SettingsModalState {
	label : string
	route : string
}

class SettingsModal extends React.Component<SettingsModalProps,SettingsModalState> {
	constructor(props) {
		super(props);

		this.state = {
			label : this.props.struct.getPair('label'),
			route : this.props.struct.getPair('route')
		};

		this.handleWidgetDelete = this.handleWidgetDelete.bind(this);
		this.handleSettingsSave = this.handleSettingsSave.bind(this);
		this.refreshInputs = this.refreshInputs.bind(this);
	}

	componentDidMount() {
		this.refreshInputs();
	}

	refreshInputs() {
		var struct = this.props.struct;
		const route = (document.getElementById("SettingsRoute_" + struct.getPair('dbID')) as HTMLInputElement);
		const label = (document.getElementById("SettingsLabel_" + struct.getPair('dbID')) as HTMLInputElement);

		label.value = this.props.struct.getPair('label');
		route.value = this.props.struct.getPair('route');

		this.setState({
			label : this.props.struct.getPair('label'),
			route : this.props.struct.getPair('route')
		})
	}

	handleSettingsSave = event => {
		var struct = this.props.struct;
		const route = (document.getElementById("SettingsRoute_" + struct.getPair('dbID')) as HTMLInputElement).value;
		const label = (document.getElementById("SettingsLabel_" + struct.getPair('dbID')) as HTMLInputElement).value;
			
		var widget_http = new WidgetHTTP();
		var response = widget_http.updateWidgetDefaults(struct.getPair('dbID'), route, label);

		var self = this;
		response.then(response => {
			if (response.status <= 300) {
				AlertQueue.queueAlert("SUCCESS", "Successfully updated widget!");
			} else {
				AlertQueue.queueAlert("DANGER", "Failed to update widget. Status Code: " + response.status + " " + response.statusText);
				this.refreshInputs();
			}
			self.props.refreshWithRequest();
		});

		event.preventDefault();
	}

	handleSettingsClose = event => {
		this.refreshInputs();

		event.preventDefault();
	}

	handleWidgetDelete = event => {
		var struct = this.props.struct;
		var widget_http = new WidgetHTTP();
		var response = widget_http.deleteWidget(struct.getPair('dbID'));

		var self = this;
		response.then(response => {
			if (response.status <= 300) {
				AlertQueue.queueAlert("SUCCESS", "Successfully deleted widget!");
			} else {
				AlertQueue.queueAlert("DANGER", "Failed to delete widget. Status Code: " + response.status + " " + response.statusText);
			}
			self.props.refreshWithRequest();
		});

		event.preventDefault();
	}

	render() {
		var struct = this.props.struct;
		return ( 
			<div className="modal fade" id={"SettingsModal_" + struct.getPair('dbID')} role="dialog" aria-labelledby={"SettingsLabel_" + struct.getPair('dbID')} aria-hidden="true">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id={"SettingsLabel_" + struct.getPair('dbID')}>Widget Settings</h5>
			        <button type="button" className="close" onClick={this.handleSettingsClose} data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			    </div>
			     <div className="modal-body">
			        <div>
			        	<div className="form-group">
						    <label>Type</label>
						    <input type="text" placeholder={struct.getPair('type')} className="form-control" id={"SettingsType_" + struct.getPair('dbID')} readOnly />
						</div>
						<div className="form-group">
						    <label>Route</label>
						    <input type="text" defaultValue={this.state.route} className="form-control" id={"SettingsRoute_" + struct.getPair('dbID')} />
						</div>
						  <div className="form-group">
						    <label>Label</label>
						    <input type="text" defaultValue={this.state.label} className="form-control" id={"SettingssLabel_" + struct.getPair('dbID')} placeholder="Enter Label" />
						  </div>
					</div>
				</div>
				<div className="modal-footer">
			     	<button type="button" className="btn btn-danger mr-auto" onClick={this.handleWidgetDelete}data-dismiss="modal">Delete</button>
			        <button type="button" className="btn btn-secondary" onClick={this.handleSettingsClose} data-dismiss="modal">Close</button>
			        <button type="button" className="btn btn-primary" onClick={this.handleSettingsSave} data-dismiss="modal">Save Changes</button>
			      </div>
			    </div>
			  </div>
			</div>
			
		)
	}
} 

export default SettingsModal;