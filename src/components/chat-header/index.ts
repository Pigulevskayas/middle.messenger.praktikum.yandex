import Block from '../../modules/block';
import compile from '../../modules/compile';
const compileTemplate  = require('./chat-header.pug');
import NavButton from '../../components/nav-btn/index';

export default class ChatHeader extends Block {
  constructor(props: object) {
	// dom-element button wrapper creation
    super("div", props);
  }

  render(): DocumentFragment {
    const toggler: NavButtonInt = new NavButton({
      type: 'toggler',
      events: {
        click: (e: any) => {
          e.preventDefault();
          const dropdown = document.querySelector('.dropdown__menu');
          dropdown.classList.toggle('dropdown__menu_show');
        },
      }
    });

  	const fragment = compile(compileTemplate,{
      username: this.props.username,
      toggler: toggler,
      addUserLink: this.props.addUserLink,
      deleteUserLink: this.props.deleteUserLink,
      deleteChatLink: this.props.deleteChatLink
    });

    return fragment;
  }
}