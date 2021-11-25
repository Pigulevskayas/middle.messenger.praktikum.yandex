import EventBus from './event-bus.ts';
import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import compileTemplate from './close-modal.pug';

export default class CloseModal extends Block {
  constructor(props: object) {
    super("span", props);
  }

  render(): string {
  	return compile(compileTemplate, {
      events: () => this.props.events.click()
  	});
  }
}
