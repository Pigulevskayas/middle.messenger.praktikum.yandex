import validate from './validate.ts';
import collectData from './collect-data.ts';

export default function buttonHandler(state: object){
	for (let key: string in state) {
		let message = validate(state[key], key);
		let element = document.querySelector(`input[name="${key}"]`)
		if(element){
			element.nextSibling.textContent = message;
		}
	}
	console.log('formdata', state);
};