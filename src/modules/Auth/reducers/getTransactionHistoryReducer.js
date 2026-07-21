// src/reducers/auth/getTransactionHistoryReducer.js

import {
  GET_TRANSACTION_HISTORY_REQUEST,
  GET_TRANSACTION_HISTORY_SUCCESS,
  GET_TRANSACTION_HISTORY_FAILURE,
  GET_TRANSACTION_HISTORY_RESET,
} from "../actions/getTransactionHistoryActions";

const initialState = {
  loading: false,
  data: null,
  error: null,
  success: false,
};

const getTransactionHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTION_HISTORY_REQUEST:
      console.log("🟡 Reducer => GET_TRANSACTION_HISTORY_REQUEST payload:", action.payload);
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case GET_TRANSACTION_HISTORY_SUCCESS:
      console.log("🟢 Reducer => GET_TRANSACTION_HISTORY_SUCCESS:", action.payload);
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
        success: true,
      };

    case GET_TRANSACTION_HISTORY_FAILURE:
      console.error("🔴 Reducer => GET_TRANSACTION_HISTORY_FAILURE:", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case GET_TRANSACTION_HISTORY_RESET:
      return initialState;

    default:
      return state;
  }
};

export default getTransactionHistoryReducer;
