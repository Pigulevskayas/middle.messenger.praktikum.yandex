import EventBus from './event-bus.ts';
import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import Input from '../../components/input/index.ts';
import Button from '../../components/button/index.ts';
import compileTemplate from './profile_form.pug';

interface ButtonInt {
	text: string,
	events: () => void
}

interface InputInt {
	type: string,
	name: string,
	label: string
}

export default class ProfileForm extends Block {

	constructor(props: object) {
	    super("div", {content: props});
	}

	render() {
		const renderFields = {};

		const formItems = this.props.content;

		// console.log('formItems', formItems)

		formItems.formElements.map(function(element: object){
			let component;
			for (let key: string in element) {
				if (key == 'button'){
					let component: ButtonInt = new Button({
						text: element[key]['text'],
						events: formItems.buttonEvent
					});
					renderFields[key] = component;
				} else {
					let component: InputInt = new Input({
						classname: element[key]['classname'],
						attributes: element[key]['attributes'],
						events: formItems.inputEvent
					});
					renderFields[key] = component;
				}
			}
		});

		// return compileTemplate(renderFields);
		return compile(compileTemplate, renderFields);
	}

}
