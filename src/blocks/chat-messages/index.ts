import Block from '../../modules/block.ts';
import Message from '../../components/message/index.ts';
import compileTemplate from './chat-messages.pug';
import compile from '../../modules/compile.ts';

interface MessageInt {
  text: string,
  time: string
}

export default class ChatMessages extends Block {

  constructor(props: object) {
	// dom-element button wrapper creation
    super("div", props);
  }

  render():string {
    console.log('555', this.props)
    let oldMessages = [];
    for (let key: string in this.props.oldMessages.messages) {
      oldMessages.push(this.props.oldMessages.messages[key]);
    }

    oldMessages = oldMessages.reverse();

    return compileTemplate({
      userId: this.props.userId,
      message: oldMessages
    });
  }
}