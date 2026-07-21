// src/reducers/userManagement/getUserListReducer.js
import {
  GET_USERLIST_REQUEST,
  GET_USERLIST_SUCCESS,
  GET_USERLIST_FAILURE,
  CLEAR_USERLIST,
} from "../actions/getUserListActions";

const initialState = {
  loading: false,
  data: { Admin: [], "Lab Technician": [], "Sample Collector": [] },
  error: null,
};

const getUserListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERLIST_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_USERLIST_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };

    case GET_USERLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_USERLIST:
      return initialState;

    default:
      return state;
  }
};

export default getUserListReducer;
