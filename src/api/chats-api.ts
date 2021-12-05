import BaseAPI from './base-api';
import UserData from './auth-api';

export interface newChatData {
	title: string;
}

export interface usersChatData {
    users: Array<number>;
    chatId: number;
}

export interface сhatData {
    chatId: number;
}

export default class ChatsAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    create(data: newChatData): Promise<void> {
        return this.http.post('', {
            headers: {
                mode: 'cors',
            },
            data,
        });
    }

    deleteChat(data: сhatData): Promise<void> {
        return this.http.delete('', {
            headers: {
                mode: 'cors',
            },
            data,
        });
    }

    addUsers(data: usersChatData): Promise<void> {
        return this.http.put('/users', {
            headers: {
                mode: 'cors',
            },
            data,
        });
    }

    deleteUsers(data: usersChatData): Promise<void> {
        return this.http.delete('/users', {
            headers: {
                mode: 'cors',
            },
            data,
        });
    }

    chats(params: any): Promise<UserData> {
        return this.http.get('', params);
    }

    token(chatId: number): Promise<void> {
        return this.http.post(`/token/${chatId}`, {
            headers: {
                mode: 'cors',
            },
        });
    }
}
