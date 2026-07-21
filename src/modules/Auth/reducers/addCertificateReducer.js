// src/reducers/auth/addCertificateReducer.js
import {
  ADD_CERTIFICATE_REQUEST,
  ADD_CERTIFICATE_SUCCESS,
  ADD_CERTIFICATE_FAILURE,
  CLEAR_ADD_CERTIFICATE,
} from "../actions/addCertificateActions";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const addCertificateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CERTIFICATE_REQUEST:
      console.log("🟡 Reducer => ADD_CERTIFICATE_REQUEST:", action.payload);
      return { ...state, loading: true, error: null };

    case ADD_CERTIFICATE_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case ADD_CERTIFICATE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_ADD_CERTIFICATE:
      return initialState;

    default:
      return state;
  }
};

export default addCertificateReducer;
