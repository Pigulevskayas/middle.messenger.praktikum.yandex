import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import NavButton from '../../components/nav-btn/index.ts';
import Search from '../../components/search/index.ts';
import ChatItem from '../../components/chat-item/index.ts';
import ChatHeader from '../../components/chat-header/index.ts';
import ChatMessages from '../../blocks/chat-messages/index.ts';
import NewMessage from '../../components/new-message/index.ts';
import compileTemplate from './chat.pug';
import validate from '../../modules/validate.ts';
import collectData from '../../modules/collect-data.ts';

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

		// console.log('inputEvent', content.inputEvent)

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
  focus: function(e){
    сhatState[e.target.name] = e.target.value;
    validate(e.target.value, fieldName);
  },
  blur: function(e){
    сhatState[e.target.name] = e.target.value;
    validate(e.target.value, fieldName);
  },
  click: () => {
  	collectData(сhatState);
  	for (let key: string in сhatState) {
			validate(сhatState[key], key);
		}
  	
  } 
 
}

export default new Chat(chatConfig);



