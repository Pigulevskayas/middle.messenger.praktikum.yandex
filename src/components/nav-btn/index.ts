import EventBus from './event-bus.ts';
import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import compileTemplate from './nav-btn.pug';

export default class NavButton extends Block {
  constructor(props: object) {
    super("div", props);
  }

  render(): string {
    // console.log('props', props)
  	return compile(compileTemplate, {
      type: this.props.type,
  		to: this.props.to,
      events: () => this.props.events.click()
  	});
  }
}
