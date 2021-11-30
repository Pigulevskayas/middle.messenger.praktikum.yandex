import BaseAPI from './base-api';
import UserData from './auth-api';

export interface ProfileData {
	first_name: string;
  	second_name: string;
  	display_name: string;
  	login: string;
  	email: string;
  	phone: string;
}

export interface PasswordData {
	oldPassword: string;
	newPassword: string;
}

export interface SearchData {
  	login: string;
}

export default class ProfileAPI extends BaseAPI {
	constructor(){
		super('/user')
	}

	profile(data: ProfileData): Promise<void> {
		return this.http.put('/profile', { 
        	headers: {
  				'mode': 'cors',
        	},
        	data: data
        });
	}

	read(): Promise<UserData> {
		return this.http.get('');
	}

	password(data: PasswordData): Promise<void> {
		return this.http.put('/password', { 
        	headers: {
  				'mode': 'cors',
        	},
        	data: data
        });
	} 

	avatar(data: FormData) {
		return this.http.put('/profile/avatar', { 
        	headers: {
        		'content-type': 'multipart/form-data',
  				'mode': 'cors',
        	},
        	data: data
        });
	} 

	search(data: SearchData) {
		return this.http.post('/search', { 
        	headers: {
  				'mode': 'cors',
        	},
        	data: data
        });
	}

	// delete: undefined;
	// create: undefined;
	// update: undefined;
	// request: undefined;
}
