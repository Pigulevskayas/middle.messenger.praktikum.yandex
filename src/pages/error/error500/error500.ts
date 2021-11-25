import Block from '../../../modules/block.ts';
import compileTemplate from '../error.pug';
import Link from '../../../components/link/index.ts';
import compile from '../../../modules/compile.ts';
import '../error.css';

interface ErrorInt {
	code: string,
	text: string
}

export default class Error500 extends Block {
  constructor(props: object) {
    super("div", props);
  }

  render(): string {
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
		
		const errorPage500: ErrorInt = {
			code: '500',
			text: 'Мы уже фиксим',
			link: link
		};

  	const fragment = compile(compileTemplate, errorPage500);

		return fragment;
  }
}
