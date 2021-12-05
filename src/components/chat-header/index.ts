import Block from '../../modules/block';
import compile from '../../modules/compile';
import NavButton from '../nav-btn/index';

const compileTemplate = require('./chat-header.pug');

export default class ChatHeader extends Block {
    constructor(props?: object) {
        super('div', props);
    }

    render(): DocumentFragment {
        const toggler = new NavButton({
            type: 'toggler',
            events: {
                click: (e: any) => {
                    e.preventDefault();
                    const dropdown = document.querySelector('.dropdown__menu');
                    dropdown!.classList.toggle('dropdown__menu_show');
                },
            },
        });

        const fragment = compile(compileTemplate, {
            username: this.props.username,
            toggler,
            addUserLink: this.props.addUserLink,
            deleteUserLink: this.props.deleteUserLink,
            deleteChatLink: this.props.deleteChatLink,
        });

        return fragment;
    }
}
