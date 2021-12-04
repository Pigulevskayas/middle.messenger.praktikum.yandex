// @ts-ignore
import Block from '../../modules/block';
import compile from '../../modules/compile';
import Input from '../../components/input/index';
import Button from '../../components/button/index';
const compileTemplate  = require('./auth-form.pug');

// interface ButtonInt {
// 	text: string;
// 	events: Record<string, (e?: Event) => void>;
// }

// interface InputInt {
// 	classname: string;
// 	attributes: Record<string, any>;
// 	events: Record<string, (e?: Event) => void>;
// }

export default class Form extends Block {
	constructor(props?: object) {
		super("div", {content: props});
	}

	render(): DocumentFragment {
		const renderFields = {};
		const formItems = this.props.content;

		formItems.formElements.map((element: object) => {
			let key: string;
			for (key in element) {
				if (key == 'button'){
					let component = new Button({
						text: element[key]['text'],
						events: formItems.buttonEvent
					});
					renderFields[key] = component;
				} else {
					let component = new Input({
						classname: element[key]['classname'],
						attributes: element[key]['attributes'],
						events: formItems.inputEvent
					});
					renderFields[key] = component;
				}
			}
		});

		return compile(compileTemplate, renderFields);
	}
}
