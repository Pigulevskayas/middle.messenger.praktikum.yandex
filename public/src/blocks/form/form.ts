import EventBus from './event-bus.ts';
import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import Input from '../../components/input/index.ts';
import Button from '../../components/button/index.ts';
import compileTemplate from './form.pug';

const pug = require('pug');

interface ButtonInt {
	text: string,
	events: () => void
}

interface InputInt {
	type: string,
	name: string,
	label: string
}

export default class Form extends Block {

	constructor(props: object) {
	    super("div", {content: props});
	}

	render(): string {
		const renderFields = {};

		const formItems = this.props.content;

		formItems.formElements.map(function(element: object){
			let component;
			for (let key: string in element) {
				// console.log('key', key)
				if (key == 'button'){
					let component: ButtonInt = new Button({
						text: element[key]['text'],
						events: formItems.buttonEvent
						// events: element[key]['events']
					});
					// renderFields[key] = component.render();
					renderFields[key] = component;
				} else {
					let component: InputInt = new Input({
						type: element[key]['type'],
						name: element[key]['name'],
						label: element[key]['label'],
						value: element[key]['value'],
						readonly: element[key]['readonly'],
						events: formItems.inputEvent
						// events: element[key]['events']
					});
					// renderFields[key] = component.render();
					renderFields[key] = component;
				}
			}
		});

		// return compileTemplate(renderFields);
		return compile(compileTemplate, renderFields);

	}

}
