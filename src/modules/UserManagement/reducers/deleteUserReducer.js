import {
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  CLEAR_DELETE_USER,
} from "../actions/deleteUserActions";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const deleteUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case DELETE_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };

    case DELETE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_DELETE_USER:
      return initialState;

    default:
      return state;
  }
};

export default deleteUserReducer;
