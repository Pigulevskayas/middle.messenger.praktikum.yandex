import Block from '../../modules/block';
const compileTemplate  = require('./chat-messages.pug');

export default class ChatMessages extends Block {
  constructor(props: any) {
    super('div', props);
  }

  render():DocumentFragment {
    let oldMessages:Array<string | any> = [];
    let key: string;
    for (key in this.props.oldMessages.messages) {
      oldMessages.push(this.props.oldMessages.messages[key]);
    }

    oldMessages = oldMessages.reverse();

    return compileTemplate({
      userId: this.props.userId,
      message: oldMessages
    });
  }
}