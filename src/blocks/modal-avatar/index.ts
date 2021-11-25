import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import Input from '../../components/input/index.ts';
import Button from '../../components/button/index.ts';
import CloseModal from '../../components/close-modal/index.ts';
import compileTemplate from './modal-avatar.pug';

import AuthController from '../../controllers/auth-controller.ts';
import ProfileController from '../../controllers/profile-controller.ts';


export default class Modal extends Block {
	constructor(props) {
	    super("div", props);
	}

	protected getStateFromProps() {
	    this.state = {
	    	onAvatar: async () => {
	    		let file = document.querySelector('input[name="avatar"]');
	    		console.log('file', file)
	    		if(file.files[0]) {
	    			let data = new FormData();
	    			data.append('avatar', file.files[0]);
		        	await ProfileController.avatar(data);
	    		} else {
	    			let emptyFile = document.querySelector('.modal__notice');
	    			emptyFile.style.display = 'block';
	    		}
		    }
	    }
	}

	changeAvatar = (fileName)	=> {
		let emptyFile = document.querySelector('.modal__notice');
		if(fileName){
			let inputLabel = document.querySelector('.modal__link');
			inputLabel.textContent = fileName;
			emptyFile.style.display = 'none';
		} else {
			emptyFile.style.display = 'block';
		}
	}

	closeModal = ()	=> {
		let modal = document.querySelector('.modal');
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
				change: (e) => this.changeAvatar(e.target.files[0]['name'])
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
				click: (e) => {
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
