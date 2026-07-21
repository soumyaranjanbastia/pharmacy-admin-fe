import { call, put, takeLatest } from "redux-saga/effects";
import {
  VERIFY_PAYMENT_REQUEST,
  verifyPaymentSuccess,
  verifyPaymentFailure,
} from "../actions/verifyPaymentActions";

import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

// Worker Saga
function* handleVerifyPayment(action) {
  console.log("📝 Saga received verifyPayment payload:", action.payload);
  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.verifyPayment,
      API_METHODS.POST,
      action.payload
    );

    if (response && response.success) {
      yield put(verifyPaymentSuccess(response));
    } else {
      yield put(
        verifyPaymentFailure(response?.message || "Payment verification failed")
      );
    }
  } catch (error) {
    yield put(verifyPaymentFailure(error.message));
  }
}

// Watcher Saga
export function* watchVerifyPayment() {
  yield takeLatest(VERIFY_PAYMENT_REQUEST, handleVerifyPayment);
}
