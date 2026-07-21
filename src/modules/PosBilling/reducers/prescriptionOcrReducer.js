import {
  PRESCRIPTION_OCR_REQUEST,
  PRESCRIPTION_OCR_SUCCESS,
  PRESCRIPTION_OCR_FAILURE,
} from "../actions/prescriptionOcrActions";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const prescriptionOcrReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRESCRIPTION_OCR_REQUEST:
      return { ...state, loading: true, error: null };

    case PRESCRIPTION_OCR_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };

    case PRESCRIPTION_OCR_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default prescriptionOcrReducer;
