import Block from '../../modules/block';
const compileTemplate  = require('./select-chat.pug');

export default class SelectChat extends Block {
  constructor() {
	// dom-element button wrapper creation
    super("div");
  }

  render(): string {
  	return compileTemplate();
  }
}