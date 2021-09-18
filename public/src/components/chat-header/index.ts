import Block from '../../modules/block.ts';
import compileTemplate from './chat-header.pug';

const pug = require('pug');

export default class ChatHeader extends Block {
  constructor(props: object) {
	// dom-element button wrapper creation
    super("div", props);
  }

  render(): string {
  	return compileTemplate({
      username: 'Вася'
    });
  }
}