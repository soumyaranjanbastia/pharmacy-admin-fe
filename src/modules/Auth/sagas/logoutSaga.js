// sagas/auth/logoutSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import { LOGOUT_REQUEST, logoutSuccess, logoutFailure } from "../actions/logoutActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

function* handleLogout() {
  try {
    console.log("🚀 Saga triggered: Logout API call...");

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.logout,
      API_METHODS.POST // no payload needed
    );

    console.log("📥 Logout API response:", response);

    if (response && response.success) {
      yield put(logoutSuccess(response));
    } else {
      yield put(logoutFailure(response?.message || "Logout failed"));
    }
  } catch (error) {
    yield put(logoutFailure(error.message));
  }
}

export function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, handleLogout);
}
