import Block from '../../modules/block';

const compileTemplate = require('./message.pug');

export default class Message extends Block {
  constructor(props: object) {
    // dom-element button wrapper creation
    super('div', props);
  }

  render(): string {
    return compileTemplate({
      text: this.props.text,
      time: this.props.time,
    });
  }
}
