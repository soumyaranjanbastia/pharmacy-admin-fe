// reducers/auth/paymentDetailsReducer.js
import {
  PAYMENT_DETAILS_REQUEST,
  PAYMENT_DETAILS_SUCCESS,
  PAYMENT_DETAILS_FAILURE,
  CLEAR_PAYMENT_DETAILS,
} from "../actions/paymentDetailsActions";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const paymentDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case PAYMENT_DETAILS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case PAYMENT_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_PAYMENT_DETAILS:
      return initialState;
    default:
      return state;
  }
};

export default paymentDetailsReducer;
