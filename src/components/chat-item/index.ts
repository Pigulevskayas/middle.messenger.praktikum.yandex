import Block from '../../modules/block.ts';
import compileTemplate from './chat-item.pug';

export default class ChatItem extends Block {
  constructor(props: object) {
	// dom-element button wrapper creation
    super("div", props);
  }

  render(): string {
  	return compileTemplate({
      username: this.props.username,
      quote: this.props.quote,
      time: this.props.time,
      count: this.props.count
    });
  }
}