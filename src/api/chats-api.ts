import BaseAPI from './base-api.ts';

export interface newChatData {
	title: string
}

// export interface usersIdData {
// 	user: string
// }

export interface usersChatData {
  users: Array<number>;
  chatId: number;
}

export interface сhatData {
  chatId: number;
}


export default class ChatsAPI extends BaseAPI {
	constructor(){
		super('/chats')
	}

	create(data: newChatData): Promise<void> {
		return this.http.post('', { 
        	headers: {
        		'content-type': 'application/json',
        		'credentials': 'include',
  				'mode': 'cors',
        	},
        	data: data
        });
	}

	deleteChat(data: сhatData): Promise<void> {
		return this.http.delete('', { 
        	headers: {
        		'content-type': 'application/json',
        		'credentials': 'include',
  				'mode': 'cors',
        	},
        	data: data
        });
	}

	addUsers(data: usersChatData): Promise<void> {
		return this.http.put('/users', { 
        	headers: {
        		'content-type': 'application/json',
        		'credentials': 'include',
  				'mode': 'cors',
        	},
        	data: data
        });
	}

	deleteUsers(data: usersChatData): Promise<void> {
		return this.http.delete('/users', { 
        	headers: {
        		'content-type': 'application/json',
        		'credentials': 'include',
  				'mode': 'cors',
        	},
        	data: data
        });
	}

	chats(params): Promise<UserData> {
		return this.http.get('', params);
	}

	token(chatId: number ): Promise<void> {
		console.log('api chat id', chatId)
		return this.http.post(`/token/${chatId}`, { 
        	headers: {
        		'content-type': 'application/json',
        		'credentials': 'include',
  				'mode': 'cors',
        	}
        });
	}


	// delete: undefined;
	create: undefined;
	update: undefined;
}
