import { Action } from '../store/store.ts';
// import { UserData } from '../api/auth-api.ts';

const SET_ERROR = 'chats/SET_ERROR';
const SET_MESSAGES = 'chats/SET_MESSAGES';

export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});

export const setError = (error: { reason: string }) => ({
  type: SET_ERROR,
  payload: error,
});

export default (state = { messages: null, error: null, success: true }, action: Action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return { error: null, messages: action.payload, success: true };
    case SET_ERROR:
      return { error: action.payload, messages: null, success: null };
    default:
      return state;
  }
}
