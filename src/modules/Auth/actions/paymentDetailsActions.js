// actions/auth/paymentDetailsActions.js
export const PAYMENT_DETAILS_REQUEST = "PAYMENT_DETAILS_REQUEST";
export const PAYMENT_DETAILS_SUCCESS = "PAYMENT_DETAILS_SUCCESS";
export const PAYMENT_DETAILS_FAILURE = "PAYMENT_DETAILS_FAILURE";
export const CLEAR_PAYMENT_DETAILS = "CLEAR_PAYMENT_DETAILS";

export const paymentDetailsRequest = (payload) => ({
  type: PAYMENT_DETAILS_REQUEST,
  payload,
});

export const paymentDetailsSuccess = (data) => ({
  type: PAYMENT_DETAILS_SUCCESS,
  payload: data,
});

export const paymentDetailsFailure = (error) => ({
  type: PAYMENT_DETAILS_FAILURE,
  payload: error,
});

export const clearPaymentDetails = () => ({
  type: CLEAR_PAYMENT_DETAILS,
});
