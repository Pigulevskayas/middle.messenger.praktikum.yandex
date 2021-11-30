import BaseAPI from './base-api';

export interface LoginData {
    login: string; 
    password: string;
}

// export interface RegData {
//     first_name: string;
//     second_name: string;
//     login: string;
//     email: string;
//     phone: string;
//     password: string;
// }

export interface UserData {
	first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    password: string;
    avatar: string;
    display_name: string;
}

export type RegData = Omit<UserData, 'avatar' | 'display_name'>

export default class AuthAPI extends BaseAPI {
	constructor(){
		super('/auth')
	}

	login(data: LoginData): Promise<void> {
		return this.http.post('/signin', { 
        	headers: {
  				'mode': 'cors',
        	},
        	data: data
        });
	}

	registration(data: RegData): Promise<void> {
		return this.http.post('/signup', { 
        	headers: {
  				'mode': 'cors',
        	},
        	data: data
        });
	}

	logout(): Promise<void> {
		return this.http.post('/logout');
	}

	read(): Promise<UserData> {
		return this.http.get('/user');
	}

	// delete: undefined;
	// create: undefined;
	// update: undefined;
	// request: undefined;
}
