import validate from './validate.ts';
import collectData from './collect-data.ts';

export default function inputHandler(element: object, state: object){
	state[element.name] = element.value;
	let message = validate(element.value, element.name);
	element.nextSibling.textContent = message;
};