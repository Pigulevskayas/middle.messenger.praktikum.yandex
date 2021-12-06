import Block from '../../modules/block';

const compileTemplate = require('./select-chat.pug');

export default class SelectChat extends Block {
    constructor() {
        super('div');
    }

    render(): string {
        return compileTemplate();
    }
}
