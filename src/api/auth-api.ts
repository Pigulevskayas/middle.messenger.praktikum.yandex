import BaseAPI from './base-api.ts';

export interface LoginData {
    login: string; 
    password: string;
}

export interface RegData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    password: string;
}

export type UserData = Omit<RegData, 'password'> & { avatar: string; display_name: string }

export default class AuthAPI extends BaseAPI {
	constructor(){
		super('/auth')
	}

	login(data: LoginData): Promise<void> {
		return this.http.post('/signin', { 
        	headers: {
        		'content-type': 'application/json',
        		'credentials': 'include',
  				'mode': 'cors',
        	},
        	data: data
        })
	}

	registration(data: RegData): Promise<void> {
		return this.http.post('/signup', { 
        	headers: {
        		'content-type': 'application/json',
        		'credentials': 'include',
  				'mode': 'cors',
        	},
        	data: data
        })
	}

	logout(): Promise<void> {
		return this.http.post('/logout');
	}

	read(): Promise<UserData> {
		return this.http.get('/user');
	}

	delete: undefined;
	create: undefined;
	update: undefined;
}
