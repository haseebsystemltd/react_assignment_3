import {actionTypes} from './actionTypes';

export const addSelectCoin = (coin) => ({
  type: actionTypes.Add_SELECT_COIN,
  payload: { coin },
});

export const transferCoin = (transferDetail) => ({
  type: actionTypes.TRANSFER_COIN,
  payload: { transferDetail },
});

export const registerUser = (user) => ({
  type: actionTypes.REGISTER_USER,
  payload: { user },
});

export const loginUser = (user) => ({
  type: actionTypes.LOGIN_USER,
  payload: { user },
});

export const logoutUser = () => ({
  type: actionTypes.LOGOUT_USER,
  payload: {  },
});