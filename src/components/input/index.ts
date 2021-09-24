import Block from '../../modules/block.ts';
// import compile from '../../modules/compile.ts';
// import compileTemplate from './input.pug';

export default class Input extends Block {
 //  constructor(props: object) {
	// // dom-element button wrapper creation
 //    super("div", props);
 //  }

  // render(): string {
  // 	return compile(compileTemplate, {
  //     type: this.props.type,
  //     name: this.props.name,
  //     label: this.props.label,
  //     value: this.props.value,
  //     readonly: this.props.readonly,
  //     input: () => this.props.events.input()
  //   });
  // }

  constructor(props: {
    events: Record<string, (e?: Event) => void>;
    attrubutes: Record<string, string>;
    classname: Record<string, string>;
  }) {
    super('input', props);
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }
}
