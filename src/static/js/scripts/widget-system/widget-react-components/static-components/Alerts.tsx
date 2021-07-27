import * as React from "react";
import * as Structs from "../../widget-structures/widget-structure";

enum AlertType {
	DANGER = "DANGER", PRIMARY = "PRIMARY", SUCCESS = "SUCCESS", WARNING = "WARNING"
}


class Alert {
	public type : AlertType;
	public message : string;

	constructor(t : AlertType, m : string) {
		this.type = t;
		this.message = m;
	} 

	render() {
		switch(this.type) {
			case AlertType.DANGER: {
				return this.renderDanger();
				break;
			}
			case AlertType.PRIMARY: {
				return this.renderPrimary();
				break;
			}
			case AlertType.SUCCESS: {
				return this.renderSuccess();
				break;
			}
			case AlertType.WARNING: {
				return this.renderWarning();
				break;
			}
			default: {
				return this.renderDanger();
				break;
			}

		}
	}

	renderDanger() {
		return(
			<div className="alert alert-danger shadow" role="alert" style={{borderLeft: "5px solid #721C24", borderRadius: "0px"}}>
				<button type="button" className="close" data-dismiss="alert" aria-label="Close">
				    <span aria-hidden="true" style={{color: "#721C24"}}>&times;</span>
				</button>
				<div className="row">
					<svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="m-1 bi bi-exclamation-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					  <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
					</svg>
				  	<p style={{fontSize:"18px"}} className="mb-0 font-weight-light"><b className="mr-1">Danger!</b>{this.message}</p>
				</div>
			</div>
		);
	}

	renderPrimary() {
		return(
			<div className="alert alert-primary shadow" role="alert" style={{borderLeft:"#155724 5px solid", borderRadius: "0px"}}>
				<button type="button" className="close" data-dismiss="alert" aria-label="Close">
				    <span aria-hidden="true" style={{color:"#155724"}}>&times;</span>
				</button>
				<div className="row">
					<svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="m-1 bi bi-bell-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
					</svg>
				  	<p style={{fontSize:"18px"}} className="mb-0 font-weight-light"><b className="mr-1">Alert:</b>{this.message}</p>
				</div>
			</div>
		)

	}

	renderSuccess() {
		return(
			<div className="alert alert-success shadow" role="alert" style={{borderLeft:"#155724 5px solid", borderRadius: "0px"}}>
				<button type="button" className="close" data-dismiss="alert" aria-label="Close">
				    <span aria-hidden="true" style={{color:"#155724"}}>&times;</span>
				</button>
				<div className="row">
					<svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="m-1 bi bi-shield-fill-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					  <path fillRule="evenodd" d="M8 .5c-.662 0-1.77.249-2.813.525a61.11 61.11 0 0 0-2.772.815 1.454 1.454 0 0 0-1.003 1.184c-.573 4.197.756 7.307 2.368 9.365a11.192 11.192 0 0 0 2.417 2.3c.371.256.715.451 1.007.586.27.124.558.225.796.225s.527-.101.796-.225c.292-.135.636-.33 1.007-.586a11.191 11.191 0 0 0 2.418-2.3c1.611-2.058 2.94-5.168 2.367-9.365a1.454 1.454 0 0 0-1.003-1.184 61.09 61.09 0 0 0-2.772-.815C9.77.749 8.663.5 8 .5zm2.854 6.354a.5.5 0 0 0-.708-.708L7.5 8.793 6.354 7.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
					</svg>
				  	<p style={{fontSize:"18px"}} className="mb-0 font-weight-light"><b className="mr-1">Success!</b>{this.message}</p>
				</div>
			</div>
		)
	}

	renderWarning() {
		return(
			<div className="alert alert-warning shadow" role="alert" style={{borderLeft:"#856404 5px solid",  borderRadius: "0px"}}>
				<button type="button" className="close" data-dismiss="alert" aria-label="Close">
				    <span aria-hidden="true" style={{color:"#856404"}}>&times;</span>
				</button>
				<div className="row">
					<svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="m-1 bi bi-cone-striped" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					  <path d="M9.97 4.88l.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z"/>
					</svg>
				  	<p style={{fontSize:"18px"}} className="mb-0 font-weight-light"><b className="mr-1">Warning:</b>{this.message}</p>
				</div>
			</div>
		)
	}
}

export class AlertQueue {
	public static alerts: Alert[] = [];
	public static renderedAlerts: number = 0;

	public static queueAlert(t : string, m : string) {
		var alert = new Alert(AlertType[t], m);
		AlertQueue.alerts.push(alert);
	}

	public static runAlert() : JSX.Element {
		var key = AlertQueue.renderedAlerts;
		var a = AlertQueue.alerts.pop() || new Alert(AlertType.DANGER, "Failure to load Alert");
		return (
			<div  id={"alert: " + key} key={key}>
				{a.render()}
			</div>
		); 	
	}
}


interface AlertsProps {}

interface AlertsState {}

class Alerts extends React.Component<AlertsProps,AlertsState> {
	constructor(props) {
		super(props);
	}

	render() {
		var alerts : JSX.Element[] = []

		while (AlertQueue.alerts.length > 0) {
			alerts.push(AlertQueue.runAlert());
			AlertQueue.renderedAlerts++;	
		}

		return (
			<div className="container">
				{alerts}
			</div>
		)
	}
} 

export default Alerts;
