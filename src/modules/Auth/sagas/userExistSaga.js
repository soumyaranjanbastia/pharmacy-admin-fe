import { call, put, takeLatest } from "redux-saga/effects";
import {
  USER_EXIST_REQUEST,
  userExistSuccess,
  userExistFailure,
} from "../actions/userExistActions";

import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

// Worker Saga
function* handleUserExist(action) {
  console.log("📝 Saga received userExist payload:", action.payload);
  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.userExist,
      API_METHODS.POST,
      action.payload
    );

    if (response && response.success) {
      yield put(userExistSuccess(response));
    } else {
      yield put(userExistFailure(response?.message || "User exist check failed"));
    }
  } catch (error) {
    yield put(userExistFailure(error.message));
  }
}

// Watcher Saga
export function* watchUserExist() {
  yield takeLatest(USER_EXIST_REQUEST, handleUserExist);
}
