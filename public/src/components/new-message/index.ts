import EventBus from './event-bus.ts';
import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import compileTemplate from './new-message.pug';
import InputMessage from '../../components/input-message/index.ts';
import SendButton from '../../components/send-button/index.ts';

// const pug = require('pug');

export default class NewMessage extends Block {
  constructor(props: object) {
    super("div", {content: props});
  }

  render(): DocumentFragment {

    const input = new InputMessage({
      type: this.props.content.inputMessage.type,
      name: this.props.content.inputMessage.name,
      label: this.props.content.inputMessage.label,
      value: this.props.content.inputMessage.value,
      events: this.props.content.inputEvent
    });
    // console.log('input', this.props.content.inputEvent)
    const button = new SendButton({
      events: this.props.content.buttonEvent
    });

    const fragment = compile(compileTemplate, {
      input: input,
      button: button
    });

    return fragment;
  	// return compileTemplate();
  }
}