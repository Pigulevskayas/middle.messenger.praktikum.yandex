import Block from '../../modules/block';
import compile from '../../modules/compile';
const compileTemplate  = require('./avatar.pug');

export default class Avatar extends Block {
  constructor(props: object) {
    super('div', props);
  }

  render(): string {
  	return compile(compileTemplate, {
      imgurl: this.props.imgurl,
      events: () => this.props.events.click()
  	});
  }

}
