import Block from '../../modules/block';
// import Message from '../../components/message/index';
const compileTemplate  = require('./chat-messages.pug');
// import compile from '../../modules/compile';

export default class ChatMessages extends Block {

  constructor(props: object) {
	// dom-element button wrapper creation
    super('div', props);
  }

  render():string {
    let oldMessages = [];
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