import { call, put, takeLatest } from "redux-saga/effects";
import {
  REGISTER_REQUEST,
  registerSuccess,
  registerFailure,
} from "../actions/registerActions";

import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

// Worker Saga
function* handleRegister(action) {
     console.log("📝 Saga received payload:", action.payload);
  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.register,
      API_METHODS.POST,
      action.payload
    );

    if (response && response.success) {
      yield put(registerSuccess(response));
    } else {
      yield put(registerFailure(response?.message || "Registration failed"));
    }
  } catch (error) {
    yield put(registerFailure(error.message));
  }
}

// Watcher Saga
export function* watchRegister() {
  yield takeLatest(REGISTER_REQUEST, handleRegister);
}
