import {
  VERIFY_PAYMENT_REQUEST,
  VERIFY_PAYMENT_SUCCESS,
  VERIFY_PAYMENT_FAILURE,
} from "../actions/verifyPaymentActions";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const verifyPaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_PAYMENT_REQUEST:
      console.log("🟡 Reducer => VERIFY_PAYMENT_REQUEST:", action.payload);
      return { ...state, loading: true, error: null };

    case VERIFY_PAYMENT_SUCCESS:
      console.log("🟢 Reducer => VERIFY_PAYMENT_SUCCESS:", action.payload);
      return { ...state, loading: false, data: action.payload };

    case VERIFY_PAYMENT_FAILURE:
      console.error("🔴 Reducer => VERIFY_PAYMENT_FAILURE:", action.payload);
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default verifyPaymentReducer;
