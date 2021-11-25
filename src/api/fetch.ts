const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT', 
  DELETE: 'DELETE'
};

const URL = 'https://ya-praktikum.tech/api/v2';

export type RequestOptions = {
  method?: string;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
};

/**
	* Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
	* На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
	* На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
*/
function queryStringify(data: Record<string, any>) {
  const queryKeys = Object.keys(data);
  return queryKeys.reduce((acc, key, index) => `${acc}${key}=${data[key]}${index < queryKeys.length - 1 ? '&' : ''}`, '?');
}

export default class HTTPTransport {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${URL}${endpoint}`;
  }

	get = (path: string, options: RequestOptions = {}) => {
    let strdata = options?.data?.length > 0 ? queryStringify(options.data) : '';
		let newUrl = `${path}${strdata}`;
		return this.request(`${this.endpoint}${newUrl}`, {
      ...options, 
      method: METHODS.GET, 
      headers: { 
        'content-type': 'application/json', 
        'credentials': 'include', 
        ...options?.headers 
      }
    }, options.timeout);
	};

	// PUT, POST, DELETE
  post = (path: string, options: RequestOptions = {}) => {	 
		return this.request(`${this.endpoint}${path}`, {
      ...options, 
      method: METHODS.POST,
      headers: { 
        'content-type': 'application/json', 
        'credentials': 'include', 
        ...options?.headers 
      }
    }, options.timeout);
	};

  put = (path: string, options: RequestOptions = {}) => {	 
		return this.request(`${this.endpoint}${path}`, {
      ...options, 
      method: METHODS.PUT,
      headers: { 
        'content-type': 'application/json', 
        'credentials': 'include',
        ...options?.headers 
      }
    }, options.timeout);
	};

  delete = (path: string, options: RequestOptions = {}) => {	 
		return this.request(`${this.endpoint}${path}`, {
      ...options, 
      method: METHODS.DELETE,
      headers: { 
        'content-type': 'application/json', 
        'credentials': 'include', 
        ...options?.headers 
      }
    }, options.timeout);
	};


	request = (url: string, options: Record<string, any>, timeout: number = 5000) => {
    const { method, data, headers } = options;
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.timeout = timeout;
      xhr.open(options.method, url);
      xhr.responseType = 'json';
      xhr.withCredentials = true

      if(headers) {
        Object.keys(headers).forEach(key => {
          if(headers[key] !== 'multipart/form-data')
            xhr.setRequestHeader(key, headers[key]);
        });
      }

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }

      xhr.onload = function() {
        if (xhr.status != 200) {
          if(xhr.status == 500){
            reject(xhr.status);
          } else {
            reject(xhr.response);
          }
        } else {
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


