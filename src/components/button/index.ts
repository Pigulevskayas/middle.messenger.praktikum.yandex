import EventBus from './event-bus.ts';
import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import compileTemplate from './button.pug';

export default class Button extends Block {
  constructor(props: object) {
	// dom-element button wrapper creation
    super("div", props);
  }

  render(): string {
  	return compile(compileTemplate, {
      text: this.props.text,
      click: () => this.props.events.click()
    });
  }
}

