// src/actions/userManagement/getUserListActions.js
export const GET_USERLIST_REQUEST = "GET_USERLIST_REQUEST";
export const GET_USERLIST_SUCCESS = "GET_USERLIST_SUCCESS";
export const GET_USERLIST_FAILURE = "GET_USERLIST_FAILURE";
export const CLEAR_USERLIST = "CLEAR_USERLIST";

export const getUserListRequest = () => ({
  type: GET_USERLIST_REQUEST,
});

export const getUserListSuccess = (data) => ({
  type: GET_USERLIST_SUCCESS,
  payload: data,
});

export const getUserListFailure = (error) => ({
  type: GET_USERLIST_FAILURE,
  payload: error,
});

export const clearUserList = () => ({
  type: CLEAR_USERLIST,
});
