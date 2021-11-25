import user from './user.ts';
import chats from './chats.ts';
import messages from './messages.ts';
import Store from '../utils/store.ts';
import Block from '../modules/Block.ts';

export const store = new Store({
  user,
  chats,
  messages
});

export function connect(stateToProps: (state: any) => any, Component: typeof Block) {
  return class WithStore extends Component {
    constructor(props: any) {
      super({...props, ...stateToProps(store.getState())});
    }

    componentDidMount(props: any) {
      super.componentDidMount(props);
      store.on('changed', () => {
        this.setProps({
          ...this.props,
          ...stateToProps(store.getState())
        });
      });
    }
  };
}
