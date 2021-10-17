import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import NavButton from '../../components/nav-btn/index.ts';
import Modal from '../../blocks/modal-user/index.ts';
import Input from '../../components/input/index.ts';
import Search from '../../components/search/index.ts';
import Chatslist from '../../blocks/chats-list/index.ts';
import ChatHeader from '../../components/chat-header/index.ts';
import Link from '../../components/link/index.ts';
import DropdownLink from '../../components/dropdown-link/index.ts';
import ChatMessages from '../../blocks/chat-messages/index.ts';
import NewMessage from '../../components/new-message/index.ts';
import compileTemplate from './chat.pug';
import inputHandler from '../../utils/form-inputs-handler.ts';
import buttonHandler from '../../utils/form-submit-handler.ts';

import '../../pages/chat/chat.css';
import '../../components/chat-item/chat-item.css';
import '../../components/search/search.css';
import '../../components/form-field/form-field.css';

import ProfileController from '../../controllers/profile-controller.ts';
import ChatsController from '../../controllers/chat-controller.ts';


interface NavButtonInt {
  type: string;
  link: string;
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

interface messageValueInt {
  message: null | string;
}

interface searchValueInt {
	login: null | string;
}


const messageValue: messageValueInt = {
  message: null
}

const searchValue: searchValueInt = {
  login: null
}

// let chatsResponses = {
// 	userChats: [],
// 	searchResult: null
// };

const newChatData = {
	title: null
}

let chatData = {
	users: [],
  chatId: null
}

let webSocket;
let userId;

let selectedChat = {
	id: null,
	title: null
};


export default class Chat extends Block {
	constructor(props) {
	  super('div', props);
	}

	protected getStateFromProps() {
    this.state = {
    	chat_visible: false,
    	modal_add: false,
    	modal_delete: false,
    	modal_add_chat: false,
    	onCreate: async (data) => {
    		const response = await ChatsController.create(data);
    		try {
    			if(response) {
    				this.state.onGetChats({
						  user: this.props.user.id
						});
    				chatData.chatId = response.id;
    				this.state.modal_add_chat = false;
    				this.showChat(data.title);
    			}
    		} catch(e) {
    			console.log(e)
    		}
    	},
    	onDelete: async (data)	=> { 
    		const response = await ChatsController.deleteChat(data);
    		try {
					this.state.onGetChats({
					  user: this.props.user.id
					});
					this.hideChat();
    		} catch(e) {
    			console.log(e);
    		}
    	},
    	onToken: async (chatId, userId) => {
    		if(webSocket) {
    			webSocket.close(1000, "работа закончена");
    			webSocket = undefined;
    		}
    		const socket = await ChatsController.token(chatId, userId);
    		try {
	    		if(socket) {
						webSocket = socket;
	    		}
	    	} catch(e) {
    			console.log(e)
    		}
    	},
    	onSend: async (message: string) => {
    		await ChatsController.send(webSocket, message)
    	},
    	onGetChats: async (data) => {
    		const chats = await ChatsController.chats(data);
    		// try {
    		// 	if (chats) {
    		// 		chatsResponses.userChats = chats;
    		// 	}
    		// }
    	},
    	onSearch: async () => {
    		if(searchValue.login.length > 0){
					const result = await ProfileController.search(searchValue);
					// if (result) {
					// 	chatsResponses.searchResult = result;
					// }
    		}
      },
      onGetUserId: async (login) => {
      	const result = await ProfileController.searchUserId({login: login});
      	// console.log('onGetUserId',result)
      	try {
      		chatData.users.push(result);
      		// console.log('chatData',chatData)
      	} catch(e) {
      		console.log(e)
      	}
      },
     	onAddUser: async () => {
     		const response = await ChatsController.add(chatData);
     		try{
     			this.state.modal_add = false;
    			chatData.chatId = null;
     			chatData.users = [];
     		} catch(e) {
     			console.log(e)
     		}
     	},
     	onDeleteUser: async () => {
     		const response = await ChatsController.delete(chatData);
     		try{
     			const modal = document.querySelector('.modal.modal_show');
    			modal.classList.remove('modal_show');
    			chatData.chatId = null;
     			chatData.users = [];
     		} catch(e) {
     			console.log(e)
     		}
     	}
    }
  }

  newChatOnSearch = (target)	=> {
  	const chatTitle = document.querySelector('.chat__header-name');
    chatTitle.textContent = target.textContent;

  	const emptyContent = document.querySelector('.chat_empty');
    emptyContent.classList.add('chat_hide');

    const chatContent = document.querySelector('.chat__content');
    chatContent.classList.remove('chat_hide');

    this.state.onCreate({
    	title: target.textContent
    });
  }

  newChat = (title)	=>	{
  	const emptyContent = document.querySelector('.chat_empty');
    emptyContent.classList.add('chat_hide');

    const chatContent = document.querySelector('.chat__content');
    chatContent.classList.remove('chat_hide');

    this.state.onCreate(newChatData);
  }

  newChatData = (val)	=>	{
  	newChatData.title = val;
  }

  usersInChat = (val)	=> {
  	if(val.length > 0) {
  		this.state.onGetUserId(val);
  	} else {
  		alert('заполните поле');
  	}
  }

