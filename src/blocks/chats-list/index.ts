import EventBus from './event-bus.ts';
import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
// import Input from '../../components/input/index.ts';
// import Button from '../../components/button/index.ts';
import compileTemplate from './chats-list.pug';

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
		super("div", props);
	}

	render(): DocumentFragment {
		return compile(compileTemplate, {
			selectedChat: this.props.selectedChat,
			userLink: this.props.userLink,
			userChats: this.props.userChats.chats ? this.props.userChats.chats : [],
		});
	}
}
