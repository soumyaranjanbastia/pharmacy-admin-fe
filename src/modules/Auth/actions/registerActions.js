// Action Types
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const REGISTER_CLEAR = "REGISTER_CLEAR";

// Action Creators
export const registerRequest = (payload) => {
  console.log("📤 Dispatching REGISTER_REQUEST with payload:", payload);
  return {
    type: REGISTER_REQUEST,
    payload, // form data payload
  };
};

export const registerSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  payload: data,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const registerClear = () => ({
  type: REGISTER_CLEAR,
});
