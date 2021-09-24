const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT', 
  DELETE: 'DELETE'
};

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

class HTTPTransport {
		get = (url: string, options: object = {}) => {
          
      let strdata = queryStringify(options.data);

			let newUrl = `${url}${strdata}`;
		  return this.request(newUrl, {...options, method: METHODS.GET }, options.timeout);
		};

		// PUT, POST, DELETE
    post = (url: string, options: object = {}) => {	 
			return this.request(url, {...options, method: METHODS.POST}, options.timeout);
		};

    put = (url: string, options: object = {}) => {	 
			return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
		};

    delete = (url: string, options: object = {}) => {	 
			return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
		};

		// options:
		// headers — obj
		// data — obj
		request = (url: string, options: object, timeout: number = 5000) => {
          const {method, data, headers} = options;
 
          return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(options.method, url);
            
            if (headers) {
                Object.keys(headers).forEach(key => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }
            
            xhr.onload = function() {
							
              resolve(xhr);
            };

            xhr.onabort = reject(xhr.statusText);
            xhr.onerror = reject(xhr.statusText);
            xhr.ontimeout = reject(xhr.statusText);

            if (method === METHODS.GET || !data) {
              xhr.send();
            } else {
              xhr.send(data);
            }
          });
          
		};
}
