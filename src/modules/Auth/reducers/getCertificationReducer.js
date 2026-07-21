// src/reducers/auth/getCertificationReducer.js
import {
  GET_CERTIFICATION_REQUEST,
  GET_CERTIFICATION_SUCCESS,
  GET_CERTIFICATION_FAILURE,
  CLEAR_GET_CERTIFICATION,
} from "../actions/getCertificationActions";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const getCertificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CERTIFICATION_REQUEST:
      console.log("🟡 Reducer => GET_CERTIFICATION_REQUEST:", action.payload);
      return { ...state, loading: true, error: null };

    case GET_CERTIFICATION_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case GET_CERTIFICATION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_GET_CERTIFICATION:
      return initialState;

    default:
      return state;
  }
};

export default getCertificationReducer;
