// Action Types
export const VERIFY_PAYMENT_REQUEST = "VERIFY_PAYMENT_REQUEST";
export const VERIFY_PAYMENT_SUCCESS = "VERIFY_PAYMENT_SUCCESS";
export const VERIFY_PAYMENT_FAILURE = "VERIFY_PAYMENT_FAILURE";

// Action Creators
export const verifyPaymentRequest = (payload) => {
  console.log("📤 Dispatching VERIFY_PAYMENT_REQUEST with payload:", payload);
  return {
    type: VERIFY_PAYMENT_REQUEST,
    payload,
  };
};

export const verifyPaymentSuccess = (data) => ({
  type: VERIFY_PAYMENT_SUCCESS,
  payload: data,
});

export const verifyPaymentFailure = (error) => ({
  type: VERIFY_PAYMENT_FAILURE,
  payload: error,
});
