export default function validate(value: string, type: string): boolean {
	if(!value) {
		console.log(`Заполните поле ${type}`);
	} else {
		let regexp;
		let matchAll: Array;
		let message: string;

		if(type === 'message' && value.length <= 0) {
			console.log('Введите сообщение');
		}

		if(type === 'first_name' && type === 'second_name') {
			regexp = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/g;
			matchAll = value.matchAll(regexp);
			matchAll = Array.from(matchAll);
			if(matchAll.length === 0) {
				console.log(`Проверьте поле ${type}`);
			}
		}

		if(type === 'login') {
			regexp = /^[a-zA-Z0-9-_]{3,20}$/g;
			matchAll = value.matchAll(regexp);
			matchAll = Array.from(matchAll);
			if(matchAll.length === 0) {
				console.log('Проверьте поле Логин');
			}

			if(value.length > 20 || value.length < 3) {
				console.log('Логин должен быть не менее 3 и не более 20 символов');
			}
		}

		if(type === 'email') {
			regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]/g;
			matchAll = value.matchAll(regexp);
			matchAll = Array.from(matchAll);
			if(matchAll.length === 0) {
				console.log('Проверьте поле email');
			}
		}

		if(type === 'password') {
			if(matchAll.length === 0) {
				regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/g;
				matchAll = value.matchAll(regexp);
				matchAll = Array.from(matchAll);
				console.log('Пароль должен содержать хотя бы одну заглавную букву и цифру');
			}

			if(value.length > 40 || value.length < 8) {
				console.log('Пароль должен быть не менее 8 и не более 40 символов');
			}
		}

		if(type === 'phone') {
			regexp = /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}/g;
			matchAll = value.matchAll(regexp);
			matchAll = Array.from(matchAll);
			if(matchAll.length === 0 && (value.length > 15 || value.length < 10)) {
				console.log('Проверьте номер телефона');
			}
		}
	}
}
