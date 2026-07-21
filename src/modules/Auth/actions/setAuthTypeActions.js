// Action Types
export const SET_AUTH_TYPE_REQUEST = "SET_AUTH_TYPE_REQUEST";
export const SET_AUTH_TYPE_SUCCESS = "SET_AUTH_TYPE_SUCCESS";
export const SET_AUTH_TYPE_FAILURE = "SET_AUTH_TYPE_FAILURE";

// Action Creators
export const setAuthTypeRequest = (payload) => {
  console.log("📤 Dispatching SET_AUTH_TYPE_REQUEST with payload:", payload);
  return {
    type: SET_AUTH_TYPE_REQUEST,
    payload, // { authType: "pin" | "otp" }
  };
};

export const setAuthTypeSuccess = (data) => ({
  type: SET_AUTH_TYPE_SUCCESS,
  payload: data,
});

export const setAuthTypeFailure = (error) => ({
  type: SET_AUTH_TYPE_FAILURE,
  payload: error,
});
