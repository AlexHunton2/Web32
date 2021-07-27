import * as React from "react";
import { Suspense } from "react";
import * as ReactDOM from "react-dom";
import ErrorBoundary from "./static-components/ErrorBoundary";
import AddWidget from "./static-components/AddWidget"
import Alerts from "./static-components/Alerts";

//Subsystems
import * as Structs from "../widget-structures/widget-structure";

interface WidgetSystemProps {}

interface WidgetSystemState {
	DynamicWidgetComponents : Array<Structs.WidgetStructure>; 
}

export class WidgetSystem extends React.Component<WidgetSystemProps, WidgetSystemState> {
	constructor(props : WidgetSystemProps) {
		super(props);

		var widgetstruct : Array<Structs.WidgetStructure> = [];

		var widgets = Structs.requestWidgets();
		var self = this;
		widgets.then(widgets => {
			widgets.forEach(function(widget) {
				widgetstruct.push(widget);
			})
	
			self.refresh();
		})

		this.state = {
			DynamicWidgetComponents : widgetstruct
		}

		this.handleSettingsClick = this.handleSettingsClick.bind(this);
		this.getDynamicComponents = this.getDynamicComponents.bind(this);
		this.updateDynamicComponents = this.updateDynamicComponents.bind(this);
		this.refresh = this.refresh.bind(this);
		this.refreshWithRequest = this.refreshWithRequest.bind(this);
	}

	handleSettingsClick = struct => event => {
		console.log("Settings!");
		console.log(struct.getPair("type"));
		event.preventDefault();
	}


	// Returns the current set of Widgets
	getDynamicComponents() : Array<Structs.WidgetStructure> {
		return this.state.DynamicWidgetComponents;
	}

	// Any component has access to this POWERFUL function:
	// Upon calling this function, will redraw entire Widget System
	// the redraw will use the array of the new widgets
	// Best Practice: use getDynamicComponents and update that array.
	// WARNING: Using this will cause ALL components to lose their state.
	updateDynamicComponents(widgetstruct : Array<Structs.WidgetStructure>) {
		this.setState((state) =>({
			DynamicWidgetComponents : widgetstruct
		}));
	}

	// So this a goober function. It will basically just ask the server for the Widgets. Should center the app when it goes wack
	refreshWithRequest() {
		var widgetstruct : Array<Structs.WidgetStructure> = [];

		var widgets = Structs.requestWidgets();
		var self = this;
		widgets.then(widgets => {
			widgets.forEach(function(widget) {
				widgetstruct.push(widget);
			})
	
			self.updateDynamicComponents(widgetstruct);
		})
	}

	refresh() {
		this.updateDynamicComponents(this.getDynamicComponents());
	}	

	render() { 
		return (
			<div className="widget-system">
				<Alerts />
				<div className="card-deck justify-content-center">
					<Suspense fallback="">
						<ErrorBoundary>
							{this.state.DynamicWidgetComponents.map((struct) => {
								const DynamicComponent = React.lazy(() => import('./dynamic-components/Widget'+struct.getPair("type")));
								return (
									<div key={struct.getPair("dbID")}>
										<div className="card border-light mb-5">
											<div className="card-title text-right">
												<button className="btn" onClick={this.handleSettingsClick(struct)}>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
													  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"></path>
													  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"></path>
													</svg>
												</button>
											</div>
											<div className="card-body">	
												<DynamicComponent structure={struct} updateDynamicComponents={this.updateDynamicComponents} getDynamicComponents={this.getDynamicComponents} />
											</div>
											<div className="card-footer text-center">
												<h5>{struct.getPair("label")}</h5>
											</div>
										</div>
									</div>
								);
							})}
							<AddWidget updateDynamicComponents={this.updateDynamicComponents} getDynamicComponents={this.getDynamicComponents} refresh={this.refresh} refreshWithRequest={this.refreshWithRequest}/>
						</ErrorBoundary>
				    </Suspense>
				</div>
			</div>
		)
	}
}


