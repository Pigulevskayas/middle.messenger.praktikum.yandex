import Block from '../../modules/block';
import compile from '../../modules/compile';

const compileTemplate = require('./dropdown-link.pug');

export default class DropdownLink extends Block {
    constructor(props: object) {
        super('span', props);
    }

    render(): DocumentFragment {
        return compile(compileTemplate, {
            type: this.props.type,
            text: this.props.text,
            events: () => this.props.events.click(),
      });
    }
}
