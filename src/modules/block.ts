import { nanoid } from 'nanoid/non-secure';
import EventBus from './event-bus.ts';


export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update"
  };

  id = nanoid(6);

  _element = null;
  _meta = null;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    const classname = this._meta.props?.classname;
    const attributes = this._meta.props?.attributes;
    this._element = this._createDocumentElement(tagName, classname, attributes);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    // console.log('_componentDidMount')
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

	// Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps) {}

  _componentDidUpdate(oldProps, newProps) {
    // console.log('_componentDidUpdate')
    const response = this.componentDidUpdate(oldProps, newProps);
    if(response){
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
      //this.eventBus().emit('Block.EVENTS.FLOW_CDU');
    }
  }

	// Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = nextProps => {
    // console.log(nextProps)
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  get element() {
    return this._element;
  }

  _render() {
    this._removeEvents();
    const fragment = this.render();
    // console.log('fragment', fragment)
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    // this._element.innerHTML = block;
    if(typeof fragment === 'string'){
      this._element.innerHTML = fragment;
    } else {
      this._element.innerHTML = '';
      this._element.appendChild(fragment);
      this._addEvents();
    }
  }

  _removeEvents(): void {
    if (!this.element) return;

    const {events = {}} = this.props;

    for (const [event, listener] of Object.entries(
      events as Record<string, EventListener>
    )) {
      this.element.removeEventListener(event, listener);
    }
  }

  _addEvents(): void {
    if (!this.element) {
      throw new Error('No element');
    }

    const {events = {}} = this.props;

    for (const [event, listener] of Object.entries(
      events as Record<string, EventListener>
    )) {
      this.element.addEventListener(event, listener);
    }
  }

	// Может переопределять пользователь, необязательно трогать
  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;
    
    const proxyProps = new Proxy(props, {
      get: (obj, prop) => {
        if(prop.startsWith('_')){     
          throw new Error('Нет прав');
        }
        
        const value = obj[prop];
        return typeof value === 'function' ? value.bind(obj) : value;
      },
      set: (obj, prop, value) => {
        if(typeof prop === 'string' && prop.startsWith('_')){
          throw new Error('Нет прав');
        }
        obj[prop] = value;
        return obj;
      },
      deleteProperty: (obj, prop) => {
        throw new Error('Нет доступа');
      }
    });

    return proxyProps;

  }

  _createDocumentElement(tagName, classname = undefined, attributes = undefined) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const resultElement = document.createElement(tagName);
    
    if (classname) {
      resultElement.classList.add(classname);
    }

    for (let key: string in attributes) {
      resultElement.setAttribute(key, attributes[key]);
      if(key === 'value') {
        resultElement.value = attributes.value;
      }
    }

    return resultElement;
  }

}
