import { Action } from '../store/store.ts';
import { UserData } from '../api/auth-api.ts';

const SET_USER = 'user/SET';
const DELETE_USER = 'user/DELETE';
const SET_ERROR = 'user/SET_ERROR';

export const setUser = (user: UserData) => ({
  type: SET_USER,
  payload: user,
});

export const deleteUser = () => ({
  type: DELETE_USER,
});

export const setError = (error: { reason: string }) => ({
  type: SET_ERROR,
  payload: error,
});

export default (state = { profile: null, error: null, success: true }, action: Action) => {
  switch (action.type) {
    case SET_USER:
      return { error: null, profile: action.payload, success: true };
    case DELETE_USER:
      return { profile: null, error: null };
    case SET_ERROR:
      return { error: action.payload, profile: null, success: null };
    default:
      return state;
  }
}
