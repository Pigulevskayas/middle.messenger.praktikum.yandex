import Block from '../../modules/block';
import compile from '../../modules/compile';
import NavButton from '../../components/nav-btn/index';
import Modal from '../../blocks/modal-user/index';
import Search from '../../components/search/index';
import Chatslist from '../../blocks/chats-list/index';
import ChatHeader from '../../components/chat-header/index';
import Link from '../../components/link/index';
import DropdownLink from '../../components/dropdown-link/index';
import ChatMessages from '../../blocks/chat-messages/index';
import NewMessage from '../../components/new-message/index';
import inputHandler from '../../utils/form-inputs-handler';
import buttonHandler from '../../utils/form-submit-handler';

import './chat.css';
import '../../components/chat-item/chat-item.css';
import '../../components/search/search.css';
import '../../components/form-field/form-field.css';

import ProfileController from '../../controllers/profile-controller';
import ChatsController from '../../controllers/chat-controller';

const compileTemplate = require('./chat.pug');

// interface NavButtonInt {
//   type: string;
//   link: string;
// }

// interface ChatHeaderInt {
// 	username: string
// }

// interface chatConfigInt {
// 	inputMessage: {
// 		classname: string;
// 		attributes: {
// 			type: string;
// 			name: string;
// 			label: string;
// 			value: null | messageValue.message
// 		};
// 	};
// 	input: () => void;
//   onfocus: () => void;
//   onblur: () => void;
//   click: () => void;
// }

// interface messageValueInt {
//   message: null | string;
// }

// interface searchValueInt {
// 	login: null | string;
// }

const messageValue: messageValueInt = {
message: null,
};

const searchValue: string | null = {
login: null,
};

// let chatsResponses = {
// 	userChats: [],
// 	searchResult: null
// };

const newChatData = {
title: null,
};

const chatData = {
users: [],
chatId: null,
};

let webSocket: any;
let userId: string;

const selectedChat = {
id: null,
title: null,
};

