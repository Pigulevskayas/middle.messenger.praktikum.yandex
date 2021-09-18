import Block from '../../modules/block.ts';
import Message from '../../components/message/index.ts';
import compileTemplate from './chat-messages.pug';

const pug = require('pug');

interface MessageInt {
  text: string,
  time: string
}

export default class ChatMessages extends Block {
  constructor(props: object) {
	// dom-element button wrapper creation
    super("div", props);
  }

  render():string {
    const message: MessageInt = new Message({
      text: 'Круто!',
      time: '12:35'
    });

    // console.log('message', message)

  	return compileTemplate({
      message: message.render()
    });
  }
}