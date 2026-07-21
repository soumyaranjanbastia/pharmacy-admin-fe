import {
  VALIDATE_OTP_TOKEN_REQUEST,
  VALIDATE_OTP_TOKEN_SUCCESS,
  VALIDATE_OTP_TOKEN_FAILURE,
  CLEAR_VALIDATE_OTP_TOKEN,
} from "../actions/validateOtpAndTokenActions";
import { LOGOUT_SUCCESS } from "../actions/logoutActions";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const validateOtpTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case VALIDATE_OTP_TOKEN_REQUEST:
      console.log("🟡 Reducer => VALIDATE_OTP_TOKEN_REQUEST:", action.payload);
      return { ...state, loading: true, error: null, data: null };

    case VALIDATE_OTP_TOKEN_SUCCESS:
      console.log("✅ Reducer => VALIDATE_OTP_TOKEN_SUCCESS:", action.payload);
      return { ...state, loading: false, data: action.payload, error: null };

    case VALIDATE_OTP_TOKEN_FAILURE:
      console.log("❌ Reducer => VALIDATE_OTP_TOKEN_FAILURE:", action.payload);
      return { ...state, loading: false, error: action.payload, data: null };

    case CLEAR_VALIDATE_OTP_TOKEN:
    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};

export default validateOtpTokenReducer;
