import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import Form from '../../blocks/profile_form/profile_form.ts';
import NavButton from '../../components/nav-btn/index.ts';
import Modal from '../../blocks/modal-avatar/index.ts';
import compileTemplate from './profile.pug';
import validate from '../../modules/validate.ts';
import collectData from '../../modules/collect-data.ts';
import validate from '../../modules/validate.ts';
import collectData from '../../modules/collect-data.ts';

// const pug = require('pug');

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

// const formElements: FormElementsInt = [
// 	{
// 		inputEmail: {
// 			label:"Почта", 
// 			type:"email", 
// 			name:"email", 
// 			value:"pochta@yandex.ru", 
// 			readonly:false
// 		}
// 	}, {
// 		inputLogin: {
// 			label:"Логин", 
// 			type:"text", 
// 			name:"login", 
// 			value:"ivanivanov", 
// 			readonly:false
// 		} 
// 	}, {
// 		inputName: {
// 			label:"Имя", 
// 			type:"text", 
// 			name:"first_name", 
// 			value:"Иван", 
// 			readonly:false
// 		}
// 	}, {
// 		inputLastName: {
// 			label:"Фамилия", 
// 			type:"text", 
// 			name:"last_name", 
// 			value:"Иванов", 
// 			readonly:false
// 		}
// 	}, {
// 		inputChatName: {
// 			label: "Имя в чате", 
// 			type: "text", 
// 			name:"username", 
// 			value:"Иван", 
// 			readonly:false
// 		}
// 	}, {
// 		inputPhone: {
// 			label:"Телефон", 
// 			type:"text", 
// 			name:"phone", 
// 			value:"+7 (909) 967 30 30", 
// 			readonly:false
// 		}
// 	}, {
// 		button: {
// 			text: 'Сохранить',
// 			events: ()	=> console.log('clicked')
// 		}
// 	}
// ];

// const passwordFormElements: FormElementsInt = [
// 	{
// 		inputOldPassword: {
// 			label:"Старый пароль", 
// 			type:"password", 
// 			name:"old-password", 
// 			value:"pochta@yandex.ru", 
// 			readonly:false
// 		}
// 	}, {
// 		inputNewPassword: {
// 			label:"Новый пароль", 
// 			type:"password", 
// 			name:"new-password", 
// 			value:"ivanivanov", 
// 			readonly:false
// 		}
// 	}, {
// 		inputReNewPassword: {
// 			label:"Повторите новый пароль", 
// 			type:"password", 
// 			name:"repeat-password", 
// 			value:"ivanivanov", 
// 			readonly:false
// 		}
// 	}, {
// 		button: {
// 			text: 'Сохранить',
// 			events: ()	=> console.log('clicked')
// 		}
// 	}
// ];

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

		// let html = compileTemplate({
		// 	name: 'Иван',
		// 	userform: profileForm.render(),
		// 	back: btnBack.render(),
		// 	exit: btnExit.render(),
		// 	edit: btnEdit.render(),
		// 	password: passwordEdit.render(),
		// 	passwordform: passwordForm.render(),
		// 	modal: modal.render()
		// });

		// return pug.render(html);
	}

}


const profileState = {
  email: null,
  login: null,
  first_name: null,
  last_name: null,
  username: null,
  password: null,
  phone: null
}

const profileConfig = {
  formElements: [{
			inputEmail: {
				classname: 'input',
      	attributes: {
					placeholder:"Почта", 
					type:"email", 
					name:"email", 
					value:"pochta@yandex.ru", 
					readonly: false
				}
			}
		}, {
			inputLogin: {
				classname: 'input',
	      attributes: {
					placeholder:"Логин", 
					type:"text", 
					name:"login", 
					value:"ivanivanov", 
					readonly:false
				}
			} 
		}, {
			inputName: {
				classname: 'input',
	      attributes: {
					placeholder:"Имя", 
					type:"text", 
					name:"first_name", 
					value:"Иван", 
					readonly:false
				}
			}
		}, {
			inputLastName: {
				classname: 'input',
	      attributes: {
					placeholder:"Фамилия", 
					type:"text", 
					name:"last_name", 
					value:"Иванов", 
					readonly:false
				}
			}
		}, {
			inputChatName: {
				classname: 'input',
	      attributes: {
					placeholder: "Имя в чате", 
					type: "text", 
					name:"username", 
					value:"Иван", 
					readonly:false
				}
			}
		}, {
			inputPhone: {
				classname: 'input',
	      attributes: {
					placeholder:"Телефон", 
					type:"text", 
					name:"phone", 
					value:"+7 (909) 967 30 30", 
					readonly:false
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
		// validate(e.target.value, fieldName)
	},
	focus: function(e){
		profileState[e.target.name] = e.target.value;
		validate(e.target.value, fieldName);
	},
	blur: function(e){
		profileState[e.target.name] = e.target.value;
		validate(e.target.value, fieldName);
	},
  click: () => {
  	collectData(profileState);
  	for (let key: string in profileState) {
			validate(profileState[key], key);
		}
  }
 
}

export default new Profile(profileConfig);




