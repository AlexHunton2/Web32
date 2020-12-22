'use strict';

const e = React.createElement;

const OnOffButtons = {
	1: {
		name : 'On',
		value : '1'
	},
	2: {
		name : 'Off',
		value : '0'
	}
}


class LEDButton extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderOnOffButtons() {
  	return Object.entries(OnOffButtons).map(([key, value], i) => {
  		return e(
  			'button',
  			{ onClick: () => transmit("switch", value.value) },
  			value.name,
  		)
  	})

  }

  render() {
  	return this._renderOnOffButtons();
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LEDButton), domContainer);