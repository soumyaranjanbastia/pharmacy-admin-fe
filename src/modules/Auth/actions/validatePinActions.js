// src/actions/auth/validatePinActions.js
export const VALIDATE_PIN_REQUEST = "VALIDATE_PIN_REQUEST";
export const VALIDATE_PIN_SUCCESS = "VALIDATE_PIN_SUCCESS";
export const VALIDATE_PIN_FAILURE = "VALIDATE_PIN_FAILURE";
export const VALIDATE_PIN_CLEAR = "VALIDATE_PIN_CLEAR";

export const validatePinRequest = (payload) => ({
  type: VALIDATE_PIN_REQUEST,
  payload, // { pin: "MTIzNDU2" }
});

export const validatePinSuccess = (data) => ({
  type: VALIDATE_PIN_SUCCESS,
  payload: data,
});

export const validatePinFailure = (error) => ({
  type: VALIDATE_PIN_FAILURE,
  payload: error,
});

export const validatePinClear = () => ({
  type: VALIDATE_PIN_CLEAR,
});
