import ChatsAPI from '../api/chats-api';
import { usersIdData, newChatData, usersChatData, сhatData } from '../api/chats-api';
import UserData from '../api/auth-api';
import { store } from '../store/index';
import { setChats, setError } from '../store/chats';
import { setMessages } from '../store/messages';
import websocketConnection from '../api/websocket';

class ChatsController {
	private api: ChatsAPI;

	constructor() {
	    this.api = new ChatsAPI();
	}

	async create(data: newChatData): Promise<UserData | void> {
		try {
			const newChat = await this.api.create(data);
			return newChat;
		} catch(e) {
			store.dispatch(setError(e as { reason: string }));
		}
	}

	async deleteChat(data: сhatData): Promise<UserData | void> {
		try {
			const response = await this.api.deleteChat(data);
		} catch(e) {
			store.dispatch(setError(e as { reason: string }));
		}
	}

	async add(data: usersChatData): Promise<UserData | void> {
		try {
			const response = await this.api.addUsers(data);
			return response;
		} catch(e) {
			store.dispatch(setError(e as { reason: string }));
		}
	}

	async delete(data: usersChatData) {
	    try {
	      	const response = await this.api.deleteUsers(data);
	      	return response;
	    } catch (e) {
	      	store.dispatch(setError(e as { reason: string }));
	    }
	}

	async chats(params: any): Promise<UserData | void> {
	    try {
	      	const chats = await this.api.chats(params);
	      	store.dispatch(setChats(chats));
	      	return chats;
	    } catch (e) {
	    	console.log('e', e);
	    }
	}

	async token(chatId: string, userId: string): Promise<UserData | void> {
	    try {
	      	const tokenResponse = await this.api.token(chatId);
			const socket = websocketConnection(userId, chatId, tokenResponse.token);
			socket.onopen = async () => {
				socket.send(JSON.stringify({
					content: '0',
					type: 'get old',
				}));			
			};

			socket.onmessage = function(event: any){
				const data = JSON.parse(event.data);
				if(data.type !== 'user connected'){
					store.dispatch(setMessages(data));
				}
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
			webSocket.onmessage = function(event: any){
				if(Array.isArray(JSON.parse(event.data))) {
					store.dispatch(setMessages(JSON.parse(event.data)));
				}
			}
	    } catch (e) {
	    	console.log('e', e);
	    }
	}
}

export default new ChatsController();
