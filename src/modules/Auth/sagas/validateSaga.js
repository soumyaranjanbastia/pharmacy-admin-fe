import { call, put, takeLatest } from "redux-saga/effects";
import {
  VALIDATE_REQUEST,
  validateSuccess,
  validateFailure,
  RESEND_OTP_REQUEST,
  resendOtpSuccess,
  resendOtpFailure,
} from "../actions/validateActions";

import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";
import { storeTokens } from "../../../utils/tokenManager";


// Worker Saga
function* handleValidate(action) {
  console.log("📝 Saga received payload:", action.payload);
  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.validate,
      API_METHODS.POST,
      action.payload
    );

    const isSuccess =
      response &&
      (response.success === true || response.success === "true" || response.status === "success") &&
      !(response.message && /invalid|fail|wrong|error/i.test(response.message)) &&
      !(response.data?.message && /invalid|fail|wrong|error/i.test(response.data.message));

    if (isSuccess) {
      if (response.user) {
        yield call(storeTokens, {
          userType: response.userType || "Admin",
          user: response.user
        });
      }
      yield put(validateSuccess({ ...response, success: true }));
    } else {
      yield put(validateFailure(response?.message || response?.data?.message || "Validation failed"));
    }
  } catch (error) {
    yield put(validateFailure(error.message));
  }
}

// Worker Saga for Resend OTP
function* handleResendOtp(action) {
  console.log("📝 Resend OTP Saga received payload:", action.payload);
  try {
    const response = yield call(
      apiGateway,
      "auth/resend",
      API_METHODS.POST,
      action.payload
    );

    if (response && response.success) {
      yield put(resendOtpSuccess(response));
    } else {
      yield put(resendOtpFailure(response?.message || "Failed to resend OTP"));
    }
  } catch (error) {
    yield put(resendOtpFailure(error.message));
  }
}

// Watcher Saga
export function* watchValidate() {
  yield takeLatest(VALIDATE_REQUEST, handleValidate);
  yield takeLatest(RESEND_OTP_REQUEST, handleResendOtp);
}
