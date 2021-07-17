import * as React from "react";
import { render } from "react-dom";
import { LEDButton } from "./led_button";
import { WidgetSystem } from "./widget-system/widget-react-components/WidgetSystem";
class App extends React.Component {
    render() {
        return (React.createElement("div", { className: "app" },
            React.createElement(WidgetSystem, null)));
    }
}
render(React.createElement(App, null), document.getElementById("content"));
render(React.createElement(LEDButton, null), document.getElementById("led_button_container"));
//# sourceMappingURL=app.js.map