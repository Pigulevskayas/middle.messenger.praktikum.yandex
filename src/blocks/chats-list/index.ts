import Block from '../../modules/block';
import compile from '../../modules/compile';

const compileTemplate = require('./chats-list.pug');

// interface ButtonInt {
// 	text: string,
// 	events: () => void
// }

// interface InputInt {
// 	type: string,
// 	name: string,
// 	label: string
// }

export default class ChatsList extends Block {
  constructor(props: object) {
    super('div', props);
  }

  render(): DocumentFragment {
    return compile(compileTemplate, {
      selectedChat: this.props.selectedChat,
      userLink: this.props.userLink,
      userChats: this.props.userChats.chats ? this.props.userChats.chats : [],
    });
  }
}
