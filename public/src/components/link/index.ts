import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import compileTemplate from './link.pug';

export default class Link extends Block {
  constructor(props: object) {
	// dom-element button wrapper creation
    super("div", {attr: props});
  }

  render(): DocumentFragment {
  	// return compileTemplate({
   //    text: this.props.attr.type,
  	// 	link: this.props.attr.link
  	// });
    
    return compile(compileTemplate, {
      text: this.props.attr.text,
      link: this.props.attr.link
    });
  }
}
