import Block from '../../modules/block.ts';
import Button from '../../components/button/index.ts';
import compileTemplate from './modal.pug';

const pug = require('pug');

export default class Modal extends Block {
	constructor(props) {
	    super("div", {options: props});
	   	this.options = this.props.options;
	}

	render() {
		const button = new Button({
			text: "Поменять"
		});

		return compileTemplate({
			button: button.render(),
			isVisible: this.props.options.isVisible,
			isError: this.props.options.isError,
			fileName: this.props.options.fileName
		});
	}
}