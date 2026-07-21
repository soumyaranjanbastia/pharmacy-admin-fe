// src/reducers/auth/applyCouponsReducer.js
import {
  APPLY_COUPONS_REQUEST,
  APPLY_COUPONS_SUCCESS,
  APPLY_COUPONS_FAILURE,
  CLEAR_APPLY_COUPONS,
} from "../actions/applyCouponsActions";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const applyCouponsReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLY_COUPONS_REQUEST:
      console.log("🟡 Reducer => APPLY_COUPONS_REQUEST:", action.payload);
      return { ...state, loading: true, error: null };

    case APPLY_COUPONS_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case APPLY_COUPONS_FAILURE:
      return { ...state, loading: false, error: action.payload };
case CLEAR_APPLY_COUPONS: // ✅ Reset
      return initialState;
    default:
      return state;
  }
};

export default applyCouponsReducer;
