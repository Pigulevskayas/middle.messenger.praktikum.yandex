import Block from '../../../modules/block.ts';
import compile from '../../../modules/compile.ts';
import Form from '../../../blocks/form/form.ts';
import Link from '../../../components/link/index.ts';
import compileTemplate from './login.pug';
import EventBus from './event-bus.ts';
import validate from '../../../modules/validate.ts';
import collectData from '../../../modules/collect-data.ts';

const pug = require('pug');

interface LinkInt {
	text: string, 
	link: string,
}

interface FormElementInt {
    inputEmail: Object<string>; 
    inputPassword: Object<string>;
    button: object;
    input: () => void;
    onfocus: () => void;
    onblur: () => void;
    click: () => void;
}

interface FormElementsInt extends Array<FormElementInt>{}

interface loginStateInt {
  email: null | string,
  password: null | string
}

// const formElements: FormElementsInt = [{
// 		inputEmail: {
// 			type: 'text',
// 			name: 'email',
// 			label: 'Почта'
// 		}
// 	},{
// 		inputPassword: {
// 			type: 'password',
// 			name: 'password',
// 			label: 'Пароль'
// 		}
// 	}, {
// 		button: {
// 			text: 'Сохранить',
// 			events: {
// 	            click: () => { console.log('clicked') }
// 	        }
// 		}
// 	}
// ];

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
				input: this.props.config.input
			}
		}

		const loginForm = new Form(content);

		const link: LinkInt = new Link({
			text: 'Нет аккаунта?', 
			link: "/registration"
		});

		// let html = compileTemplate({
		// 	form: loginForm.render(),
		// 	link: link.render()
		// });

		// return pug.render(html);

		const fragment = compile(compileTemplate,{
			form: loginForm,
			link: link
		});

		return fragment;

		// this.root.appendChild(fragment);

		// return this.root;
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
        type: 'text',
        name: 'email',
        label: 'Почта',
        value: loginState.email
      }
    },{
      inputPassword: {
        type: 'password',
        name: 'password',
        label: 'Пароль',
        value: loginState.password
      }
    }, {
      button: {
        text: 'Сохранить',
        // events: {
        //   click: () => { 
        //     console.log('clicked') 
        //   }
        // }
      }
    }
  ],
  input: function(e){
    loginState[e.target.name] = e.target.value;
  },
  onfocus: function(e){
  	loginState[e.target.name] = e.target.value;
    validate(e.target.value, fieldName);
  },
  onblur: function(e){
    loginState[e.target.name] = e.target.value;
    validate(e.target.value, fieldName);
  },
  click: () => {
  	collectData(loginState);
  	for (let key: string in loginState) {
		validate(loginState[key], key);
	}
  }
 
}

export default LoginPage = new Login(LoginConfig);



