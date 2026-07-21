export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";
export const CLEAR_DELETE_USER = "CLEAR_DELETE_USER";

export const deleteUserRequest = (payload) => ({
  type: DELETE_USER_REQUEST,
  payload, // { branchUserId }
});

export const deleteUserSuccess = (data) => ({
  type: DELETE_USER_SUCCESS,
  payload: data,
});

export const deleteUserFailure = (error) => ({
  type: DELETE_USER_FAILURE,
  payload: error,
});

export const clearDeleteUser = () => ({
  type: CLEAR_DELETE_USER,
});
