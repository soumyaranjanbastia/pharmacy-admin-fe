import {
  GET_PLANS_REQUEST,
  GET_PLANS_SUCCESS,
  GET_PLANS_FAILURE,
} from "../actions/getPlansActions";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const getPlansReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLANS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_PLANS_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case GET_PLANS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default getPlansReducer;
