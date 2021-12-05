import Block from '../../modules/block';
import compile from '../../modules/compile';
import Form from '../../blocks/profile_form/profile_form';
import NavButton from '../../components/nav-btn/index';
import Modal from '../../blocks/modal-avatar/index';
import Avatar from '../../components/avatar/index';
import inputHandler from '../../utils/form-inputs-handler';
import buttonHandler from '../../utils/form-submit-handler';
import '../../components/nav/nav.css';
import '../../components/nav-btn/nav-btn.css';
import '../../components/user-info/user-info.css';
import './profile.css';
import '../../blocks/modal-avatar/modal-avatar.css';
import '../../components/form-field/form-field.css';
import AuthController from '../../controllers/auth-controller';
import ProfileController from '../../controllers/profile-controller';

const compileTemplate = require('./profile.pug');

// interface NavButtonInt {
//   type: string;
//   to: string;
// 	events: object;
// }

interface AvatarInt {
	imgurl?: string | null;
}

interface profileValuesInt {
	email: string | null;
	login: string | null;
	first_name: string | null;
	second_name: string | null;
	display_name: string | null;
	password: string | null;
	phone: string | null;
}

const profileValues: profileValuesInt = {
	email: null,
	login: null,
	first_name: null,
	second_name: null,
	display_name: null,
	password: null,
	phone: null,
};

export class Profile extends Block {
	constructor(props) {
		super('div', props);
	}

	protected getStateFromProps() {
		this.state = {
			onProfile: async (data: any) => {
				await ProfileController.profile(data);
			},
			onLogout: async () => {
				await AuthController.logout();
			},
			onPassword: async (data: any) => {
				await ProfileController.password(data);
			},
		};
	}

	editUserForm = (): void => {
		const inputs = document.querySelectorAll('.user-info_data .input');
		inputs.forEach((input: HTMLElement): void => {
			input.removeAttribute('disabled');
		});

		const nav: HTMLElement = document.querySelector('.profile__links')!;
		nav.classList.add('profile__links_hidden');

		const closeNav: HTMLElement = document.querySelector('.profile__close')!;
		closeNav.style.display = 'block';

		const submit: HTMLElement = document.querySelector('.profile__submit')!;
		submit.classList.remove('profile__submit_hidden');
	}

	editPasswordForm = (): void => {
		const nav: HTMLElement = document.querySelector('.profile__links')!;
		nav.classList.add('profile__links_hidden');

		const dataForm : HTMLElement = document.querySelector('.user-info_data')!;
		dataForm.classList.add('user-info_hidden');

		const closeNav: HTMLElement = document.querySelector('.profile__close')!;
		closeNav.style.display = 'block';

		const passwordForm: HTMLElement = document.querySelector('.user-info_password')!;
		passwordForm.classList.remove('user-info_hidden');
	}

	closeEdit = (): void	=> {
		const inputs = document.querySelectorAll('.user-info_data .input');
		inputs.forEach((input: HTMLElement): void => {
			input.setAttribute('disabled', 'disabled');
		});

		const nav: HTMLElement = document.querySelector('.profile__links')!;
		nav.classList.remove('profile__links_hidden');

		const closeNav: HTMLElement = document.querySelector('.profile__close')!;
		closeNav.style.display = 'none';

		const submit: HTMLElement = document.querySelector('.profile__submit')!;
		submit.classList.add('profile__submit_hidden');

		const editPassword: HTMLElement = document.querySelector('.user-info_password')!;
		if (!editPassword.classList.contains('user-info_hidden')) {
			editPassword.classList.add('user-info_hidden');

			const editProfile: HTMLElement = document.querySelector('.user-info_data')!;
			editProfile.classList.remove('user-info_hidden');
		}
	}

	showModal = (): void	=> {
		const modal: HTMLElement = document.querySelector('.modal')!;
		modal.classList.add('modal_show');
	}

	componentDidMount(): void {
		if (this.props.user?.profile) {
			const inputs = document.querySelectorAll('.user-info_data .input');
			inputs.forEach((input: HTMLElement):void => {
				input.setAttribute('disabled', 'disabled');
			});

			const userObj = this.props.user.profile;
			profileValues.email = userObj.email;
			profileValues.first_name = userObj.first_name;
			profileValues.second_name = userObj.second_name;
			profileValues.display_name = userObj.display_name;
			profileValues.login = userObj.login;
			profileValues.phone = userObj.phone;
		}
	}

	componentDidUpdate() {
		if (!this.props.user.profile && !this.props.user.error) {
			this.props.router.go('/');
		}

		if (this.props.user.error === 500) {
			this.props.router.go('/error');
		}

		return true;
	}

