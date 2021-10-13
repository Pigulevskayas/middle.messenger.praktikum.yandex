// import HTTPTransport from '../../../modules/fetch.ts';
import BaseAPI from '../../../api/base-api.ts';

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
        	// {
        	// 	first_name: "Рикардо",
        	// 	second_name: "Фокача",
        	// 	login: "r.fokacha",
        	// 	email: "r.fokacha@rdr2.com",
        	// 	phone: "+71234567892",
        	// 	password: "p@ssw0rd",
        	// }
        }).then(res => {
        	result = res; 
        	console.log('final result', result); 
        	return result;
        });

    }

}