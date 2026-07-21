import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_ALL_COUPONS_REQUEST,
  getAllCouponsSuccess,
  getAllCouponsFailure,
} from "../actions/getAllCouponsActions";

import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

function* handleGetAllCoupons(action) {
  try {
    console.log("📝 Saga received payload:", action.payload);
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.getAllCoupons,
      API_METHODS.POST,
      action.payload
    );
    console.log("📥 Coupons API response:", response);

    if (response?.success) {
      yield put(getAllCouponsSuccess(response));
    } else {
      yield put(getAllCouponsFailure(response?.message || "Failed to fetch coupons"));
    }
  } catch (error) {
    yield put(getAllCouponsFailure(error.message));
  }
}

export function* watchGetAllCoupons() {
  yield takeLatest(GET_ALL_COUPONS_REQUEST, handleGetAllCoupons);
}
