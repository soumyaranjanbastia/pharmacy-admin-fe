// Actions types
export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";
export const CREATE_USER_CLEAR = "CREATE_USER_CLEAR";

// Action creators
export const createUserRequest = (payload) => ({
  type: CREATE_USER_REQUEST,
  payload,
});

export const createUserSuccess = (data) => ({
  type: CREATE_USER_SUCCESS,
  payload: data,
});

export const createUserFailure = (error) => ({
  type: CREATE_USER_FAILURE,
  payload: error,
});

export const clearCreateUser = () => ({
  type: CREATE_USER_CLEAR,
});
