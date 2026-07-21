// src/reducers/auth/validatePinReducer.js
import {
  VALIDATE_PIN_REQUEST,
  VALIDATE_PIN_SUCCESS,
  VALIDATE_PIN_FAILURE,
  VALIDATE_PIN_CLEAR,
} from "../actions/validatePinActions";
import { LOGOUT_SUCCESS } from "../actions/logoutActions";

const initialState = {
  data: null,
  loading: false,
  success: false,
  message: null,
  error: null,
};

const validatePinReducer = (state = initialState, action) => {
  switch (action.type) {
    case VALIDATE_PIN_REQUEST:
      return { ...state, loading: true, success: false, error: null, data: null, message: null };

    case VALIDATE_PIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
        message: action.payload.message,
        error: null,
      };

    case VALIDATE_PIN_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
        data: null,
        message: null,
      };

    case VALIDATE_PIN_CLEAR:
    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};

export default validatePinReducer;
