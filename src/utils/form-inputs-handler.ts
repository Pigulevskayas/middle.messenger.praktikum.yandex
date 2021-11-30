import validate from './validate';

export default function inputHandler(element: any, state: any){
	state[element.name] = element.value;
	let message = validate(element.value, element.name);
	element.nextSibling.textContent = message;
};