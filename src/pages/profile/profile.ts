import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import Form from '../../blocks/profile_form/profile_form.ts';
import NavButton from '../../components/nav-btn/index.ts';
import Modal from '../../blocks/modal-avatar/index.ts';
import Avatar from '../../components/avatar/index.ts';
import compileTemplate from './profile.pug';
import inputHandler from '../../utils/form-inputs-handler.ts';
import buttonHandler from '../../utils/form-submit-handler.ts';

import '../../components/nav/nav.css';
import '../../components/nav-btn/nav-btn.css';
import '../../components/user-info/user-info.css';
import '../../pages/profile/profile.css';
import '../../blocks/modal-avatar/modal-avatar.css';
import '../../components/form-field/form-field.css';

import AuthController from '../../controllers/auth-controller.ts';
import ProfileController from '../../controllers/profile-controller.ts';


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

const profileValues = {
  email: null,
  login: null,
  first_name: null,
  second_name: null,
  display_name: null,
  password: null,
  phone: null,
}




export default class Profile extends Block {
	constructor(props) {
	  super('div', props);
	}

	protected getStateFromProps() {
    this.state = {
    	onProfile: async (data) => {
        await ProfileController.profile(data);
      },
      onLogout: async (data) => {
        await AuthController.logout();
      },
      onPassword: async (data) => {
        await ProfileController.password(data);
      }
      
    }
  }

  editUserForm = () => {
  	let inputs = document.querySelectorAll('.user-info_data .input');
    inputs.forEach((input) => {
    	input.removeAttribute('disabled');
    });

    let nav = document.querySelector('.profile__links');
    nav.classList.add('profile__links_hidden');

    let closeNav = document.querySelector('.profile__close');
  	closeNav.style.display = 'block';

    let submit = document.querySelector('.profile__submit');
    submit.classList.remove('profile__submit_hidden');
  }

  editPasswordForm = () => {
  	let nav = document.querySelector('.profile__links');
    nav.classList.add('profile__links_hidden');

  	let dataForm = document.querySelector('.user-info_data');
  	dataForm.classList.add('user-info_hidden');

  	let closeNav = document.querySelector('.profile__close');
  	closeNav.style.display = 'block';

  	let passwordForm = document.querySelector('.user-info_password');
  	passwordForm.classList.remove('user-info_hidden');
  }

  closeEdit = ()	=> {
  	let inputs = document.querySelectorAll('.user-info_data .input');
    inputs.forEach((input) => {
    	input.setAttribute('disabled', 'disabled');
    });

    let nav = document.querySelector('.profile__links');
    nav.classList.remove('profile__links_hidden');

    let closeNav = document.querySelector('.profile__close');
  	closeNav.style.display = 'none';

  	let submit = document.querySelector('.profile__submit');
    submit.classList.add('profile__submit_hidden');

    let editPassword = document.querySelector('.user-info_password');
  	if(!editPassword.classList.contains('user-info_hidden')){
  		editPassword.classList.add('user-info_hidden');

  		let editProfile = document.querySelector('.user-info_data');
  		editProfile.classList.remove('user-info_hidden');
    }
  }

  showModal = ()	=> {
  	let modal = document.querySelector('.modal');
  	modal.classList.add('modal_show');
  }

  componentDidMount() {
    console.log('componentDidMount profile', this.props.user);
    if (this.props.user) {
    	let inputs = document.querySelectorAll('.user-info_data .input');
    	inputs.forEach((input) => {
    		input.setAttribute('disabled', 'disabled');
    	});

    	let userObj = this.props.user;
      profileValues.email = userObj.email;
      profileValues.first_name = userObj.first_name;
      profileValues.second_name = userObj.second_name;
      profileValues.display_name = userObj.display_name;
      profileValues.login = userObj.login;
      profileValues.phone = userObj.phone;

      
      setTimeout(function(){
      	// const img = document.querySelector('.test-avatar');
      	const cont = document.querySelector('.profile__top');
      	console.log('aaaa', cont)
      	// cont.append(img);
      }, 3000)
    }
    // console.log('profileValues', profileValues)
  }

