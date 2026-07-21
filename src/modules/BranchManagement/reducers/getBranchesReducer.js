import {
  GET_BRANCHES_REQUEST,
  GET_BRANCHES_SUCCESS,
  GET_BRANCHES_FAILURE,
} from "../actions/getBranchesActions";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getBranchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BRANCHES_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_BRANCHES_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };

    case GET_BRANCHES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default getBranchesReducer;
