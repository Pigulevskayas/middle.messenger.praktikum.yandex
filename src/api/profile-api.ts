import BaseAPI from './base-api.ts';

export interface ProfileData {
	first_name: string,
  	second_name: string,
  	display_name: string,
  	login: string,
  	email: string,
  	phone: string
}

export interface PasswordData {
	oldPassword: string,
	newPassword: string
}

export interface SearchData {
  	login: string
}

export default class ProfileAPI extends BaseAPI {
	constructor(){
		super('/user')
	}

	profile(data: ProfileData): Promise<void> {
		return this.http.put('/profile', { 
        	headers: {
        		// 'content-type': 'application/json',
        		// 'credentials': 'include',
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
        		// 'content-type': 'application/json',
        		// 'credentials': 'include',
  				'mode': 'cors',
        	},
        	data: data
        });
	} 

	avatar(data) {
		return this.http.put('/profile/avatar', { 
        	headers: {
        		// 'credentials': 'include',
  				'mode': 'cors',
        	},
        	data: data
        });
	} 

	search(data: SearchData) {
		return this.http.post('/search', { 
        	headers: {
        		// 'content-type': 'application/json',
        		// 'credentials': 'include',
  				'mode': 'cors',
        	},
        	data: data
        });
	}

	// profile(): Promise<UserData> {
	// 	return this.http.get('/profile');
	// }

	delete: undefined;
	create: undefined;
	update: undefined;
}