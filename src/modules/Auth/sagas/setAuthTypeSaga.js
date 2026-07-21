import { call, put, takeLatest } from "redux-saga/effects";
import {
  SET_AUTH_TYPE_REQUEST,
  setAuthTypeSuccess,
  setAuthTypeFailure,
} from "../actions/setAuthTypeActions.js";

import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

// Worker Saga
function* handleSetAuthType(action) {
  console.log("📝 Saga received payload:", action.payload);
  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.setAuthType,
      API_METHODS.POST,
      action.payload
    );

    if (response && response.success) {
      yield put(setAuthTypeSuccess(response));
    } else {
      yield put(setAuthTypeFailure(response?.message || "SetAuthType failed"));
    }
  } catch (error) {
    yield put(setAuthTypeFailure(error.message));
  }
}

// Watcher Saga
export function* watchSetAuthType() {
  yield takeLatest(SET_AUTH_TYPE_REQUEST, handleSetAuthType);
}
