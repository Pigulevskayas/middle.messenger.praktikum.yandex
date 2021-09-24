import EventBus from './event-bus.ts';
import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import compileTemplate from './new-message.pug';
import Input from '../../components/input/index.ts';
import SendButton from '../../components/send-button/index.ts';

export default class NewMessage extends Block {
  constructor(props: object) {
    super("div", {content: props});
  }

  render(): DocumentFragment {

    const input = new Input({
      classname: this.props.content.inputMessage.classname,
      attributes: this.props.content.inputMessage.attributes,
      events: this.props.content.inputEvent
    });

    const button = new SendButton({
      events: this.props.content.buttonEvent
    });

    const fragment = compile(compileTemplate, {
      input: input,
      button: button
    });

    return fragment;
  }
}