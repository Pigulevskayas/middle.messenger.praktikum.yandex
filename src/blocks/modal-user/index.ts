import Block from '../../modules/block';
import compile from '../../modules/compile';
import Input from '../../components/input/index';
import Button from '../../components/button/index';
import CloseModal from '../../components/close-modal/index';
const compileTemplate  = require('./modal-user.pug');

export default class Modal extends Block {
	constructor(props:{
		id: string;
		modalTitle: string;
		btnText: string;
		isVisible: boolean; 
		isError: boolean; 
		inputName: string;
		inputLabel: string;
		inputEvent: () => void;
		buttonEvent: () => void;
	}) {
	    super("div", props);
	}

	closeModal = ()	=> {
		let modals = document.querySelectorAll('.modal');
		modals.forEach((modal) => {
			modal.classList.remove('modal_show');
		});
	}

	render() {
		const input = new Input({
			classname: 'input',
			attributes: {
				type: 'text',
				name: this.props.inputName,
				placeholder: this.props.inputLabel,
			},
			events: {
				blur: (e: any) => this.props.inputEvent(e.target.value)
			}
		});

		const button = new Button({
			text: this.props.btnText,
			events: {
				click: () => this.props.buttonEvent()
			}
		});

		const close = new CloseModal({
			events: {
				click: (e: any) => {
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
			isVisible: this.props.isVisible
		});

		return fragment;
	}
}
