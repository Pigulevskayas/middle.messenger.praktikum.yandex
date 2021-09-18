import EventBus from './event-bus.ts';
import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import compileTemplate from './button.pug';

const pug = require('pug');

export default class Button extends Block {
  constructor(props: object) {
	// dom-element button wrapper creation
    super("div", props);
  }

  render(): string {
  	// let html = compileTemplate({
  	// 	text: this.props.text
  	// });

  	//return html;
		// return pug.render(html);

		// var fn = compileTemplate({
  // 		text: this.props.text
  // 	});
  // 	console.log('fn', fn)

  // 	return fn;

  	// return compileTemplate({
  	// 	text: this.props.text
  	// });

    return compile(compileTemplate, {
      text: this.props.text,
      click: () => this.props.events.click()
    });
  }
}

// function render(query, block) {
//   const root = document.querySelector(query);
//   root.appendChild(block.getContent());
// 	return root;
// }

// // const button = new Button({
// // 	text: 'Сохранить'
// // });

// // app — root div
// render(".app", button);

