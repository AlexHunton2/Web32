import * as React from "react";
import * as ReactDOM from "react-dom";
import { render } from "react-dom";
import { LEDButton } from "./led_button"
import { WidgetAggretator, Widget } from "./widget";


class App extends React.Component<{}, {}> {
    render() {
        var aggretator = WidgetAggretator.getInstance();

        return (
            <div className="app">  
                {aggretator.renderBackground()}        
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
