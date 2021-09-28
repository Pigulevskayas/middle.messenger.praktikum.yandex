import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import Form from '../../blocks/profile_form/profile_form.ts';
import NavButton from '../../components/nav-btn/index.ts';
import Modal from '../../blocks/modal-avatar/index.ts';
import compileTemplate from './profile.pug';
import inputHandler from '../../utils/form-inputs-handler.ts';
import buttonHandler from '../../utils/form-submit-handler.ts';

import '../../components/nav/nav.css';
import '../../components/nav-btn/nav-btn.css';
import '../../components/user-info/user-info.css';
import '../../pages/profile/profile.css';
import '../../blocks/modal-avatar/modal-avatar.css';
import '../../components/form-field/form-field.css';

interface FormElementInt {
  inputEmail: Object<string>; inputPassword: Object<string>; button: object
}

interface FormElementsInt extends Array<FormElementInt>{}

interface NavButtonInt {
  type: string;
  link: string;
}

interface ModalInt {
	isVisible: boolean, 
	isError: boolean 
}

class Profile extends Block {
	constructor(props) {
	  super('div', {config: props});
	}

	render(): DocumentFragment {
		const content = {
			formElements: this.props.config.formElements, 
			buttonEvent: {
				click: this.props.config.click
			},
			inputEvent: {
				input: this.props.config.input,
				focus: this.props.config.focus,
        blur: this.props.config.blur
			}
		}

		const profileForm = new Form(content);

		// Password change
		// const passwordForm = new Form(passwordFormElements);

		const btnBack: NavButtonInt = new NavButton({
			type: 'back', 
			link: "/"
		});

		const btnExit: NavButtonInt = new NavButton({
			type: 'exit', 
			link: "/login"
		});

		const btnEdit: NavButtonInt = new NavButton({
			type: 'edit', 
			link: "#"
		});

		const passwordEdit: NavButtonInt = new NavButton({
			type: 'password', 
			link: "#"
		});

		const modal: ModalInt = new Modal({
			isVisible: false, 
			isError: false 
		});

		const fragment = compile(compileTemplate,{
			name: 'Иван',
			userform: profileForm,
			back: btnBack.render(),
			exit: btnExit.render(),
			edit: btnEdit.render(),
			password: passwordEdit.render(),
			// passwordform: passwordForm.render(),
			modal: modal.render()
		});

		return fragment;
	}

}


const profileState = {
  email: "pochta@yandex.ru",
  login: "ivanivanov",
  first_name: "Иван",
  last_name: "Иванов",
  username: "Иван",
  password: null,
  phone: "+79099673030",
}

const profileConfig = {
  formElements: [{
			email: {
				classname: 'input',
      	attributes: {
					placeholder:"Почта", 
					type:"email", 
					name:"email", 
					value: profileState.email
				}
			}
		}, {
			login: {
				classname: 'input',
	      attributes: {
					placeholder:"Логин", 
					type:"text", 
					name:"login", 
					value: profileState.login
				}
			} 
		}, {
			first_name: {
				classname: 'input',
	      attributes: {
					placeholder:"Имя", 
					type:"text", 
					name:"first_name", 
					value: profileState.first_name
				}
			}
		}, {
			last_name: {
				classname: 'input',
	      attributes: {
					placeholder:"Фамилия", 
					type:"text", 
					name:"last_name", 
					value: profileState.last_name
				}
			}
		}, {
			username: {
				classname: 'input',
	      attributes: {
					placeholder: "Имя в чате", 
					type: "text", 
					name:"username", 
					value: profileState.username
				}
			}
		}, {
			phone: {
				classname: 'input',
	      attributes: {
					placeholder:"Телефон", 
					type:"text", 
					name:"phone", 
					value: profileState.phone
				}
			}
		}, {
			button: {
				text: 'Сохранить'
			}
		}
	],
	input: function(e){
		profileState[e.target.name] = e.target.value;
	},
	focus: (e) => inputHandler(e.target, profileState),
	blur: (e) => inputHandler(e.target, profileState),
  click: () => buttonHandler(profileState)

}

export default new Profile(profileConfig);




