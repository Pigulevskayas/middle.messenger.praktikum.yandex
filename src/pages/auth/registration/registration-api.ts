// import HTTPTransport from '../../../modules/fetch';
import BaseAPI from '../../../api/base-api';

// const host = 'https://ya-praktikum.tech';

const regAPIInstance = new HTTPTransport();

interface RegData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    password: string;
}

export default class RegAPI extends BaseAPI {
	create(data: RegData) {
		var result;
        return regAPIInstance.post('/auth/signup',{ 
        	headers: {
        		'content-type': 'application/json',
        		'credentials': 'include',
  				'mode': 'cors',
        	},
        	data: data
        }).then(res: any => {
        	result = res; 
        	console.log('final result', result); 
        	return result;
        });
    }
}