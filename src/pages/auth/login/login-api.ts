// import HTTPTransport from '../../../modules/fetch.ts';
import BaseAPI from '../../../api/base-api.ts';
import { store } from '../../../modules/store.ts';

// const host = 'https://ya-praktikum.tech';

const loginAPIInstance = new HTTPTransport();

interface LoginData {
    login: string; 
    password: string;
}

export default class RegAPI extends BaseAPI {
    create(data: LoginData) {
        console.log('data', data)
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
        }).catch(e => {
            console.log('e', store);
            // store;
        });

    }

}