import EventBus from '../modules/event-bus';

export interface Action {
  type: string;
  payload?: any;
}

type Reducer<S = any> = (state: S, action: Action) => S;

type Indexed = {[key: string]: any};

export class Store extends EventBus {
  private state: Indexed = {};
  private reducer: Reducer;

  constructor(reducers: Indexed) {
    super();

    this.reducer = this.combineReducers(reducers);

    this.dispatch({ type: '@@INIT' });
  }

  public dispatch(action: Action) {
    console.log('action', action)
    this.state = this.reducer(this.state, action);
    console.log('this.state', this.state)

    this.emit('changed');
    console.log('where is change')
  }

  public getState() {
    return this.state;
  }

  private combineReducers(reducers: Indexed): Reducer {
    return (state: any, action: Action) => {
    // return (action: Action) => {
      const newState: Indexed = {};

      Object.entries(reducers).forEach(([key, reducer]) => {
        newState[key] = reducer(this.state[key], action);
      });

      return newState;
    }
  }
}

