import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import compileTemplate from './link.pug';

export default class Link extends Block {
  constructor(props: object) {
	// dom-element button wrapper creation
    super("div", {attr: props});
  }

  render(): DocumentFragment {
  	return compile(compileTemplate, {
      text: this.props.attr.text,
      link: this.props.attr.link
    });
  }
}
