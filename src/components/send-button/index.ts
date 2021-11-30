import Block from '../../modules/block';
import compile from '../../modules/compile';
const compileTemplate  = require('./send-button.pug');

export default class SendButton extends Block {
  constructor(props: object) {
	// dom-element button wrapper creation
    super("div", props);
  }

  render(): DocumentFragment {
  	return compile(compileTemplate, {
      click: () => this.props.events.click()
    });
  }
}

