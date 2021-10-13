const LABELS = {
	message: "Сообщение",
	first_name: "Имя",
	second_name: "Фамилия",
	login: "Логин",
	email: "Почта",
	password: "Пароль",
	phone: "Телефон",
	username: "Имя в чате",
	repassword: "Повторите пароль"
}

export default function validate(value: string, type: string): string {
	let message: string;
	if(!value) {
		message = `Заполните поле ${LABELS[type]}`;
	} else {
		let regexp;
		let matchAll: Array;

		if(type === 'message' && value.length <= 0) {
			message = 'Введите сообщение';
		} else {
			message =''
		}

		if(type === 'first_name' || type === 'second_name') {
			regexp = /^[А-ЯA-Z][a-zа-я-]{1,20}$/g;
			matchAll = value.matchAll(regexp);
			matchAll = Array.from(matchAll);
			if(matchAll.length === 0) {
				message = `Проверьте поле ${LABELS[type]}. Латиница или кириллица, первая буква должна быть заглавной.`;
			} else {
				message =''
			}
		}

		if(type === 'login') {
			regexp = /^[a-zA-Z0-9-_]{3,20}$/g;
			matchAll = value.matchAll(regexp);
			matchAll = Array.from(matchAll);
			if(matchAll.length === 0) {
				message = 'Проверьте поле Логин';
			} else {
				message =''
			}
		}

		if(type === 'email') {
			regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]/g;
			matchAll = value.matchAll(regexp);
			matchAll = Array.from(matchAll);
			if(matchAll.length === 0) {
				message = 'Проверьте поле email';
			} else {
				message =''
			}
		}

		if(type === 'password') {
			regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/g;
			matchAll = value.matchAll(regexp);
			matchAll = Array.from(matchAll);
			if(matchAll.length === 0 && (value.length > 40 || value.length < 8)) {
				message = 'Пароль должен содержать хотя бы одну заглавную букву и цифру, быть не менее 8 и не более 40 символов';
			} else {
				message =''
			}
		}

		if(type === 'phone') {
			regexp = /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}/g;
			matchAll = value.matchAll(regexp);
			matchAll = Array.from(matchAll);
			if(matchAll.length === 0 && (value.length > 16 || value.length < 11)) {
				message = 'Проверьте номер телефона';
			} else {
				message =''
			}
		}
	}

	return message;
}
