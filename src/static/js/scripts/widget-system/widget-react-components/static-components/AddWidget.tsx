import * as React from "react";
import * as Structs from "../../widget-structures/widget-structure";
import { availableWidgets } from "../dynamic-components/registry";
import { AlertQueue } from "./Alerts";
import WidgetHTTP from "../../../api-utility/widget-http";

interface AddWidgetProps {
	updateDynamicComponents;
	getDynamicComponents;
	refresh;
	refreshWithRequest;
}

interface AddWidgetState {}

class AddWidget extends React.Component<AddWidgetProps,AddWidgetState> {
	constructor(props) {
		super(props);

		this.handleAdd = this.handleAdd.bind(this);
	}

	handleAdd(e) {
		const type = (document.getElementById("createType") as HTMLSelectElement).value;
		const route = (document.getElementById("createRoute") as HTMLInputElement).value;
		const label = (document.getElementById("createLabel") as HTMLInputElement).value;

		if (!type || type.length === 0 || !route || route.length === 0) {
			AlertQueue.queueAlert("DANGER", "Failed to create Widget. Empty Fields");
			this.props.refresh();
			return;
		}

		var widget_http = new WidgetHTTP();
		var response = widget_http.createWidget(type, route, label);

		var self = this;
		response.then(response => {
			if (response.status <= 300) {
				self.props.refreshWithRequest();
			} else {
				AlertQueue.queueAlert("DANGER", "Failed to create Widget. Status Code: " + response.status + " " + response.statusText);
			}
		});

		e.preventDefault();
	}

	render() {
		return ( 
			<div>
				<div className="modal fade" id="AddWidgetModal" role="dialog" aria-labelledby="AddWidgetLabel" aria-hidden="true">
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h5 className="modal-title" id="AddWidgetLabel">Add New Widget</h5>
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div className="modal-body">
				        <div>
				        	<div className="form-group">
					        	<label>Type</label>
					        	<select id="createType" className="form-control">
					        		{availableWidgets.map((widget_name) => {
					        			return(
					        					<option key={Math.floor(Math.random() * 200) + 1}>{widget_name}</option>
					        				)
					        			})
					        		}
								</select>
				        	</div>
							<div className="form-group">
							    <label>Route</label>
							    <input type="text" className="form-control" id="createRoute" aria-describedby="emailHelp" placeholder="Enter Route" />
							</div>
							  <div className="form-group">
							    <label>Label</label>
							    <input type="text" className="form-control" id="createLabel" placeholder="Enter Label" />
							  </div>
							</div>
				      </div>
				      <div className="modal-footer">
				        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
				        <button type="button" className="btn btn-success" onClick={this.handleAdd} data-dismiss="modal">Create Widget</button>
				      </div>
				    </div>
				  </div>
				</div>
				<div className="card border-0">
					<div className="card-body">	
						<button type="button" className="btn btn-success btn-circle btn-xl" data-toggle="modal" data-target="#AddWidgetModal">
							<svg xmlns="http://www.w3.org/2000/svg" width="7rem" height="7rem" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
							  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
							</svg>
						</button>	 
					</div>
				</div>
			</div>
		)
	}
} 

export default AddWidget;