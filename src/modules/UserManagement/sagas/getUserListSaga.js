// src/sagas/userManagement/getUserListSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_USERLIST_REQUEST,
  getUserListSuccess,
  getUserListFailure,
} from "../actions/getUserListActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

function* handleGetUserList() {
  try {
    console.log("🚀 Saga triggered: Fetching User List...");
    const response = yield call(apiGateway, API_ENDPOINTS.getUserList, API_METHODS.POST);

    console.log("📥 User List API response:", response);

    if (response && response.success) {
      yield put(getUserListSuccess(response.data));
    } else {
      yield put(getUserListFailure(response?.message || "Failed to fetch user list"));
    }
  } catch (error) {
    yield put(getUserListFailure(error.message));
  }
}

export function* watchGetUserList() {
  yield takeLatest(GET_USERLIST_REQUEST, handleGetUserList);
}
