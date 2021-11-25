// @ts-nocheck
import { nanoid } from 'nanoid/non-secure';
import EventBus from './event-bus.ts';


export default class Block<P = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update"
  };

  id = nanoid(6);

  _element = null;
  _meta = null;

  protected state: any = {};
  protected refs: {[key: string]: HTMLElement} = {};

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

    this.getStateFromProps(props);

    this.props = this._makePropsProxy(props);
    this.state = this._makePropsProxy(this.state);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    const classname = this._meta.props?.classname;
    const attributes = this._meta.props?.attributes;
    this._element = this._createDocumentElement(tagName, classname, attributes);
  }

  protected getStateFromProps(props: any): void {
    this.state = {};
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
    // this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount(props: P) {
    this.componentDidMount(props);
    // this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  }

	// Может переопределять пользователь, необязательно трогать
  componentDidMount(props: P) {}

  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

	// Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }

  setProps = nextProps => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    // this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  get element() {
    return this._element;
  }

  _render() {
    this._removeEvents();
    const fragment = this.render();
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

  // Может переопределять пользователь, необязательно трогать
  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    // if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {

      setTimeout(() => {
        // if (this.element?.parentNode?.nodeType !==  Node.DOCUMENT_FRAGMENT_NODE ) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        // }
      }, 100)
    // } 

    return this.element;
  }

  _makePropsProxy(props: any): any {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;
    // const prevProps = { ...props };
    
    const proxyProps = new Proxy(props, {
      get: (obj, prop) => {
        // if(prop?.startsWith('_')){     
        //   throw new Error('Нет прав');
        // }
        
        const value = obj[prop];
        return typeof value === 'function' ? value.bind(obj) : value;
      },
      set: (obj, prop, value) => {
        // if(typeof prop === 'string' && prop?.startsWith('_')){
        //   throw new Error('Нет прав');
        // }
        obj[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, {...obj}, obj);
        return true;
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

}
