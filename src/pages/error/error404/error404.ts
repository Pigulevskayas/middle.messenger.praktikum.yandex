import Block from '../../../modules/block.ts';
import compileTemplate from '../error.pug';
import Link from '../../../components/link/index.ts';
import compile from '../../../modules/compile.ts';
import '../error.css';

interface ErrorInt {
	code: string,
	text: string
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
        click: (e) => {
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
