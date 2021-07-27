import * as React from "react";
import * as ReactDOM from "react-dom";
import { render } from "react-dom";
import { LEDButton } from "./led_button"
import { WidgetSystem } from "./widget-system/widget-react-components/WidgetSystem";

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div className="app">  
            	<WidgetSystem />
            </div> 
        )
    }
}

render(
    <App />, document.getElementById("content")
);

render(
    <LEDButton />, document.getElementById("led_button_container")
);
