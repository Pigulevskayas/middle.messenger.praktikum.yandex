import validate from './validate';

export default function buttonHandler(state: object) {
	let key: string;
	for (key in state) {
		let message: string = validate(state[key], key);
		let element: HTMLElement = document.querySelector(`input[name="${key}"]`);

		let clean: string = state[key].replaceAll('<', '&lt;');
		clean = clean.replaceAll('>', '&gt;');
		state[key] = clean;

		if (message) {
			console.log('message', message);
			element.nextSibling.textContent = message;
		} else {
			console.log('formdata', state);
			return state;
		}
	}
};