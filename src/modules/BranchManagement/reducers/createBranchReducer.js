import {
  CREATE_BRANCH_REQUEST,
  CREATE_BRANCH_SUCCESS,
  CREATE_BRANCH_FAILURE,
  CREATE_BRANCH_CLEAR,
} from "../actions/createBranchActions";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const createBranchReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BRANCH_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_BRANCH_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };

    case CREATE_BRANCH_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATE_BRANCH_CLEAR:
      return initialState;

    default:
      return state;
  }
};

export default createBranchReducer;
