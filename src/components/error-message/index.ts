import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import compileTemplate from './error-message.pug';

export default class ErrorMessage extends Block {
  constructor(props: object) {
    super("div", {attr: props});
  }

  render(): DocumentFragment {
  	return compile(compileTemplate, {
      text: this.props.text
    });
  }
}
