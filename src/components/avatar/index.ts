import EventBus from './event-bus.ts';
import Block from '../../modules/block.ts';
import compile from '../../modules/compile.ts';
import compileTemplate from './avatar.pug';

export default class Avatar extends Block {
  constructor(props: object) {
    super("div", props);
  }

  render(): string {
  	return compile(compileTemplate, {
      imgurl: this.props.imgurl,
      events: () => this.props.events.click()
  	});
  }

  // constructor(props: {
  //   events: Record<string, (e?: Event) => void>;
  //   attributes: Record<string, string>;
  //   classname: Record<string, string>;
  // }) {
  //   super("img", props);
  // }

  // render(): DocumentFragment {
  //   console.log('DocumentFragment', this.props)
  //   return new DocumentFragment();
  // }

}
