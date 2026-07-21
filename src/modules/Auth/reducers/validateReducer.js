import {
  VALIDATE_REQUEST,
  VALIDATE_SUCCESS,
  VALIDATE_FAILURE,
  RESEND_OTP_REQUEST,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAILURE,
  RESEND_OTP_CLEAR,
} from "../actions/validateActions";

const initialState = {
  data: null,
  loading: false,
  error: null,
  resendData: null,
  resendLoading: false,
  resendError: null,
};

const validateReducer = (state = initialState, action) => {
  switch (action.type) {
    case VALIDATE_REQUEST:
      console.log("🟡 Reducer => VALIDATE_REQUEST:", action.payload);
      return { ...state, loading: true, error: null, data: null };

    case VALIDATE_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };

    case VALIDATE_FAILURE:
      return { ...state, loading: false, error: action.payload, data: null };

    case RESEND_OTP_REQUEST:
      console.log("🟡 Reducer => RESEND_OTP_REQUEST:", action.payload);
      return { ...state, resendLoading: true, resendError: null, resendData: null };

    case RESEND_OTP_SUCCESS:
      console.log("🟢 Reducer => RESEND_OTP_SUCCESS:", action.payload);
      return { ...state, resendLoading: false, resendData: action.payload, resendError: null };

    case RESEND_OTP_FAILURE:
      console.error("🔴 Reducer => RESEND_OTP_FAILURE:", action.payload);
      return { ...state, resendLoading: false, resendError: action.payload, resendData: null };

    case RESEND_OTP_CLEAR:
      return { ...state, resendLoading: false, resendError: null, resendData: null };

    default:
      return state;
  }
};

export default validateReducer;
