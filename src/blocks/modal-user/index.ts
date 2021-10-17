import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import Input from '../../components/input/index.ts';
import Button from '../../components/button/index.ts';
import CloseModal from '../../components/close-modal/index.ts';
import compileTemplate from './modal-user.pug';

import ChatsController from '../../controllers/profile-controller.ts';


export default class Modal extends Block {
	constructor(props) {
	    super("div", props);
	   	// this.options = this.props.options;
	}

	// changeAvatar = (value)	=> {
	// 	let emptyFile = document.querySelector('.modal__notice');
	// 	if(value){
	// 		let inputLabel = document.querySelector('.modal__link');
	// 		// let statusDiv = document.querySelector('.modal__status');
	// 		inputLabel.textContent = value;
	// 		emptyFile.style.display = 'none';
	// 	} else {
	// 		emptyFile.style.display = 'block';
	// 	}
	// }

	closeModal = ()	=> {
		let modals = document.querySelectorAll('.modal');
		modals.forEach((modal) => {
			modal.classList.remove('modal_show');
		});
	}

	render() {
		// const input = new Input({
		// 	classname: 'input_hidden',
		// 	attributes: {
		// 		type: "file",
		// 		name: "avatar",
		// 		id: "avatar"
		// 	},
		// 	events: {
		// 		change: (e) => this.changeAvatar(e.target.value)
		// 	},
		// });

		const input = new Input({
			classname: 'input',
			attributes: {
				type: 'text',
				name: this.props.inputName,
				placeholder: this.props.inputLabel,
				// value: ''
			},
			events: {
				blur: (e) => this.props.inputEvent(e.target.value)
			}
			// events: this.props.content.inputEvent
		});

		const button = new Button({
			text: this.props.btnText,
			events: {
				click: () => this.props.buttonEvent()
				// click: () => this.state.onAvatar()
			}
		});

		const close = new CloseModal({
			events: {
				click: (e) => {
          			e.preventDefault();
					this.closeModal();
				}
			}
		});

		const fragment = compile(compileTemplate,{
			id: this.props.id,
			modalTitle: this.props.modalTitle,
			close: close,
			input: input,
			button: button,
			isVisible: this.props.isVisible,
			// isError: this.props.options.isError,
			// fileName: this.props.options.fileName
		});

		return fragment;
	}
}
