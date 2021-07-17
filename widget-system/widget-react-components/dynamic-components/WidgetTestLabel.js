import * as React from "react";
class WidgetTestLabel extends React.Component {
    constructor(props) {
        super(props);
        //props.structure.updatePair("text_value", "Hello!!");
    }
    render() {
        return (React.createElement("h1", null, this.props.structure.getPair("text_value")));
    }
}
export default WidgetTestLabel;
//# sourceMappingURL=WidgetTestLabel.js.map