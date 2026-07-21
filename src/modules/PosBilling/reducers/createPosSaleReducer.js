import {
  CREATE_POS_SALE_REQUEST,
  CREATE_POS_SALE_SUCCESS,
  CREATE_POS_SALE_FAILURE,
} from "../actions/createPosSaleActions";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const createPosSaleReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POS_SALE_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_POS_SALE_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };

    case CREATE_POS_SALE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default createPosSaleReducer;
