import Block from '../../../modules/block.ts';
import compile from '../../../modules/compile.ts';
import Form from '../../../blocks/auth-form/auth-form.ts';
import Link from '../../../components/link/index.ts';
import compileTemplate from './registration.pug';
import EventBus from './event-bus.ts';
import inputHandler from '../../../utils/form-inputs-handler.ts';
import buttonHandler from '../../../utils/form-submit-handler.ts';

import '../auth.css';
import '../../../components/button/button.css';
import '../../../components/input/input.css';
import '../../../components/form-field/form-field.css';

import AuthController from '../../../controllers/auth-controller.ts';

interface LinkInt {
	text: string, 
	link: string
}

interface FormElementInt {
	inputEmail: Object<string>; 
	inputLogin: Object<string>;
	inputName: Object<string>;
	inputLastname: Object<string>; 
	inputPhone: Object<string>;
	inputPassword: Object<string>;
	inputRePassword: Object<string>;
	button: Object<string>;
	input: () => void;
	onfocus: () => void;
	onblur: () => void;
	click: () => void;
}

interface FormElementsInt extends Array<FormElementInt>{}

export default class Regisatration extends Block {
	constructor(props) {
	  super('div', props);
	}

	protected getStateFromProps() {
    this.state = {
      onRegister: async (data) => {
        const res = await AuthController.registration(data);
      }
    }
  }

  componentDidMount() {
    // console.log('componentDidMount')
    if (this.props.user.profile) {
      this.props.router.go('/messenger')
    }
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate')
    if (this.props.user.profile) {
      this.props.router.go('/messenger');
    }

    return true;
  }

	render(): DocumentFragment {
		console.log('registration', this.registration)
		const content = {
			formElements: config.formElements, 
			buttonEvent: {
				click: () => {
          let data = buttonHandler(regState);
          this.state.onRegister(data);
        }
			},
			inputEvent: {
				input: config.input,
        focus: config.focus,
        blur: config.blur
			},
			linkEvent: {
				click: (e) => {
					e.preventDefault();
					window.location = e.target.getAttribute('to')
				},
			}
		}

		const regForm = new Form(content);

		const link: LinkInt = new Link({
			text: 'Войти', 
			to: "/",
			events: content.linkEvent
		});

		const fragment = compile(compileTemplate, {
			error: this.props.user.error?.reason,
			form: regForm,
			link: link
		});

		return fragment;
	}

}


const regState = {
  email: null,
  password: null,
  first_name: null,
  second_name: null,
  phone: null,
  password: null,
  repassword: null
}

const config: FormElementsInt = {
  	formElements: [{
		inputEmail: {
			classname: 'input',
      attributes: {
				placeholder: "Почта", 
				type: "email", 
				name: "email"
			}
		}
	}, {
		inputLogin: {
			classname: 'input',
      attributes: {
				placeholder: "Логин", 
				type: "text", 
				name: "login"
			}
		}
	}, {
		inputName: {
			classname: 'input',
      attributes: {
				placeholder: "Имя", 
				type: "text", 
				name: "first_name"
			}
		}
	}, {
		inputLastName: {
			classname: 'input',
      attributes: {
				placeholder: "Фамилия", 
				type: "text", 
				name: "second_name"
			}
		}
	}, {
			inputPhone: {
				classname: 'input',
	      attributes: {
					placeholder: "Телефон", 
					type: "text", 
					name: "phone"
				}
			}
	}, {
			inputPassword: {
				classname: 'input',
	      attributes: {
					placeholder: "Пароль", 
					type: "password", 
					name: "password"
				}
			}
	}, {
			inputRePassword: {
				classname: 'input',
	      attributes: {
					placeholder:"Пароль (ещё раз)", 
					type: "password", 
					name: "repassword"
				}
			}
	}, {
      	button: {
	        text: 'Зарегистрироваться'
      	}
    }],
  	input: function(e){
	    regState[e.target.name] = e.target.value;
  	},
  	focus: (e) => inputHandler(e.target, regState),
	  blur: (e) => inputHandler(e.target, regState),
	  click: () => {
	  	let data = buttonHandler(regState);
	  }

}

// export default new Regisatration(RegConfig);
