export const VALIDATE_OTP_TOKEN_REQUEST = "VALIDATE_OTP_TOKEN_REQUEST";
export const VALIDATE_OTP_TOKEN_SUCCESS = "VALIDATE_OTP_TOKEN_SUCCESS";
export const VALIDATE_OTP_TOKEN_FAILURE = "VALIDATE_OTP_TOKEN_FAILURE";
export const CLEAR_VALIDATE_OTP_TOKEN = "CLEAR_VALIDATE_OTP_TOKEN";

export const validateOtpTokenRequest = (payload) => {
  console.log("📤 Dispatching VALIDATE_OTP_TOKEN_REQUEST with payload:", payload);
  return {
    type: VALIDATE_OTP_TOKEN_REQUEST,
    payload, // { encryptionKey, code, isFirstTimeLogin, email, token? }
  };
};

export const validateOtpTokenSuccess = (data) => ({
  type: VALIDATE_OTP_TOKEN_SUCCESS,
  payload: data,
});

export const validateOtpTokenFailure = (error) => ({
  type: VALIDATE_OTP_TOKEN_FAILURE,
  payload: error,
});

export const clearValidateOtpToken = () => ({
  type: CLEAR_VALIDATE_OTP_TOKEN,
});
