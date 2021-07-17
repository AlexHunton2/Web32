import * as React from "react";
class WidgetTestSelfLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '', text_value: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        const comps = this.props.getDynamicComponents();
        const new_comps = new Array();
        this.setState({ text_value: this.state.value });
        event.preventDefault();
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("h1", null, this.state.text_value),
                React.createElement("label", null,
                    "Update Value:",
                    React.createElement("br", null),
                    React.createElement("input", { type: "text", id: "fname", name: "fname", value: this.state.value, onChange: this.handleChange }),
                    React.createElement("br", null)),
                React.createElement("input", { type: "submit", value: "Submit" }))));
    }
}
export default WidgetTestSelfLabel;
//# sourceMappingURL=WidgetTestSelfLabel.js.map