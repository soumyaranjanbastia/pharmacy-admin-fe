import {
  GET_COMPANYTYPE_REQUEST,
  GET_COMPANYTYPE_SUCCESS,
  GET_COMPANYTYPE_FAILURE,
} from "../actions/getCompanyTypeActions";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getCompanyTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANYTYPE_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_COMPANYTYPE_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };

    case GET_COMPANYTYPE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default getCompanyTypeReducer;
