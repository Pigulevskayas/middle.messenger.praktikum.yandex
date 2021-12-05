import Block from '../../modules/block';

const compileTemplate = require('./chat-item.pug');

export default class ChatItem extends Block {
    constructor(props: object) {
        super('div', props);
    }

    render(): string {
        return compileTemplate({
            username: this.props.username,
            quote: this.props.quote,
            time: this.props.time,
            count: this.props.count,
        });
    }
}
