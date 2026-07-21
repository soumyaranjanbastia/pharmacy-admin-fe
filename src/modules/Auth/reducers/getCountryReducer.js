import {
  GET_COUNTRY_REQUEST,
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_FAILURE,
} from "../actions/getCountryActions";

const initialState = {
  countries: [],
  loading: false,
  error: null,
};

const getCountryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRY_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_COUNTRY_SUCCESS:
      return { ...state, loading: false, countries: action.payload };

    case GET_COUNTRY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default getCountryReducer;
