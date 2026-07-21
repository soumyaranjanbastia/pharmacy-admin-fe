import { call, put, takeLatest } from "redux-saga/effects";
import {
  PAYMENT_REQUEST,
  paymentSuccess,
  paymentFailure,
} from "../actions/paymentActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

// Worker Saga
function* handlePayment(action) {
  try {
    console.log("💳 Triggered Payment API with payload:", action.payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.payment,
      API_METHODS.POST,
      action.payload
    );

    console.log("📥 Payment API Response:", response);

    if (response && response.success) {
      yield put(paymentSuccess(response));
    } else {
      yield put(paymentFailure(response?.message || "Payment failed"));
    }
  } catch (error) {
    yield put(paymentFailure(error.message));
  }
}

// Watcher Saga
export function* watchPayment() {
  yield takeLatest(PAYMENT_REQUEST, handlePayment);
}
