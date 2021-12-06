import { expect } from 'chai';
import Input from './index';

describe('Check input component creation', () => {
  it('Input creation test', () => {
    const checkInput = new Input({
      classname: 'test-class',
      attrubutes: {
        type: 'text',
        placeholder: 'Test input',
      },
      events: {
        focus: () => console.log('Push'),
      },
    });

    expect(checkInput).to.not.be.null;
    expect(checkInput).to.be.a('object');
  });
});
