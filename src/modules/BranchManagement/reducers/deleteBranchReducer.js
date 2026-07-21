import {
  DELETE_BRANCH_REQUEST,
  DELETE_BRANCH_SUCCESS,
  DELETE_BRANCH_FAILURE,
  DELETE_BRANCH_CLEAR,
} from "../actions/deleteBranchActions";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const deleteBranchReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_BRANCH_REQUEST:
      return { ...state, loading: true, error: null };

    case DELETE_BRANCH_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };

    case DELETE_BRANCH_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case DELETE_BRANCH_CLEAR:
      return initialState;

    default:
      return state;
  }
};

export default deleteBranchReducer;
