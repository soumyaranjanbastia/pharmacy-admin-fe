// src/sagas/auth/validatePinSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import {
  VALIDATE_PIN_REQUEST,
  validatePinSuccess,
  validatePinFailure,
} from "../actions/validatePinActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";
import { storeTokens } from "../../../utils/tokenManager";

function* handleValidatePin(action) {
  try {
    console.log("🚀 Validate PIN Saga triggered:", action.payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.validatePin,
      API_METHODS.POST,
      action.payload
    );

    console.log("📥 Validate PIN API response:", response);

    const isSuccess =
      response &&
      (response.success === true || response.success === "true" || response.status === "success") &&
      !(response.message && /invalid|fail|wrong|error/i.test(response.message)) &&
      !(response.data?.message && /invalid|fail|wrong|error/i.test(response.data.message));

    if (isSuccess) {
      // Direct Persistence: Store user data immediately so it's available in Header
      if (response.user) {
        yield call(storeTokens, {
          userType: response.userType || "Admin",
          user: response.user
        });
      }
      yield put(validatePinSuccess({ ...response, success: true }));
    } else {
      yield put(validatePinFailure(response?.message || response?.data?.message || "PIN validation failed"));
    }
  } catch (error) {
    yield put(validatePinFailure(error.message));
  }
}

export function* watchValidatePin() {
  yield takeLatest(VALIDATE_PIN_REQUEST, handleValidatePin);
}
