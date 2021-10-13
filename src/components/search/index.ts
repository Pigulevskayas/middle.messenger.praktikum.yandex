import Block from '../../modules/block.ts';

export default class Search extends Block {
  constructor(props: {
    events: Record<string, (e?: Event) => void>;
    attrubutes: Record<string, string>;
    classname: Record<string, string>;
  }) {
    super('input', props);
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }
}