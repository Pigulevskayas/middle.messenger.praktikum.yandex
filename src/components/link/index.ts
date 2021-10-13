import EventBus from './event-bus.ts';
import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import compileTemplate from './link.pug';

export default class Link extends Block {
  constructor(props: object) {
  // dom-element button wrapper creation
    super("span", props);
  }

  render(): DocumentFragment {
    
    return compile(compileTemplate, {
      text: this.props.text,
      to: this.props.to,
      events: () => this.props.events.click()
    });
  }
}

