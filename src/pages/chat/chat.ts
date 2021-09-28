import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import NavButton from '../../components/nav-btn/index.ts';
import Search from '../../components/search/index.ts';
import ChatItem from '../../components/chat-item/index.ts';
import ChatHeader from '../../components/chat-header/index.ts';
import ChatMessages from '../../blocks/chat-messages/index.ts';
import NewMessage from '../../components/new-message/index.ts';
import compileTemplate from './chat.pug';
import inputHandler from '../../utils/form-inputs-handler.ts';
import buttonHandler from '../../utils/form-submit-handler.ts';

import '../../pages/chat/chat.css';
import '../../components/chat-item/chat-item.css';
import '../../components/search/search.css';
import '../../components/form-field/form-field.css';

interface NavButtonInt {
  type: string;
  link: string;
}

interface ChatItemInt {
	username: string,
	quote: string,
	time: string,
	count: number
}

interface ChatHeaderInt {
	username: string
}

interface chatConfigInt {
	inputMessage: Object<string>;
	input: () => void;
  onfocus: () => void;
  onblur: () => void;
  click: () => void;
}

interface сhatStateInt {
  message: null | string;
}

class Chat extends Block {
	constructor(props) {
	  super('div', {config: props});
	}

	render(): DocumentFragment {
		const content = {
			inputMessage: this.props.config.inputMessage,
			buttonEvent: {
				click: this.props.config.click
			},
			inputEvent: {
				input: this.props.config.input,
				blur: this.props.config.blur,
				focus: this.props.config.focus
			}
		}

		const search = new Search();

		const edit: NavButtonInt = new NavButton({
			type: 'edit-chat', 
			link: '/profile'
		});

		const chat_item: ChatItemInt = new ChatItem({
				username: 'Вася',
		    quote: 'Друзья, у меня для вас особенный выпуск новостей!...',
		    time: '15:12',
		    count: 2
		});

		const chat_header: ChatHeaderInt = new ChatHeader({
			username: 'Вася'
		});

		const chat_messages = new ChatMessages();

		const new_message = new NewMessage(content);

		const fragment = compile(compileTemplate,{
			edit: edit.render(),
			search: search.render(),
			chat_item: chat_item.render(),
			chat_header: chat_header.render(),
			chat_messages: chat_messages.render(),
			new_message: new_message
		});

		return fragment;
	}
}

const сhatState: сhatStateInt = {
  message: null
}

const chatConfig: chatConfigInt = {
	inputMessage: {
		classname: 'chat__input',
		attributes: {
			type: 'text',
			name: 'message',
			label: 'Сообщение',
			value: сhatState.message
		}
	},
  input: function(e){
    сhatState[e.target.name] = e.target.value;
  },
  focus: (e) => inputHandler(e.target, сhatState),
  blur: (e) => inputHandler(e.target, сhatState),
  click: () => buttonHandler(сhatState)
 
}

export default new Chat(chatConfig);



