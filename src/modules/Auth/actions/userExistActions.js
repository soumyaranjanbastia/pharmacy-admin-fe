// Action Types
export const USER_EXIST_REQUEST = "USER_EXIST_REQUEST";
export const USER_EXIST_SUCCESS = "USER_EXIST_SUCCESS";
export const USER_EXIST_FAILURE = "USER_EXIST_FAILURE";
export const USER_EXIST_CLEAR = "USER_EXIST_CLEAR";

// Action Creators
export const userExistRequest = (payload) => {
  console.log("📤 Dispatching USER_EXIST_REQUEST with payload:", payload);
  return {
    type: USER_EXIST_REQUEST,
    payload,
  };
};

export const userExistSuccess = (data) => ({
  type: USER_EXIST_SUCCESS,
  payload: data,
});

export const userExistFailure = (error) => ({
  type: USER_EXIST_FAILURE,
  payload: error,
});

export const userExistClear = () => ({
  type: USER_EXIST_CLEAR,
});