export class Chat extends Block {
constructor(props) {
	super('div', props);
}

protected getStateFromProps() {
	this.state = {
		chat_visible: false,
		onCreate: async (data: any) => {
			const response = await ChatsController.create(data);
			try {
				if (response) {
					this.state.onGetChats({
						user: this.props.user.id,
					});
					chatData.chatId = response.id;
					const modal = document.querySelector('.modal.modal_show');
					modal!.classList.remove('modal_show');
					this.showChat(data.title);
				}
			} catch (e) {
				console.log(e);
			}
		},
		onDelete: async (data: number)	=> {
			const response = await ChatsController.deleteChat(data);
			try {
				this.state.onGetChats({
					user: this.props.user.id,
				});
				this.hideChat();
			} catch (e) {
				console.log(e);
			}
		},
		onToken: async (chatId: number, userId: number) => {
			if (webSocket) {
				webSocket.close(1000, 'работа закончена');
				webSocket = undefined;
			}
			const socket = await ChatsController.token(chatId, userId);
			try {
				if (socket) {
					webSocket = socket;
				}
			} catch (e) {
				console.log(e);
			}
		},
		onSend: async (message: string) => {
			await ChatsController.send(webSocket, message);
		},
		onGetChats: async (data: { [key: string]: number; }) => {
			const chats = await ChatsController.chats(data);
		},
		onSearch: async () => {
			if (searchValue.login.length > 0) {
				const result = await ProfileController.search(searchValue);
			}
		},
		onGetUserId: async (login: string) => {
			const result = await ProfileController.searchUserId({ login });
			try {
				chatData.users.push(result);
			} catch (e) {
				console.log(e);
			}
		},
		onAddUser: async () => {
			const response = await ChatsController.add(chatData);
			try {
				const modal = document.querySelector('.modal.modal_show');
				modal!.classList.remove('modal_show');
				chatData.chatId = null;
				chatData.users = [];
			} catch (e) {
				console.log(e);
			}
		},
		onDeleteUser: async () => {
			const response = await ChatsController.delete(chatData);
			try {
				const modal = document.querySelector('.modal.modal_show');
				modal!.classList.remove('modal_show');
				chatData.chatId = null;
				chatData.users = [];
			} catch (e) {
				console.log(e);
			}
		},
	};
}

newChatOnSearch = (target)	=> {
	const chatTitle = document.querySelector('.chat__header-name');
	chatTitle!.textContent = target.textContent;

	const emptyContent = document.querySelector('.chat_empty');
	emptyContent!.classList.add('chat_hide');

	const chatContent = document.querySelector('.chat__content');
	chatContent!.classList.remove('chat_hide');

	this.state.onCreate({
		title: target.textContent,
	});
}

newChat = (title: string)	=>	{
	const emptyContent = document.querySelector('.chat_empty');
	emptyContent!.classList.add('chat_hide');

	const chatContent = document.querySelector('.chat__content');
	chatContent!.classList.remove('chat_hide');

	this.state.onCreate(newChatData);
}

newChatData = (val)	=>	{
	newChatData.title = val;
}

usersInChat = (val)	=> {
	if (val.length > 0) {
		this.state.onGetUserId(val);
	} else {
		alert('заполните поле');
	}
}

openChat = (target) => {
	let chatId;
	if (target.classList.contains('chat-item')) {
		chatId = target.getAttribute('chat-id');
	} else {
		chatId = target.closest('.chat-item').getAttribute('chat-id');
	}
	chatData.chatId = chatId;

	const chatTitle = document.querySelector(`.chat-item[chat-id="${chatId}"] .chat-item__name`).textContent;

	selectedChat.id = chatId;
	selectedChat.title = chatTitle;

	this.showChat(chatTitle);
	this.state.onToken(chatId, this.props.user.id);
}

showModal = (type: string)	=> {
	const modal = document.getElementById(type);
	modal!.classList.add('modal_show');
}

showChat = (title: string)	=> {
	this.state.chat_visible = true;
	const titleBlock = document.querySelector('.chat__header-name');
	titleBlock!.textContent = title;
}

hideChat = ()	=> {
	this.state.chat_visible = false;
}

componentDidMount() {
	userId = this.props.user.id;
	const data = {
		user: this.props.user.id,
	};

	if (this.props.user) {
		this.state.onGetChats(data);
	}
}

render(): DocumentFragment {
	const config = {
		inputMessage: {
			classname: 'chat__input',
			attrubutes: {
				type: 'text',
				name: 'message',
				label: 'Сообщение',
				value: messageValue.message,
			},
		},
		input(e: any) {
			messageValue[e.target.name] = e.target.value;
			inputHandler(e.target, messageValue);
		},
		focus: (e: any) => inputHandler(e.target, messageValue),
		blur: (e: any) => inputHandler(e.target, messageValue),
		click: () => {
			buttonHandler(messageValue);
			this.state.onSend(messageValue.message);
			messageValue.message = '';
		},
	};

	const content = {
		inputMessage: config.inputMessage,
		buttonEvent: {
			click: config.click,
		},
		inputEvent: {
			input: config.input,
			blur: config.blur,
			focus: config.focus,
		},
	};

	const search = new Search({
		classname: 'search__input',
		attributes: {
			label: 'Поиск',
			type: 'text',
			name: 'login',
		},
		events: {
			input: (e: any) => searchValue.login = e.target.value,
			change: () => this.state.onSearch(),
    	// blur: () => {
      	//  	buttonHandler(e.target.value);
      	//  }
  		},
	});

	const edit = new NavButton({
		type: 'edit-chat',
		to: '/settings',
		events: {
			click: (e: any) => {
				e.preventDefault();
				window.location = e.target.getAttribute('to');
			},
		},
	});

	const addChat = new NavButton({
		type: 'add-chat',
		// to: '/settings',
		events: {
			click: (e: any) => {
				e.preventDefault();
				this.showModal('add-chat');
    		},
		},
	});

	const userLink = this.props.user[0] ? new Link({
		text: this.props.user[0].display_name
		? `${this.props.user[0].display_name}`
		: `${this.props.user[0].first_name} ${this.props.user[0].second_name}`,
		to: this.props.user[0].id,
		events: {
			click: (e: any) => {
				e.preventDefault();
				const modalAdd: HTMLElement = document.getElementById('add-chat');
				modalAdd!.classList.add('modal_show');
  			},
  		},
	}) : null;

	const chatsList = new Chatslist({
		userChats: this.props.chats,
		selectedChat: selectedChat.id,
		events: {
			click: (e: any) => {
				this.openChat(e.target);
			},
		},
	});

		const addUserLink = new DropdownLink({
			type: 'add',
			text: 'Добавить пользователя',
			events: {
				click: (e: any) => {
					e.preventDefault();
					this.showModal('modal_add');
				},
			},
		});

		const deleteUserLink = new DropdownLink({
			type: 'delete',
			text: 'Удалить пользователя',
			events: {
				click: (e: any) => {
					e.preventDefault();
					this.showModal('modal_delete');
				},
			},
		});

		const deleteChatLink = new DropdownLink({
			type: 'delete',
			text: 'Удалить чат',
			events: {
				click: (e: any) => {
					e.preventDefault();
					const chatId = document.querySelector('.chat-item_active').getAttribute('chat-id');
					this.state.onDelete({
						chatId,
					});
				},
			},
		});

		const modalDelete = new Modal({
			id: 'modal_delete',
			modalTitle: 'Удалить пользователя',
			btnText: 'Удалить',
			isVisible: this.state.modal_delete,
			isError: false,
			inputName: 'login',
			inputLabel: 'Логин',
			inputEvent: this.usersInChat,
			buttonEvent: this.state.onDeleteUser,
		});

		const modalAdd = new Modal({
			id: 'modal_add',
			modalTitle: 'Добавить пользователя',
			btnText: 'Добавить',
			isVisible: this.state.modal_add,
			isError: false,
			inputName: 'login',
			inputLabel: 'Логин',
			inputEvent: this.usersInChat,
			buttonEvent: this.state.onAddUser,
		});

		const modalAddChat = new Modal({
			id: 'add-chat',
			modalTitle: 'Новый чат',
			btnText: 'Создать',
			isVisible: this.state.modal_add_chat,
			isError: false,
			inputName: 'title',
			inputLabel: 'Название чата',
			inputEvent: this.newChatData,
			buttonEvent: this.newChat,
		});

		const chat_header: ChatHeaderInt = new ChatHeader({
			username: selectedChat.title,
			toggler: edit,
			addUserLink,
			deleteUserLink,
			deleteChatLink,
		});

		const chat_messages = new ChatMessages({
			oldMessages: this.props.messages,
			userId,
		});

		const new_message = new NewMessage(content);

		const fragment = compile(compileTemplate, {
			chatVisible: this.state.chat_visible,
			modalAddChat,
			modalDelete,
			modalAdd,
			addChat,
			edit,
			search,
			userLink,
			chat_list: chatsList,
			chat_header,
			chat_messages,
			new_message,
		});

		return fragment;
}
}
