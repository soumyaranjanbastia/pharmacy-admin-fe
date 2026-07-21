import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_CLEAR,
} from "../actions/registerActions";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      console.log("🟡 Reducer => REGISTER_REQUEST:", action.payload);
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case REGISTER_CLEAR:
      return initialState;

    default:
      return state;
  }
};

export default registerReducer;
