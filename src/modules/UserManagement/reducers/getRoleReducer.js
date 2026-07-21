// reducers/roleManagement/getRoleReducer.js
import {
  GET_ROLE_REQUEST,
  GET_ROLE_SUCCESS,
  GET_ROLE_FAILURE,
} from "../actions/getRoleActions";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROLE_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_ROLE_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };

    case GET_ROLE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default getRoleReducer;