  openChat = (target) => {
  	let chatId;
  	if(target.classList.contains('chat-item')) {
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

  showModal = (type)	=> {
  	this.state[type] = true;
  }

  showChat = (title)	=> {
  	this.state.chat_visible = true;
  	const titleBlock = document.querySelector('.chat__header-name');
    titleBlock.textContent = title;
  }

  hideChat = ()	=> {
  	this.state.chat_visible = false;
  }

  componentDidMount() {
  	userId = this.props.user.id;
  	const data = {
  		user: this.props.user.id
  	}

  	if (this.props.user) {
  		this.state.onGetChats(data);
  	}
  }

  // componentDidUpdate() {
  //   // console.log('componentDidUpdate', this.props)
  //   // if (this.props.user.length) {
  //   //   chatsResponses.searchResult = this.props.user;
  //   // }

  //   return true;
  // }

	render(): DocumentFragment {		
		const config: chatConfigInt = {
			inputMessage: {
				classname: 'chat__input',
				attributes: {
					type: 'text',
					name: 'message',
					label: 'Сообщение',
					value: messageValue.message
				}
			},
		  input: function(e){
		    messageValue[e.target.name] = e.target.value;
		  },
		  focus: (e) => inputHandler(e.target, messageValue),
		  blur: (e) => inputHandler(e.target, messageValue),
		  click: () => {
		  	buttonHandler(messageValue);
		  	this.state.onSend(messageValue.message);
		  }
		}


		const content = {
			inputMessage: config.inputMessage,
			buttonEvent: {
				click: config.click
			},
			inputEvent: {
				input: config.input,
				blur: config.blur,
				focus: config.focus
			}
		}

		const search = new Search({
			classname: 'search__input',
			attributes: {
				label: 'Поиск',
				type: 'text',
				name: 'login'
			},
			events: {
				input: (e) => searchValue.login = e.target.value,
				change: (e) => this.state.onSearch()
			}
		});

		const edit: NavButtonInt = new NavButton({
			type: 'edit-chat', 
			to: '/settings',
			events: {
        click: (e) => {
          e.preventDefault();
          window.location = e.target.getAttribute('to')
        },
      }
		});

		const addChat: NavButtonInt = new NavButton({
			type: 'add-chat', 
			// to: '/settings',
			events: {
        click: (e) => {
          e.preventDefault();
          const modalAdd = document.getElementById('add-chat');
	        modalAdd.classList.add('modal_show');
        },
      }
		});

		const userLink = this.props.user[0] ? new Link({
			text: this.props.user[0]['display_name'] ? 
				`${this.props.user[0]['display_name']}` :
				`${this.props.user[0]['first_name']} ${this.props.user[0]['second_name']}` ,
      to: this.props.user[0]['id'],
      events: {
      	click: (e) => {
      		e.preventDefault();
					const modalAdd = document.getElementById('add-chat');
		      modalAdd.classList.add('modal_show');
      		// this.newChatOnSearch(e.target);
      	}
      }
		}) : null;

		const chatsList = new Chatslist({
			userChats: this.props.chats,
			selectedChat: selectedChat.id,
			events: {
      	click: (e) => { 
      		this.openChat(e.target);
      		// this.showChat();
      	}
			}
		});

		const addUserLink = new DropdownLink({
			type: 'add',
			text: 'Добавить пользователя',
			events: {
				click: (e) => {
	        e.preventDefault();
	        this.showModal('modal_add');
	      }
	    }
		});

		const deleteUserLink = new DropdownLink({
			type: 'delete',
			text: 'Удалить пользователя',
			events: {
				click: (e) => {
	        e.preventDefault();
	        this.showModal('modal_delete');
	      }
	    }
		});	

		const deleteChatLink = new DropdownLink({
			type: 'delete',
			text: 'Удалить чат',
			events: {
				click: (e) => {
	        e.preventDefault();
	        const chatId = document.querySelector('.chat-item_active').getAttribute('chat-id');
	        this.state.onDelete({
	        	chatId: chatId
	        });
	      }
	    }
		});

		const modalDelete: ModalInt = new Modal({
			isVisible: this.state.modal_delete,
			id: "delete-user",
			modalTitle: "Удалить пользователя",
			btnText: "Удалить",
			isVisible: this.state.modal_delete, 
			isError: false,
			inputName: "login",
			inputLabel: "Логин",
			inputEvent: this.usersInChat,
			buttonEvent: this.state.onDeleteUser
		});

		const modalAdd: ModalInt = new Modal({
			isVisible: this.state.modal_add,
			id: "add-user",
			modalTitle: "Добавить пользователя",
			btnText: "Добавить",
			isVisible: this.state.modal_add, 
			isError: false ,
			inputName: "login",
			inputLabel: "Логин",
			inputEvent: this.usersInChat,
			buttonEvent: this.state.onAddUser
		});

		const modalAddChat: ModalInt = new Modal({
			isVisible: this.state.modal_add_chat,
			id: "add-chat",
			modalTitle: "Новый чат",
			btnText: "Создать",
			isVisible: this.state.modal_add_chat, 
			isError: false,
			inputName: "title",
			inputLabel: "Название чата",
			inputEvent: this.newChatData,
			buttonEvent: this.newChat
		});

		const chat_header: ChatHeaderInt = new ChatHeader({
			username: selectedChat.title,
			toggler: edit,
			addUserLink: addUserLink,
			deleteUserLink: deleteUserLink,
			deleteChatLink: deleteChatLink,
		});

		const chat_messages = new ChatMessages({
			oldMessages: this.props.messages, 
			userId: userId
		});

		const new_message = new NewMessage(content);

		const fragment = compile(compileTemplate, {
			chatVisible: this.state.chat_visible,
			modalAddChat: modalAddChat,
			modalDelete: modalDelete,
			modalAdd: modalAdd,
			addChat: addChat,
			edit: edit,
			search: search,
			userLink: userLink,
			chat_list: chatsList,
			chat_header: chat_header,
			chat_messages: chat_messages,
			new_message: new_message,
			// messages: this.props.messages.messages ? true : false
		});

		return fragment;
	}
}
