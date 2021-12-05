import Block from '../../modules/block';
import compile from '../../modules/compile';
const compileTemplate  = require('./new-message.pug');
import Input from '../../components/input/index';
import SendButton from '../../components/send-button/index';

export default class NewMessage extends Block {
  constructor(props: object) {
    super("div", {content: props});
  }

  render(): DocumentFragment {
    const input = new Input({
      classname: this.props.content.inputMessage.classname,
      attrubutes: this.props.content.inputMessage.attrubutes,
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