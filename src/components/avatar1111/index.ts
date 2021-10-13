import EventBus from './event-bus.ts';
import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import compileTemplate from './avatar.pug';

export default class Avatar extends Block {
  constructor(props: object) {
    super("div", props);
  }

  render(): string {
    // console.log('props', props)
    return compile(compileTemplate, {
      imgurl: this.props.imgurl,
      events: () => this.props.events.click()
    });
  }
}

