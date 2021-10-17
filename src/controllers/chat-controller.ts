import ChatsAPI from '../api/chats-api.ts';
import { usersIdData, newChatData, usersChatData, сhatData } from '../api/chats-api.ts';
import { store } from '../store/index.ts';
import { setChats, deleteUser, setError } from '../store/chats.ts';
import { setMessages } from '../store/messages.ts';
import websocketConnection from '../api/websocket.ts';

class ChatsController {
	private api: ChatsAPI;

	constructor() {
	    this.api = new ChatsAPI();
	}

	async create(data: newChatData): Promise<UserData | void> {
		try {
			const newChat = await this.api.create(JSON.stringify(data));
			// store.dispatch(setChats(newChat));
			// console.log('newChat', newChat)
			return newChat;
		} catch(e) {
			console.log(e);
			store.dispatch(setError(e as { reason: string }));
		}
	}

	async deleteChat(data: сhatData): Promise<UserData | void> {
		try {
			const response = await this.api.deleteChat(JSON.stringify(data));
		} catch(e) {
			console.log(e);
			store.dispatch(setError(e as { reason: string }));
		}
	}

	async add(data: usersChatData): Promise<UserData | void> {
		try {
			const response = await this.api.addUsers(JSON.stringify(data));
			return response;
		} catch(e) {
			console.log(e);
			store.dispatch(setError(e as { reason: string }));
		}
	}

	async delete(data: usersChatData) {
	    try {
	      	const response = await this.api.deleteUsers(JSON.stringify(data));
	      	return response;
	    } catch (e) {
	    	console.log(e)
	      	store.dispatch(setError(e as { reason: string }));
	      	// console.log(store.getState())
	    }
	}

	async chats(params: usersIdData): Promise<UserData | void> {
	    try {
	      	const chats = await this.api.chats(params);
	      	store.dispatch(setChats(chats));
			// console.log('chats', chats)
	      	return chats;
	    } catch (e) {
	    	console.log('e', e)
	      // store.dispatch(deleteUser());
	    }
	}

	async token(chatId: string, userId: string): Promise<UserData | void> {
	    try {
	      	const tokenResponse = await this.api.token(chatId);
	      	// store.dispatch(setChats(chats));
			// console.log('token', tokenResponse.token)
			const socket = websocketConnection(userId, chatId, tokenResponse.token);
			socket.onopen = async (event) => {
				socket.send(JSON.stringify({
					content: '0',
					type: 'get old',
				}));			
			};

			socket.onmessage = function(event){
				store.dispatch(setMessages(JSON.parse(event.data)));
			}

	      	return socket;
	    } catch (e) {
	    	console.log('e', e);
	    }
	}

	async send(webSocket: object, message: string): Promise<UserData | void> {
	    try {
	      	await webSocket.send(JSON.stringify({
    			content: message,
    			type: 'message',
    		}));
    		await webSocket.send(JSON.stringify({
				content: '0',
				type: 'get old',
			}));
			socket.onmessage = function(event){
				if(JSON.parse(event.data).isArray()) {
					store.dispatch(setMessages(JSON.parse(event.data)));
				}
			}
	    } catch (e) {
	    	console.log('e', e);
	    }
	}
}

export default new ChatsController();
