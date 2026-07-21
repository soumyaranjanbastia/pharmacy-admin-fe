import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
    CREATE_USER_CLEAR
} from "../actions/createUserActions";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const createUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };

    case CREATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
      case CREATE_USER_CLEAR:
      return { ...initialState }; 
    default:
      return state;
  }
};

export default createUserReducer;
