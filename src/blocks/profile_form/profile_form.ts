import Block from '../../modules/block';
import compile from '../../modules/compile';
import Input from '../../components/input/index';
import Button from '../../components/button/index';

const compileTemplate = require('./profile_form.pug');

export default class ProfileForm extends Block {
	constructor(props: object) {
		super('div', { content: props });
	}

	render() {
		const renderFields = {};
		const formItems = this.props.content;
		formItems.formElements.map((element: object) => {
			let key:string;
			for (key in element) {
				if (key == 'button') {
					const component = new Button({
						text: element[key].text,
						events: formItems.buttonEvent,
					});
					renderFields[key] = component;
				} else {
					const component = new Input({
						classname: element[key].classname,
						attributes: element[key].attributes,
						events: formItems.inputEvent,
					});
					renderFields[key] = component;
				}
			}
		});
		return compile(compileTemplate, renderFields);
	}
}
