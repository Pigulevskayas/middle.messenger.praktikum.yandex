import Block from '../../modules/block';
import compile from '../../modules/compile';
const compileTemplate  = require('./close-modal.pug');

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
