import Block from '../../modules/block';
import compile from '../../modules/compile';
import Input from '../input/index';
import SendButton from '../send-button/index';

const compileTemplate = require('./new-message.pug');

export default class NewMessage extends Block {
  constructor(props: object) {
        super('div', { content: props });
    }

    render(): DocumentFragment {
        const input = new Input({
              classname: this.props.content.inputMessage.classname,
              attrubutes: this.props.content.inputMessage.attrubutes,
              events: this.props.content.inputEvent,
        });

        const button = new SendButton({
            events: this.props.content.buttonEvent,
        });

        const fragment = compile(compileTemplate, {
            input,
            button,
        });

        return fragment;
    }
}
