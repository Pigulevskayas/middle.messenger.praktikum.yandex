import Block from '../../modules/block.ts';
import compileTemplate from './select-chat.pug';

const pug = require('pug');

export default class SelectChat extends Block {
  constructor(props: object) {
	// dom-element button wrapper creation
    super("div");
  }

  render(): string {
  	return compileTemplate();
  }
}