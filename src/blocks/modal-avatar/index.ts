import Block from '../../modules/block';
import compile from '../../modules/compile';
import Input from '../../components/input/index';
import Button from '../../components/button/index';
import CloseModal from '../../components/close-modal/index';
import ProfileController from '../../controllers/profile-controller';

const compileTemplate = require('./modal-avatar.pug');

export default class Modal extends Block {
	constructor(props: any) {
		super('div', props);
	}

	protected getStateFromProps() {
		this.state = {
			onAvatar: async () => {
				const file: HTMLInputElement = document.querySelector('input[name="avatar"]')!;
				if (file.files![0]) {
					const data = new FormData();
					data.append('avatar', file.files![0]);
					await ProfileController.avatar(data);
				} else {
					const emptyFile: HTMLElement = document.querySelector('.modal__notice')!;
					emptyFile.style.display = 'block';
				}
			},
		};
	}

	changeAvatar = (fileName: string)	=> {
		const emptyFile: HTMLElement = document.querySelector('.modal__notice')!;
		if (fileName) {
			const inputLabel: HTMLElement = document.querySelector('.modal__link')!;
			inputLabel.textContent = fileName;
			emptyFile.style.display = 'none';
		} else {
			emptyFile.style.display = 'block';
		}
	}

	closeModal = ()	=> {
		const modal: HTMLElement = document.querySelector('.modal')!;
		modal.classList.remove('modal_show');
	}

	render() {
		const input = new Input({
			classname: 'input_hidden',
			attributes: {
				type: 'file',
				name: 'avatar',
				id: 'avatar',
			},
			events: {
				change: (e: any) => this.changeAvatar(e.target.files[0].name),
			},
		});

		const button = new Button({
			text: 'Поменять',
			events: {
				click: () => this.state.onAvatar(),
			},
		});

		const close = new CloseModal({
			events: {
				click: (e: any) => {
					e.preventDefault();
					this.closeModal();
				},
			},
		});

		const fragment = compile(compileTemplate, {
			close,
			input,
			button,
		});

		return fragment;
	}
}
