import Block from '../../../modules/block';
const compileTemplate  = require('../error.pug');
import Link from '../../../components/link/index';
import compile from '../../../modules/compile';
import '../error.css';

interface ErrorInt {
	code: string;
	text: string;
}

export default class Error404 extends Block {
  constructor(props: object) {
	// dom-element button wrapper creation
    super("div", props);
  }

  render(): DocumentFragment {
  	const link: LinkInt = new Link({
			text: 'Назад к чатам',
      to: '/messenger',
      events: {
        click: (e: any) => {
          e.preventDefault();
          window.location = e.target.getAttribute('to')
        },
      }
		});

  	const errorPage404: ErrorInt = {
			code: '404',
			text: 'Не туда попали',
			link: link
		};

		const fragment = compile(compileTemplate, errorPage404);
		return fragment;

  // 	const html = compileTemplate(errorPage404);
		// return pug.render(html);
  }
}
