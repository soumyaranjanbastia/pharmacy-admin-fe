import { call, put, takeLatest } from "redux-saga/effects";
import {
  VALIDATE_OTP_TOKEN_REQUEST,
  validateOtpTokenSuccess,
  validateOtpTokenFailure,
} from "../actions/validateOtpAndTokenActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";
import { storeTokens } from "../../../utils/tokenManager";

function* handleValidateOtpToken(action) {
  console.log("📝 Saga received payload:", action.payload);
  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.validateOtpAndTokens,
      API_METHODS.POST,
      action.payload
    );

    console.log("📥 Validate OTP & Token API response:", response);

    const isSuccess =
      response &&
      (response.success === true || response.success === "true" || response.status === "success") &&
      !(response.message && /invalid|fail|wrong|error/i.test(response.message)) &&
      !(response.data?.message && /invalid|fail|wrong|error/i.test(response.data.message));

    if (isSuccess) {
      // Direct Persistence: Store tokens and user data immediately
      const userTypeVal = response.userType || response.data?.userType || action.payload?.loginType || "Admin";
      const userVal = response.user || response.data?.user;

      yield call(storeTokens, {
        accessToken: response.data?.accessToken,
        refreshToken: response.data?.refreshToken,
        userType: userTypeVal,
        user: userVal
      });
      yield put(validateOtpTokenSuccess({ ...response, success: true }));
    } else {
      yield put(validateOtpTokenFailure(response?.message || response?.data?.message || "OTP/Token validation failed"));
    }
  } catch (error) {
    yield put(validateOtpTokenFailure(error.message));
  }
}

export function* watchValidateOtpToken() {
  yield takeLatest(VALIDATE_OTP_TOKEN_REQUEST, handleValidateOtpToken);
}
