import Block from '../../../modules/block';
const compileTemplate  = require('../error.pug');
import Link from '../../../components/link/index';
import compile from '../../../modules/compile';
import '../error.css';

export default class Error404 extends Block {
  constructor(props?: object) {
	// dom-element button wrapper creation
    super("div", props);
  }

  render(): DocumentFragment {
  	const link = new Link({
			text: 'Назад к чатам',
      to: '/messenger',
      events: {
        click: (e: any) => {
          e.preventDefault();
          window.location = e.target.getAttribute('to')
        },
      }
		});

  	const errorPage404 = {
			code: '404',
			text: 'Не туда попали',
			link: link
		};

		const fragment = compile(compileTemplate, errorPage404);
		return fragment;
  }
}
