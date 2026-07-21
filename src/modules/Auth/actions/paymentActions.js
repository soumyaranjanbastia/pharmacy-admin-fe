// Action types
export const PAYMENT_REQUEST = "PAYMENT_REQUEST";
export const PAYMENT_SUCCESS = "PAYMENT_SUCCESS";
export const PAYMENT_FAILURE = "PAYMENT_FAILURE";

// Action creators
export const paymentRequest = (payload) => ({
  type: PAYMENT_REQUEST,
  payload,
});

export const paymentSuccess = (data) => ({
  type: PAYMENT_SUCCESS,
  payload: data,
});

export const paymentFailure = (error) => ({
  type: PAYMENT_FAILURE,
  payload: error,
});
