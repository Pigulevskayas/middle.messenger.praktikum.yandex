import Block from './block';

export default function compile(tmpl: (ctx: Record<string, any>) => string, props: Record<string, any>): DocumentFragment {
  const fragment = document.createElement('template');
  const components: Record<string, Block> = {};

  Object.entries(props).forEach(([name, value]) => {
    // @ts-ignore
    if (value instanceof Block) {
      components[value.id] = value;

      props[name]	= `<div id="id-${value.id}"></div>`;
    }
  });

  fragment.innerHTML = tmpl(props);

  Object.entries(components).forEach(([id, component]) => {
    const stub = fragment.content.querySelector(`#id-${id}`);

    if (!stub) {
      return;
    }

    stub.replaceWith(component.getContent());
  });

  return fragment.content;
}
