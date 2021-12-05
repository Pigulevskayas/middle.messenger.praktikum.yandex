import Block from '../../../modules/block';
import compile from '../../../modules/compile';
import Form from '../../../blocks/auth-form/auth-form';
import Link from '../../../components/link/index';
const compileTemplate  = require('./login.pug');
import inputHandler from '../../../utils/form-inputs-handler';
import buttonHandler from '../../../utils/form-submit-handler';
import '../auth.css';
import '../../../components/button/button.css';
import '../../../components/input/input.css';
import '../../../components/form-field/form-field.css';
import AuthController from '../../../controllers/auth-controller';

// interface LinkInt {
// 	text: string; 
// 	to: string;
//   events: object;
// }

// interface FormElementInt {
//   inputLogin: Object<string>; 
//   inputPassword: Object<string>;
//   button: object;
//   input: () => void;
//   focus: () => void;
//   blur: () => void;
//   click: () => void;
// }

// interface FormElementsInt extends Array<FormElementInt>{}

interface loginStateInt {
  login: null | string;
  password: null | string;
}

// Loginpage configuration
const loginState: loginStateInt = {
  login: null,
  password: null
}

const config = {
  formElements: [{
      inputLogin: {
        classname: 'input',
        attributes: {
          type: 'text',
          name: 'login',
          placeholder: 'Логин',
          value: loginState.login
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
        text: 'Вход'
      }
    }
  ],
  input: function(e: any){
    loginState[e.target.name] = e.target.value;
  },
  focus: (e: any) => inputHandler(e.target, loginState),
  blur: (e: any) => inputHandler(e.target, loginState),
  click: () => {
    // let data = buttonHandler(loginState);
    // this.state.onLogin(data);
  } 
}

export class Login extends Block {
	constructor(props?: any) {
	  super('div', props);
	}

  protected getStateFromProps() {
    this.state = {
      onLogin: async (data: loginStateInt) => {
        await AuthController.login(data);
      }
    }
  }

  componentDidMount(): void {
    if (this.props.user.profile) {
      this.props.router.go('/messenger')
    }
  }

  componentDidUpdate() {
    if (this.props.user.profile) {
      this.props.router.go('/messenger');
    }

    return true;
  }

	render(): DocumentFragment {
		const content = {
			formElements: config.formElements, 
			buttonEvent: {
				click: () => {
          let data = buttonHandler(loginState);
          this.state.onLogin(data);
        }
			},
			inputEvent: {
				input: config.input,
        focus: config.focus,
        blur: config.blur
			},
      linkEvent: {
        click: (e: any) => {
          e.preventDefault();
          window.location = e.target.getAttribute('to')
        },
      }
		}

		const loginForm = new Form(content);

		const link = new Link({
			text: 'Нет аккаунта?',
      to: '/sign-up',
      events: content.linkEvent
		});

		const fragment = compile(compileTemplate, {
      error: this.props.user?.error?.reason,
			form: loginForm,
			link: link
		});

		return fragment;
	}
}
