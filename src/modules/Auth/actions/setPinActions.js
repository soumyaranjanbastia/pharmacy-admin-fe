// Action Types
export const SET_PIN_REQUEST = "SET_PIN_REQUEST";
export const SET_PIN_SUCCESS = "SET_PIN_SUCCESS";
export const SET_PIN_FAILURE = "SET_PIN_FAILURE";
export const CLEAR_SET_PIN = "CLEAR_SET_PIN";

// Action Creators
export const setPinRequest = (payload) => {
  console.log("📤 Dispatching SET_PIN_REQUEST:", payload);
  return {
    type: SET_PIN_REQUEST,
    payload,
  };
};

export const setPinSuccess = (data) => ({
  type: SET_PIN_SUCCESS,
  payload: data,
});

export const setPinFailure = (error) => ({
  type: SET_PIN_FAILURE,
  payload: error,
});

export const clearSetPin = () => ({
  type: CLEAR_SET_PIN,
});
