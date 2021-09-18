import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import compileTemplate from './input.pug';

const pug = require('pug');

export default class Input extends Block {
  constructor(props: object) {
	// dom-element button wrapper creation
    super("div", props);
  }

  render(): string {
  	// return compileTemplate({
  	// 	type: this.props.type,
  	// 	name: this.props.name,
  	// 	label: this.props.label,
  	// 	value: this.props.value,
			// readonly: this.props.readonly
  	// });

    return compile(compileTemplate, {
      type: this.props.type,
      name: this.props.name,
      label: this.props.label,
      value: this.props.value,
      readonly: this.props.readonly,
      input: () => this.props.events.input()
    });
  }
}