	render(): DocumentFragment {
		const config = {
		  formElements: [{
					email: {
						classname: 'input',
		      	attributes: {
							placeholder: "Почта", 
							type: "email", 
							name: "email", 
							value: this.props.user.email
						}
					}
				}, {
					login: {
						classname: 'input',
			      attributes: {
							placeholder: "Логин", 
							type: "text", 
							name: "login", 
							value: this.props.user.login
						}
					} 
				}, {
					first_name: {
						classname: 'input',
			      attributes: {
							placeholder: "Имя", 
							type: "text", 
							name: "first_name", 
							value: this.props.user.first_name
						}
					}
				}, {
					second_name: {
						classname: 'input',
			      attributes: {
							placeholder: "Фамилия", 
							type: "text", 
							name: "second_name", 
							value: this.props.user.second_name
						}
					}
				}, {
					display_name: {
						classname: 'input',
			      attributes: {
							placeholder: "Имя в чате", 
							type: "text", 
							name: "display_name", 
							value: this.props.user.display_name ? this.props.user.display_name : ''
						}
					}
				}, {
					phone: {
						classname: 'input',
			      attributes: {
							placeholder: "Телефон", 
							type: "text", 
							name: "phone", 
							value: this.props.user.phone
						}
					}
				}, {
					button: {
						text: 'Сохранить'
					}
				}
			],
			input: function(e){
				profileValues[e.target.name] = e.target.value;
			},
			focus: (e) => inputHandler(e.target, profileValues),
			blur: (e) => inputHandler(e.target, profileValues)
		}

		const configPassword = {
		  formElements: [{
					email: {
						classname: 'input',
		      	attributes: {
							placeholder: "Старый пароль", 
							type: "password", 
							name: "oldPassword", 
							value: ""
						}
					}
				}, {
					login: {
						classname: 'input',
			      attributes: {
							placeholder: "Новый пароль", 
							type: "password", 
							name: "newPassword", 
							value: ""
						}
					} 
				}, {
					first_name: {
						classname: 'input',
			      attributes: {
							placeholder: "Повторите новый пароль", 
							type: "password", 
							name: "repeatNewPassword", 
							value: ""
						}
					}
				}, {
					button: {
						text: 'Сохранить'
					}
				}
			],
			input: function(e){
				profileValues[e.target.name] = e.target.value;
			},
			focus: (e) => inputHandler(e.target, profileValues),
			blur: (e) => inputHandler(e.target, profileValues)
		}

		const content = {
			formElements: config.formElements, 
			buttonEvent: {
				click: () => {
          let data = buttonHandler(profileValues);
          console.log('click data', data)
          this.state.onProfile(data);
        }
			},
			inputEvent: {
				input: config.input,
				focus: config.focus,
        blur: config.blur
			}
		}

		const contentPassword = {
			formElements: configPassword.formElements,
		  buttonEvent: {
				click: () => {
          let data = buttonHandler(profileValues);
          console.log('click data', data)
          this.state.onPassword(data);
        }
			},
			inputEvent: {
				input: configPassword.input,
				focus: configPassword.focus,
        blur: configPassword.blur
			}
		}

		// Userdata form
		const profileForm = new Form(content);

		// Password change form
		const passwordForm = new Form(contentPassword);

		const btnBack: NavButtonInt = new NavButton({
			type: 'back', 
			to: "/messenger",
			events: {
        click: (e) => {
          e.preventDefault();
          window.location = e.target.getAttribute('to')
        },
      }
		});

		const btnExit: NavButtonInt = new NavButton({
			type: 'exit', 
			events: {
        click: (e) => {
        	e.preventDefault();
			    this.state.onLogout();
        },
      }
		});

		const btnEdit: NavButtonInt = new NavButton({
			type: 'edit',
			events: {
				click: (e)	=> {
					e.preventDefault();
					this.editUserForm();
				}
			}
		});

		const btnClose: NavButtonInt = new NavButton({
			type: 'close',
			events: {
				click: (e)	=> {
					e.preventDefault();
					this.closeEdit();
				}
			}
		});

		const passwordEdit: NavButtonInt = new NavButton({
			type: 'password',
			events: {
				click: (e)	=> {
					e.preventDefault();
					this.editPasswordForm();
				}
			}
		});

		const modal: ModalInt = new Modal({
			isVisible: false, 
			isError: false 
		});

		const avatar = new Avatar({
			imgurl: this.props.user.avatar ? this.props.user.avatar : null,
			// attributes: {
			// 	src: this.props.user.avatar ? `https://ya-praktikum.tech/api/v2/resources${this.props.user.avatar}` : "test.png",
			// 	crossorigin: "use-credentials"
			// },
			// classname: 'avatar',
			events: {
				click: (e)	=> {
					this.showModal();
				}
			}
		});

		const fragment = compile(compileTemplate,{
			avatar: avatar,
			name: this.props.user.first_name,
			userform: profileForm,
			back: btnBack,
			exit: btnExit,
			edit: btnEdit,
			close: btnClose,
			password: passwordEdit,
			passwordform: passwordForm,
			modal: modal
		});

		return fragment;
	}

}

// export default new Profile(config);
