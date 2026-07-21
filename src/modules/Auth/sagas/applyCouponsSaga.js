// src/sagas/auth/applyCouponsSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import {
  APPLY_COUPONS_REQUEST,
  applyCouponsSuccess,
  applyCouponsFailure,
} from "../actions/applyCouponsActions";

import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

// Worker Saga
function* handleApplyCoupons(action) {
  console.log("📝 Saga received payload:", action.payload);
  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.applyCoupons,
      API_METHODS.POST,
      action.payload
    );

    console.log("📥 Apply Coupons API response:", response);

    if (response && response.success) {
      yield put(applyCouponsSuccess(response));
    } else {
      yield put(applyCouponsFailure(response?.message || "Failed to apply coupon"));
    }
  } catch (error) {
    yield put(applyCouponsFailure(error.message));
  }
}

// Watcher Saga
export function* watchApplyCoupons() {
  yield takeLatest(APPLY_COUPONS_REQUEST, handleApplyCoupons);
}
