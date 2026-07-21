import {
  GET_ALL_COUPONS_REQUEST,
  GET_ALL_COUPONS_SUCCESS,
  GET_ALL_COUPONS_FAILURE,
} from "../actions/getAllCouponsActions";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const getAllCouponsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUPONS_REQUEST:
      console.log("🟡 Reducer => GET_ALL_COUPONS_REQUEST payload:", action.payload);
      return { ...state, loading: true, error: null };

  case GET_ALL_COUPONS_SUCCESS:
  console.log("🟢 Reducer => GET_ALL_COUPONS_SUCCESS data:", action.payload);
  return { ...state, loading: false, data: action.payload };


    case GET_ALL_COUPONS_FAILURE:
      console.log("🔴 Reducer => GET_ALL_COUPONS_FAILURE error:", action.payload);
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default getAllCouponsReducer;
