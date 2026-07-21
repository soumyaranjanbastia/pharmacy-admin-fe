// src/sagas/auth/getTransactionHistorySaga.js

import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_TRANSACTION_HISTORY_REQUEST,
  getTransactionHistorySuccess,
  getTransactionHistoryFailure,
} from "../actions/getTransactionHistoryActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

function* handleGetTransactionHistory(action) {
  console.log("📝 Saga => GET_TRANSACTION_HISTORY_REQUEST payload:", action.payload);
  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.getTransactionHistory,
      API_METHODS.POST,
      action.payload
    );

    console.log("🔍 API Response for getTransactionHistory:", response);

    if (response && response.success) {
      yield put(getTransactionHistorySuccess(response));
    } else {
      yield put(
        getTransactionHistoryFailure(
          response?.message || "Failed to retrieve transaction history"
        )
      );
    }
  } catch (error) {
    console.error("🚨 Saga => GET_TRANSACTION_HISTORY_FAILURE error:", error.message);
    yield put(getTransactionHistoryFailure(error.message || "Something went wrong"));
  }
}

export function* watchGetTransactionHistory() {
  yield takeLatest(GET_TRANSACTION_HISTORY_REQUEST, handleGetTransactionHistory);
}
