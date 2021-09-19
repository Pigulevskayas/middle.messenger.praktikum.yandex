import EventBus from './event-bus.ts';
import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import compileTemplate from './input-message.pug';

// const pug = require('pug');

export default class InputMessage extends Block {
  constructor(props: object) {
	// dom-element button wrapper creation
    super("div", props);
  }

  render(): DocumentFragment {
    return compile(compileTemplate, {
      type: this.props.type,
      name: this.props.name,
      label: this.props.label,
      value: this.props.value,
      readonly: this.props.readonly,
      input: () => this.props.events.input()
    });
  }
}

