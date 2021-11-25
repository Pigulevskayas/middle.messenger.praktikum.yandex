import EventBus from './event-bus.ts';
import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import compileTemplate from './dropdown-link.pug';

export default class DropdownLink extends Block {
  constructor(props: object) {
    super("span", props);
  }

  render(): DocumentFragment {
  	return compile(compileTemplate, {
      type: this.props.type,
  		text: this.props.text,
      events: () => this.props.events.click()
  	});
  }
}
