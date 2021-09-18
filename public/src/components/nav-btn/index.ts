import Block from '../../modules/block.ts';
import compileTemplate from './nav-btn.pug';

const pug = require('pug');

export default class NavButton extends Block {
  constructor(props: object) {
    super("div", { attr: props });
  }

  render(): string {
  	return compileTemplate({
      text: this.props.attr.type,
  		link: this.props.attr.link
  	});
  }
}
