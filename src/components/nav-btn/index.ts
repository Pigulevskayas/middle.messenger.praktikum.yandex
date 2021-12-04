import Block from '../../modules/block';
import compile from '../../modules/compile';
const compileTemplate  = require('./nav-btn.pug');

export default class NavButton extends Block {
  constructor(props: {
    type: string;
    to?: string;
    events: Record<string, (e?: Event) => void>;
  }) {
    super("div", props);
  }

  render(): DocumentFragment {
  	return compile(compileTemplate, {
      type: this.props.type,
  		to: this.props.to,
      events: () => this.props.events.click()
  	});
  }
}