	render(): DocumentFragment {
		const config = {
			formElements: [{
				email: {
					classname: 'input',
					attributes: {
						placeholder: 'Почта',
						type: 'email',
						name: 'email',
						value: this.props.user?.profile?.email,
					},
				},
			}, {
				login: {
					classname: 'input',
					attributes: {
						placeholder: 'Логин',
						type: 'text',
						name: 'login',
						value: this.props.user?.profile?.login,
					},
				},
			}, {
				first_name: {
					classname: 'input',
					attributes: {
						placeholder: 'Имя',
						type: 'text',
						name: 'first_name',
						value: this.props.user?.profile?.first_name,
					},
				},
			}, {
				second_name: {
					classname: 'input',
					attributes: {
						placeholder: 'Фамилия',
						type: 'text',
						name: 'second_name',
						value: this.props.user?.profile?.second_name,
					},
				},
			}, {
				display_name: {
					classname: 'input',
					attributes: {
						placeholder: 'Имя в чате',
						type: 'text',
						name: 'display_name',
						value: this.props.user?.profile?.display_name ? this.props.user.profile.display_name : '',
					},
				},
			}, {
				phone: {
					classname: 'input',
					attributes: {
						placeholder: 'Телефон',
						type: 'text',
						name: 'phone',
						value: this.props.user?.profile?.phone,
					},
				},
			}, {
				button: {
					text: 'Сохранить',
				},
			},
			],
			input(e: any) {
				profileValues[e.target.name] = e.target.value;
			},
			focus: (e: any) => inputHandler(e.target, profileValues),
			blur: (e: any) => inputHandler(e.target, profileValues),
		};

		const configPassword = {
			formElements: [{
				oldPassword: {
					classname: 'input',
					attributes: {
						placeholder: 'Старый пароль',
						type: 'password',
						name: 'oldPassword',
						value: '',
					},
				},
			}, {
				newPassword: {
					classname: 'input',
					attributes: {
						placeholder: 'Новый пароль',
						type: 'password',
						name: 'newPassword',
						value: '',
					},
				},
			}, {
				repeatNewPassword: {
					classname: 'input',
					attributes: {
						placeholder: 'Повторите новый пароль',
						type: 'password',
						name: 'repeatNewPassword',
						value: '',
					},
				},
			}, {
				button: {
					text: 'Сохранить',
				},
			},
			],
			input(e: any) {
				profileValues[e.target.name] = e.target.value;
			},
			focus: (e: any) => inputHandler(e.target, profileValues),
			blur: (e: any) => inputHandler(e.target, profileValues),
		};

		const content = {
			formElements: config.formElements,
			buttonEvent: {
				click: () => {
					const data = buttonHandler(profileValues);
					this.state.onProfile(data);
				},
			},
			inputEvent: {
				input: config.input,
				focus: config.focus,
				blur: config.blur,
			},
		};

		const contentPassword = {
			formElements: configPassword.formElements,
			buttonEvent: {
				click: () => {
					const data = buttonHandler(profileValues);
					this.state.onPassword(data);
				},
			},
			inputEvent: {
				input: configPassword.input,
				focus: configPassword.focus,
				blur: configPassword.blur,
			},
		};

		// Userdata form
		const profileForm = new Form(content);

		// Password change form
		const passwordForm = new Form(contentPassword);

		const btnBack = new NavButton({
			type: 'back',
			to: '/messenger',
			events: {
				click: (e: any) => {
					e.preventDefault();
					window.location = e.target.getAttribute('to');
				},
			},
		});

		const btnExit = new NavButton({
			type: 'exit',
			to: '/',
			events: {
				click: (e: any) => {
					e.preventDefault();
					this.state.onLogout();
				},
			},
		});

		const btnEdit = new NavButton({
			type: 'edit',
			events: {
				click: (e: any)	=> {
					e.preventDefault();
					this.editUserForm();
				},
			},
		});

		const btnClose = new NavButton({
			type: 'close',
			events: {
				click: (e: any)	=> {
					e.preventDefault();
					this.closeEdit();
				},
			},
		});

		const passwordEdit = new NavButton({
			type: 'password',
			events: {
				click: (e: any)	=> {
					e.preventDefault();
					this.editPasswordForm();
				},
			},
		});

		const modal = new Modal();

		const avatar: AvatarInt = new Avatar({
			imgurl: this.props.user?.profile.avatar ? this.props.user.profile.avatar : null,
			events: {
				click: ()	=> {
					this.showModal();
				},
			},
		});

		const fragment = compile(compileTemplate, {
			avatar,
			name: this.props.user?.profile.first_name,
			userform: profileForm,
			back: btnBack,
			exit: btnExit,
			edit: btnEdit,
			close: btnClose,
			password: passwordEdit,
			passwordform: passwordForm,
			modal,
		});

		return fragment;
	}
}
