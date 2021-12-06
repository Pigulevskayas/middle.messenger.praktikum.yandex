// @ts-ignore
import Block from '../../modules/block';
import compile from '../../modules/compile';
import Input from '../../components/input/index';
import Button from '../../components/button/index';

const compileTemplate = require('./auth-form.pug');

// interface FormElementInt {
//   inputLogin: Object<string>;
//   inputPassword: Object<string>;
//   button: object;
//   input: () => void;
//   focus: () => void;
//   blur: () => void;
//   click: () => void;
// }

export default class Form extends Block {
  constructor(props?: object) {
    super('div', { content: props });
  }

  render(): DocumentFragment {
    const renderFields: any = {};
    const formItems = this.props?.content;

    formItems.formElements.map((element: object) => {
      let key: string;
      for (key in element) {
        if (key == 'button') {
          const component = new Button({
            text: element[key].text,
            events: formItems.buttonEvent,
          });
          renderFields[key] = component;
        } else {
          const component = new Input({
            classname: element[key].classname,
            attributes: element[key].attributes,
            events: formItems.inputEvent,
          });
          renderFields[key] = component;
        }
      }
    });

    return compile(compileTemplate, renderFields);
  }
}
