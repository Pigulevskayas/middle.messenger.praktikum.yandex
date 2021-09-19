import Block from '../../../modules/block.ts';
import compileTemplate from '../temporary.pug';

const pug = require('pug');

interface ErrorInt {
	code: string,
	text: string
}

class Temporary extends Block {
  constructor(props: object) {
	// dom-element button wrapper creation
    super("div", props);
  }

  render(): string {
  	const html = compileTemplate();

		return pug.render(html);
  }
}

export default TemporaryPage = new Temporary();






