import Block from '../../modules/block';

export default class Input extends Block {
  constructor(props: {
    events: Record<string, (e?: Event) => void>;
    attrubutes: Record<string, any>;
    classname: string;
  }) {
    super('input', props);
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }
}
