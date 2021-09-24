import Block from '../../../modules/block.ts';
import compile from '../../../modules/compile.ts';
import Form from '../../../blocks/auth-form/auth-form.ts';
import Link from '../../../components/link/index.ts';
import compileTemplate from './registration.pug';
import validate from '../../../modules/validate.ts';
import collectData from '../../../modules/collect-data.ts';

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

// const formElements: FormElementsInt = 
// 	[{
// 		inputEmail: {
// 			label: "Почта", 
// 			type: "email", 
// 			name: "email"
// 		}
// 	}, {
// 		inputLogin: {
// 			label: "Логин", 
// 			type: "text", 
// 			name: "login"
// 		}
// 	}, {
// 		inputName: {
// 			label: "Имя", 
// 			type: "text", 
// 			name: "first_name"
// 		}
// 	}, {
// 		inputLastname: {
// 			label: "Фамилия", 
// 			type: "text", 
// 			name: "second_name"
// 		}
// 	}, {
// 		inputPhone: {
// 			label: "Телефон", 
// 			type: "text", 
// 			name: "phone"
// 		}
// 	}, {
// 		inputPassword: {
// 			label: "Пароль", 
// 			type: "password", 
// 			name: "password"
// 		}
// 	}, {
// 		inputRePassword: {
// 			label:"Пароль (ещё раз)", 
// 			type: "password", 
// 			name: "password"
// 		}
// 	},{
// 		button: {
// 			text: 'Зарегистрироваться',
// 			events: ()	=> console.log('clicked')
// 		}
// 	}
// ];

class Regisatration extends Block {
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

		const regForm = new Form(content);

		const link: LinkInt = new Link({
			text: 'Войти', 
			link: "/login"
		});

		const fragment = compile(compileTemplate,{
			form: regForm,
			link: link
		});

		return fragment;

		// let html = compileTemplate({
		// 	form: regForm.render(),
		// 	link: link.render()
		// });

		// return pug.render(html);
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

const RegConfig: FormElementsInt = {
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
  	focus: function(e){
	  	regState[e.target.name] = e.target.value;
	    validate(e.target.value, fieldName);
		},
		blur: function(e){
	    regState[e.target.name] = e.target.value;
	    validate(e.target.value, fieldName);
		},
  	click: () => {
	  	collectData(regState);
	  	for (let key: string in regState) {
			validate(regState[key], key);
		}
	}
 
}

export default new Regisatration(RegConfig);
