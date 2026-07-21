// Action Types
export const VALIDATE_REQUEST = "VALIDATE_REQUEST";
export const VALIDATE_SUCCESS = "VALIDATE_SUCCESS";
export const VALIDATE_FAILURE = "VALIDATE_FAILURE";

export const RESEND_OTP_REQUEST = "RESEND_OTP_REQUEST";
export const RESEND_OTP_SUCCESS = "RESEND_OTP_SUCCESS";
export const RESEND_OTP_FAILURE = "RESEND_OTP_FAILURE";
export const RESEND_OTP_CLEAR = "RESEND_OTP_CLEAR";

// Action Creators
export const validateRequest = (payload) => {
  console.log("📤 Dispatching VALIDATE_REQUEST with payload:", payload);
  return {
    type: VALIDATE_REQUEST,
    payload,
  };
};

export const validateSuccess = (data) => ({
  type: VALIDATE_SUCCESS,
  payload: data,
});

export const validateFailure = (error) => ({
  type: VALIDATE_FAILURE,
  payload: error,
});

export const resendOtpRequest = (payload) => ({
  type: RESEND_OTP_REQUEST,
  payload,
});

export const resendOtpSuccess = (data) => ({
  type: RESEND_OTP_SUCCESS,
  payload: data,
});

export const resendOtpFailure = (error) => ({
  type: RESEND_OTP_FAILURE,
  payload: error,
});

export const resendOtpClear = () => ({
  type: RESEND_OTP_CLEAR,
});
