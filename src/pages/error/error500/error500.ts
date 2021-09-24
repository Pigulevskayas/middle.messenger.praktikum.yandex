import Block from '../../../modules/block.ts';
import compileTemplate from '../error.pug';
import compile from '../../../modules/compile.ts';
import '../error.css';

interface ErrorInt {
	code: string,
	text: string
}

class Error500 extends Block {
  constructor(props: object) {
	// dom-element button wrapper creation
    super("div", props);
  }

  render(): string {
		const errorPage500: ErrorInt = {
			code: '500',
			text: 'Мы уже фиксим',
			link: '/chats'
		};

  	const fragment = compile(compileTemplate, errorPage500);

		return fragment;
  }
}


export default new Error500();





