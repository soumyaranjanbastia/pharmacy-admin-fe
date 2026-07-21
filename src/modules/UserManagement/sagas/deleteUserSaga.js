import { call, put, takeLatest } from "redux-saga/effects";
import {
  DELETE_USER_REQUEST,
  deleteUserSuccess,
  deleteUserFailure,
} from "../actions/deleteUserActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

function* handleDeleteUser(action) {
  try {
    console.log("🗑 Delete user saga called with:", action.payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.deleteUser,
      API_METHODS.POST,
      action.payload
    );

    console.log("📥 Delete User API response:", response);

    if (response && response.success) {
      yield put(deleteUserSuccess(response));
    } else {
      yield put(deleteUserFailure(response?.message || "Delete failed"));
    }
  } catch (error) {
    yield put(deleteUserFailure(error.message));
  }
}

export function* watchDeleteUser() {
  yield takeLatest(DELETE_USER_REQUEST, handleDeleteUser);
}
