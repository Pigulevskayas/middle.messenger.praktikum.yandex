import Block from '../../../modules/block.ts';
import compile from '../../../modules/compile.ts';
import Form from '../../../blocks/auth-form/auth-form.ts';
import Link from '../../../components/link/index.ts';
import compileTemplate from './login.pug';
import EventBus from './event-bus.ts';
import inputHandler from '../../../utils/form-inputs-handler.ts';
import buttonHandler from '../../../utils/form-submit-handler.ts';

import '../auth.css';
import '../../../components/button/button.css';
import '../../../components/input/input.css';

interface LinkInt {
	text: string, 
	link: string,
}

interface FormElementInt {
    inputEmail: Object<string>; 
    inputPassword: Object<string>;
    button: object;
    input: () => void;
    focus: () => void;
    blur: () => void;
    click: () => void;
}

interface FormElementsInt extends Array<FormElementInt>{}

interface loginStateInt {
  email: null | string,
  password: null | string
}

class Login extends Block {
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
			},
      linkEvent: {
        click: (e) => {
          e.preventDefault();
          window.location = e.target.getAttribute('to')
        },
      }
		}

		const loginForm = new Form(content);

		const link: LinkInt = new Link({
			text: 'Нет аккаунта?',
      to: '/registration',
      events: content.linkEvent
		});

		const fragment = compile(compileTemplate,{
			form: loginForm,
			link: link
		});

		return fragment;
	}
}

// Loginpage configuration
const loginState: loginStateInt = {
  email: null,
  password: null
}

const LoginConfig: FormElementInt = {
  formElements: [{
      inputEmail: {
        classname: 'input',
        attributes: {
          type: 'text',
          name: 'email',
          placeholder: 'Почта',
          value: loginState.email
        }
      }
    },{
      inputPassword: {
        classname: 'input',
        attributes: {
          type: 'password',
          name: 'password',
          placeholder: 'Пароль',
          value: loginState.password
        }
      }
    }, {
      button: {
        text: 'Сохранить'
      }
    }
  ],
  input: function(e){console.log('input')
    loginState[e.target.name] = e.target.value;
  },
  focus: (e) => inputHandler(e.target, loginState),
  blur: (e) => inputHandler(e.target, loginState),
  click: () => buttonHandler(loginState)
 
}

export default new Login(LoginConfig);



