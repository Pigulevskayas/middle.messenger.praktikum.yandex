import Block from '../../../modules/block.ts';
import compileTemplate from '../error.pug';
import compile from '../../../modules/compile.ts';
import '../error.css';

interface ErrorInt {
	code: string,
	text: string
}

class Error404 extends Block {
  constructor(props: object) {
	// dom-element button wrapper creation
    super("div", props);
  }

  render(): DocumentFragment {
  	const errorPage404: ErrorInt = {
			code: '404',
			text: 'Не туда попали',
			link: '/chats'
		};

		const fragment = compile(compileTemplate, errorPage404);
		return fragment;

  // 	const html = compileTemplate(errorPage404);
		// return pug.render(html);
  }
}

export default new Error404();








