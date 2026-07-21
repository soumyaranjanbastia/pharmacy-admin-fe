import {
  SEARCH_MEDICINES_REQUEST,
  SEARCH_MEDICINES_SUCCESS,
  SEARCH_MEDICINES_FAILURE,
} from "../actions/searchMedicinesActions";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const searchMedicinesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MEDICINES_REQUEST:
      return { ...state, loading: true, error: null };

    case SEARCH_MEDICINES_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };

    case SEARCH_MEDICINES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default searchMedicinesReducer;
