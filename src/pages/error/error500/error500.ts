import Block from '../../../modules/block';
import Link from '../../../components/link/index';
import compile from '../../../modules/compile';
import '../error.css';

const compileTemplate = require('../error.pug');

export default class Error500 extends Block {
	constructor(props?: object) {
		super('div', props);
	}

	render(): DocumentFragment {
		const link = new Link({
			text: 'Назад к чатам',
			to: '/messenger',
			events: {
				click: (e: any) => {
					e.preventDefault();
					window.location = e.target.getAttribute('to');
				},
			},
		});

		const errorPage500 = {
			code: '500',
			text: 'Мы уже фиксим',
			link,
		};

		const fragment = compile(compileTemplate, errorPage500);

		return fragment;
	}
}
