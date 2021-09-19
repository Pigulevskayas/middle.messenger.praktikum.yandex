import EventBus from './event-bus.ts';
import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import compileTemplate from './send-button.pug';

// const pug = require('pug');

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

