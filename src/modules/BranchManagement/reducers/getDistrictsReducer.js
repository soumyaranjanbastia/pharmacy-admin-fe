import {
  GET_DISTRICTS_REQUEST,
  GET_DISTRICTS_SUCCESS,
  GET_DISTRICTS_FAILURE,
} from "../actions/getDistrictsActions";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getDistrictsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DISTRICTS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_DISTRICTS_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };

    case GET_DISTRICTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default getDistrictsReducer;
