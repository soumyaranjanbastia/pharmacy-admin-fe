import { call, put, takeLatest } from "redux-saga/effects";
import {
  CREATE_USER_REQUEST,
  createUserSuccess,
  createUserFailure,
} from "../actions/createUserActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

function* handleCreateUser(action) {
  try {
    console.log("🚀 Saga Triggered: Create User, Payload:", action.payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.createUser,
      API_METHODS.POST,
      action.payload
    );

    console.log("📥 Create User API Response:", response);

    if (response && response.success) {
      yield put(createUserSuccess(response));
    } else {
      yield put(
        createUserFailure(response?.message || "Failed to create user")
      );
    }
  } catch (error) {
    yield put(createUserFailure(error.message));
  }
}

export function* watchCreateUser() {
  yield takeLatest(CREATE_USER_REQUEST, handleCreateUser);
}
