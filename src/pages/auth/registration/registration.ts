import Block from '../../../modules/block';
import compile from '../../../modules/compile';
import Form from '../../../blocks/auth-form/auth-form';
import Link from '../../../components/link/index';
import inputHandler from '../../../utils/form-inputs-handler';
import buttonHandler from '../../../utils/form-submit-handler';

import '../auth.css';
import '../../../components/button/button.css';
import '../../../components/input/input.css';
import '../../../components/form-field/form-field.css';

import AuthController from '../../../controllers/auth-controller';

const compileTemplate = require('./registration.pug');

interface regStateInt {
	email: null | string;
	password: null | string;
	first_name: null | string;
	second_name: null | string;
	phone: null | string;
	repassword: null | string;
}

// interface LinkInt {
// 	text: string;
// 	to: string;
// 	events: object;
// }

interface FormElementInt {
	inputEmail: Object < string > ;
	inputLogin: Object < string > ;
	inputName: Object < string > ;
	inputLastname: Object < string > ;
	inputPhone: Object < string > ;
	inputPassword: Object < string > ;
	inputRePassword: Object < string > ;
	button: Object < string > ;
	input: () => void;
	onfocus: () => void;
	onblur: () => void;
	click: () => void;
}

type FormElementsInt = Array < FormElementInt >

const regState: regStateInt = {
  email: null,
  password: null,
  first_name: null,
  second_name: null,
  phone: null,
  repassword: null,
};

const config: FormElementsInt = {
  formElements: [{
    inputEmail: {
      classname: 'input',
      attributes: {
        placeholder: 'Почта',
        type: 'email',
        name: 'email',
      },
    },
  }, {
    inputLogin: {
      classname: 'input',
      attributes: {
        placeholder: 'Логин',
        type: 'text',
        name: 'login',
      },
    },
  }, {
    inputName: {
      classname: 'input',
      attributes: {
        placeholder: 'Имя',
        type: 'text',
        name: 'first_name',
      },
    },
  }, {
    inputLastName: {
      classname: 'input',
      attributes: {
        placeholder: 'Фамилия',
        type: 'text',
        name: 'second_name',
      },
    },
  }, {
    inputPhone: {
      classname: 'input',
      attributes: {
        placeholder: 'Телефон',
        type: 'text',
        name: 'phone',
      },
    },
  }, {
    inputPassword: {
      classname: 'input',
      attributes: {
        placeholder: 'Пароль',
        type: 'password',
        name: 'password',
      },
    },
  }, {
    inputRePassword: {
      classname: 'input',
      attributes: {
        placeholder: 'Пароль (ещё раз)',
        type: 'password',
        name: 'repassword',
      },
    },
  }, {
    button: {
      text: 'Зарегистрироваться',
    },
  }],
  input(e: any) {
    regState[e.target.name] = e.target.value;
  },
  focus: (e: any) => inputHandler(e.target, regState),
  blur: (e: any) => inputHandler(e.target, regState),
  click: () => buttonHandler(regState),
};

export class Registration extends Block {
  constructor(props) {
    super('div', props);
  }

  protected getStateFromProps() {
    this.state = {
      onRegister: async (data: any) => {
        await AuthController.registration(data);
      },
    };
  }

  componentDidMount() {
    if (this.props.user.profile) {
      this.props.router.go('/messenger');
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
          const data = buttonHandler(regState);
          this.state.onRegister(data);
        },
      },
      inputEvent: {
        input: config.input,
        focus: config.focus,
        blur: config.blur,
      },
      linkEvent: {
        click: (e: any) => {
          e.preventDefault();
          window.location = e.target.getAttribute('to');
        },
      },
    };

    const regForm = new Form(content);

    const link = new Link({
      text: 'Войти',
      to: '/',
      events: content.linkEvent,
    });

    const fragment = compile(compileTemplate, {
      error: this.props.user?.error?.reason,
      form: regForm,
      link,
    });

    return fragment;
  }
}
