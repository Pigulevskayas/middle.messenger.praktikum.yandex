import { Action } from '../store/store.ts';
// import { UserData } from '../api/auth-api.ts';

const SET_CHATS = 'chats/SET';
// const DELETE_USER = 'user/DELETE';
const SET_ERROR = 'chats/SET_ERROR';

export const setChats = (chat) => ({
  type: SET_CHATS,
  payload: chat,
});

// export const deleteUser = () => ({
//   type: DELETE_USER,
// });

export const setError = (error: { reason: string }) => ({
  type: SET_ERROR,
  payload: error,
});

export default (state = { chats: null, error: null, success: true }, action: Action) => {
  switch (action.type) {
    case SET_CHATS:
      return { error: null, chats: action.payload, success: true };
    case SET_ERROR:
      return { error: action.payload, chats: null, success: null };
    default:
      return state;
  }
}
