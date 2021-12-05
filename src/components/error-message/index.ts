import Block from '../../modules/block';
import compile from '../../modules/compile';

const compileTemplate = require('./error-message.pug');

export default class ErrorMessage extends Block {
    constructor(props: object) {
        super('div', { attr: props });
    }

    render(): DocumentFragment {
        return compile(compileTemplate, {
            text: this.props.text,
        });
    }
}
