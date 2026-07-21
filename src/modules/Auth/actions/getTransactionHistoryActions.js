// src/actions/auth/getTransactionHistoryActions.js

export const GET_TRANSACTION_HISTORY_REQUEST = "GET_TRANSACTION_HISTORY_REQUEST";
export const GET_TRANSACTION_HISTORY_SUCCESS = "GET_TRANSACTION_HISTORY_SUCCESS";
export const GET_TRANSACTION_HISTORY_FAILURE = "GET_TRANSACTION_HISTORY_FAILURE";
export const GET_TRANSACTION_HISTORY_RESET = "GET_TRANSACTION_HISTORY_RESET";

export const getTransactionHistoryRequest = (payload) => ({
  type: GET_TRANSACTION_HISTORY_REQUEST,
  payload, // Expected format: { userType: "Admin" }
});

export const getTransactionHistorySuccess = (payload) => ({
  type: GET_TRANSACTION_HISTORY_SUCCESS,
  payload,
});

export const getTransactionHistoryFailure = (payload) => ({
  type: GET_TRANSACTION_HISTORY_FAILURE,
  payload,
});

export const getTransactionHistoryReset = () => ({
  type: GET_TRANSACTION_HISTORY_RESET,
});
