import Block from '../../modules/block.ts';
import compileTemplate from './search.pug';

// const pug = require('pug');

export default class Search extends Block {
  constructor(props: object) {
    super("div", props);
  }

  render(): string {
  	return compileTemplate();
  }
}