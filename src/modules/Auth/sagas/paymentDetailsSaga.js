import { call, put, takeLatest } from "redux-saga/effects";
import {
  PAYMENT_DETAILS_REQUEST,
  paymentDetailsSuccess,
  paymentDetailsFailure,
} from "../actions/paymentDetailsActions";

import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

// Worker Saga
function* handlePaymentDetails(action) {
  console.log("📝 Saga triggered: Fetching Payment Details...");
  try {
    const payload = action.payload; // ✅ Get payload (planId, couponId)
    console.log("📦 Payload sent to API:", payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.paymentDetails,
      API_METHODS.POST,
      payload // ✅ send payload here
    );

    console.log("📥 PaymentDetails API response:", response);

    if (response && response.success) {
      yield put(paymentDetailsSuccess(response));
    } else {
      yield put(
        paymentDetailsFailure(response?.message || "Failed to fetch payment details")
      );
    }
  } catch (error) {
    yield put(paymentDetailsFailure(error.message));
  }
}

// Watcher Saga
export function* watchPaymentDetails() {
  yield takeLatest(PAYMENT_DETAILS_REQUEST, handlePaymentDetails);
}
