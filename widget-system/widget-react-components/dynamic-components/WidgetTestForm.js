import * as React from "react";
class WidgetTestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        const comps = this.props.getDynamicComponents();
        const new_comps = new Array();
        comps.forEach(comp => {
            if (comp.getPair("type") == "TestLabel") {
                comp.updatePair("text_value", this.state.value);
            }
            new_comps.push(comp);
        });
        this.props.updateDynamicComponents(new_comps);
        event.preventDefault();
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("label", null,
                    "Update Value:",
                    React.createElement("br", null),
                    React.createElement("input", { type: "text", id: "fname", name: "fname", value: this.state.value, onChange: this.handleChange }),
                    React.createElement("br", null)),
                React.createElement("input", { type: "submit", value: "Submit" }))));
    }
}
export default WidgetTestForm;
//# sourceMappingURL=WidgetTestForm.js.map