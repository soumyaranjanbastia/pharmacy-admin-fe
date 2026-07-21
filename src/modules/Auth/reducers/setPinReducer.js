import {
  SET_PIN_REQUEST,
  SET_PIN_SUCCESS,
  SET_PIN_FAILURE,
  CLEAR_SET_PIN,
} from "../actions/setPinActions";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const setPinReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PIN_REQUEST:
      return { ...state, loading: true, error: null };

    case SET_PIN_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case SET_PIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_SET_PIN:
      return initialState;

    default:
      return state;
  }
};

export default setPinReducer;
