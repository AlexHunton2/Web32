import * as React from "react";
import * as ReactDOM from "react-dom";
import { render } from "react-dom";
import { WidgetTest } from "./widget"
import { LEDButton } from "./led_button"


class App extends React.Component<{}, {}> {
    render() {
        var testing = new WidgetTest();
        testing.render("test!");

        return (
            <div className="app">  
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
