// import HTTPTransport from '../../../modules/fetch';
import BaseAPI from '../../../api/base-api';
// import { store } from '../../../modules/store';

// const host = 'https://ya-praktikum.tech';

const loginAPIInstance = new HTTPTransport();

interface LoginData {
    login: string; 
    password: string;
}

export default class RegAPI extends BaseAPI {
    create(data: LoginData) {
		var result;
        return loginAPIInstance.post('/auth/signin',{ 
        	headers: {
        		'content-type': 'application/json',
        		'credentials': 'include',
  				'mode': 'cors',
        	},
        	data: data
        }).then(res => {
        	result = res; 
        	console.log('final result', result); 
        	// return result;
        }).catch(() => {
            // store;
        });

    }

}