import * as React from "react";
import * as ReactDOM from "react-dom";
import { render } from "react-dom";

const e = React.createElement;

const OnOffButtons = [
	{
		name : 'On',
		value : '1'
	},
	{
		name : 'Off',
		value : '0'
	}
]


export class LEDButton extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderOnOffButtons() {
      return (
        <div>
          {
            OnOffButtons.map(function(button, indx) {
              return e(
                'button',
                { onClick: () => transmit("switch", button.value) },
                button.name,
              )
            })
          }
        </div>
      );
  }

  render() {
  	return this._renderOnOffButtons();
  }
}