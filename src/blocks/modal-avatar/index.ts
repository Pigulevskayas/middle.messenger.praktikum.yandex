import Block from '../../modules/block';
import compile from '../../modules/compile';
import Input from '../../components/input/index';
import Button from '../../components/button/index';
import CloseModal from '../../components/close-modal/index';
const compileTemplate  = require('./modal-avatar.pug');
import AuthController from '../../controllers/auth-controller';
import ProfileController from '../../controllers/profile-controller';

export default class Modal extends Block {
	constructor(props) {
	    super("div", props);
	}

	protected getStateFromProps() {
	    this.state = {
	    	onAvatar: async () => {
	    		let file: HTMLInputElement = document.querySelector('input[name="avatar"]')!;
	    		if(file.files[0]) {
	    			let data = new FormData();
	    			data.append('avatar', file.files[0]);
		        	await ProfileController.avatar(data);
	    		} else {
	    			let emptyFile: HTMLElement = document.querySelector('.modal__notice')!;
	    			emptyFile.style.display = 'block';
	    		}
		    }
	    }
	}

	changeAvatar = (fileName: string)	=> {
		let emptyFile: HTMLElement = document.querySelector('.modal__notice')!;
		if(fileName){
			let inputLabel: HTMLElement = document.querySelector('.modal__link')!;
			inputLabel.textContent = fileName;
			emptyFile.style.display = 'none';
		} else {
			emptyFile.style.display = 'block';
		}
	}

	closeModal = ()	=> {
		let modal: HTMLElement = document.querySelector('.modal')!;
		modal.classList.remove('modal_show');
	}

	render() {
		const input = new Input({
			classname: 'input_hidden',
			attributes: {
				type: "file",
				name: "avatar",
				id: "avatar"
			},
			events: {
				change: (e: any) => this.changeAvatar(e.target.files[0]['name'])
			},
		});

		const button = new Button({
			text: "Поменять",
			events: {
				click: () => this.state.onAvatar()
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
			close: close,
			input: input,
			button: button
		});

		return fragment;
	}
}
