import Block from '../../../modules/block.ts';
import compileTemplate from '../temporary.pug';
import compile from '../../../modules/compile.ts';

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
  	const fragment = compile(compileTemplate, {});

		return fragment;
  // 	const html = compileTemplate();

		// return pug.render(html);
  }
}

export default new Temporary();






