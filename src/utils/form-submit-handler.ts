import validate from './validate';

export default function buttonHandler(state: object) {
	console.log('state', state)
	let key: string;
	for (key in state) {
		let message: any = validate(state[key], key);
		let element: HTMLElement | null = document.querySelector(`input[name="${key}"]`);

		let clean: any = state[key].replaceAll('<', '&lt;');
		clean = clean.replaceAll('>', '&gt;');
		state![key] = clean;

		if (message) {
			console.log('message', message);
			element!.nextSibling!.textContent = message;
		} else {
			console.log('formdata', state);
			return state;
		}
	}
};