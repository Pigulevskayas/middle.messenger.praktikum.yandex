const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT', 
  DELETE: 'DELETE'
};

const URL = 'https://ya-praktikum.tech/api/v2'

/**
	* Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
	* На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
	* На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
*/
function queryStringify(data: object):string {
	// Можно делать трансформацию GET-параметров в отдельной функции
  let transformed = '?';
  let i = 1;
  for (key in data){
    if(Array.isArray(data[key])){
      transformed = i < Object.keys(data).length ? `${transformed}${key}=${data[key].join(',')}&` : `${transformed}${key}=${data[key].join(',')}`;
    } else {
      transformed = i < Object.keys(data).length ? `${transformed}${key}=${data[key]}&` : `${transformed}${key}=${data[key]}`;
    }
    i++;
  }

  return transformed;
}

export default class HTTPTransport {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${URL}${endpoint}`;
  }

	get = (path: string, options: object = {}) => {
    let strdata = queryStringify(options.data);

		let newUrl = `${path}${strdata}`;
		return this.request(`${this.endpoint}${newUrl}`, {...options, method: METHODS.GET }, options.timeout);
	};

	// PUT, POST, DELETE
  post = (path: string, options: object = {}) => {	 
		return this.request(`${this.endpoint}${path}`, {...options, method: METHODS.POST}, options.timeout);
	};

  put = (path: string, options: object = {}) => {	 
		return this.request(`${this.endpoint}${path}`, {...options, method: METHODS.PUT}, options.timeout);
	};

  delete = (path: string, options: object = {}) => {	 
		return this.request(`${this.endpoint}${path}`, {...options, method: METHODS.DELETE}, options.timeout);
	};

	// options:
	// headers — obj
	// data — obj
	request = (url: string, options: object, timeout: number = 5000) => {
    const {method, data, headers} = options;
    // console.log('fetch data', data)
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(options.method, url);
      xhr.responseType = 'json';
      xhr.withCredentials = true

      if(headers) {
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        // console.log('data', data)
        xhr.send(JSON.stringify(data));
      }

      xhr.onload = function() {
        if (xhr.status != 200) {
          // console.log(xhr.response);
          reject(xhr.response)
        } else {
          // console.log(xhr.response);
          resolve(xhr.response);
        }
      };

      xhr.onerror = function() {
        console.log("Запрос не удался");
      };

      xhr.onabort = function() {
        console.log("Запрос прерван");
      };
    });

  };
}


