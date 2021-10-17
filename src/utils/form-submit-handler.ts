import validate from './validate.ts';
import collectData from './collect-data.ts';

export default function buttonHandler(state: object) {
	for (let key: string in state) {
		let message = validate(state[key], key);
		let element = document.querySelector(`input[name="${key}"]`);

		let clean = state[key].replaceAll('<', '&lt;');
		clean = clean.replaceAll('>', '&gt;');
		state[key] = clean;

		if(message){
			console.log('message', message);
			element.nextSibling.textContent = message;
		} else {
			console.log('formdata', state);
			return state;
		}
	}
	
	
};