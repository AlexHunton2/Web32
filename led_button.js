import * as React from "react";
const e = React.createElement;
const OnOffButtons = [
    {
        name: 'On',
        value: '1'
    },
    {
        name: 'Off',
        value: '0'
    }
];
export class LEDButton extends React.Component {
    constructor(props) {
        super(props);
    }
    _renderOnOffButtons() {
        return (React.createElement("div", null, OnOffButtons.map(function (button, indx) {
            return e('button', { onClick: () => transmit("switch", button.value) }, button.name);
        })));
    }
    render() {
        return this._renderOnOffButtons();
    }
}
//# sourceMappingURL=led_button.js.map