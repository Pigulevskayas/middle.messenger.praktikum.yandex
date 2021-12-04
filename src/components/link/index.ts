import Block from '../../modules/block';
import compile from '../../modules/compile';
const compileTemplate  = require('./link.pug');

export default class Link extends Block {
  constructor(props: object) {
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

