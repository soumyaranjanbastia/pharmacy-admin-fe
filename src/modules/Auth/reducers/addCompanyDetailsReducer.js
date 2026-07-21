import {
  ADD_COMPANY_DETAILS_REQUEST,
  ADD_COMPANY_DETAILS_SUCCESS,
  ADD_COMPANY_DETAILS_FAILURE,
} from "../actions/addCompanyDetailsActions";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const addCompanyDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMPANY_DETAILS_REQUEST:
      console.log("🟡 Reducer => ADD_COMPANY_DETAILS_REQUEST:", action.payload);
      return { ...state, loading: true, error: null };

    case ADD_COMPANY_DETAILS_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case ADD_COMPANY_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default addCompanyDetailsReducer;
