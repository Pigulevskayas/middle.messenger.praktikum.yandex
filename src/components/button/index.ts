import Block from '../../modules/block';
import compile from '../../modules/compile';

const compileTemplate = require('./button.pug');

export default class Button extends Block {
    constructor(props: {
        text: string;
        events: Record<string, (e?: Event) => void>;
    }) {
        super('div', props);
    }

    render(): DocumentFragment {
      	return compile(compileTemplate, {
            text: this.props.text,
            click: () => this.props.events.click(),
        });
    }
}
