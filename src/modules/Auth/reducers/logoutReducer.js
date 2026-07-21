// reducers/auth/logoutReducer.js
import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from "../actions/logoutActions";
import { LOGIN_REQUEST } from "../actions/loginActions";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return { ...state, loading: true, error: null, data: null };

    case LOGOUT_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };

    case LOGOUT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default logoutReducer;
