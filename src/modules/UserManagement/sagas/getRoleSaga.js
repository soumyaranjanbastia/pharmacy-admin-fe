// sagas/roleManagement/getRoleSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_ROLE_REQUEST,
  getRoleSuccess,
  getRoleFailure,
} from "../actions/getRoleActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

function* handleGetRole() {
  try {
    console.log("🚀 Saga triggered: Fetching Roles...");

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.getRole,
      API_METHODS.POST
    );

    console.log("📥 Role API response:", response);

    if (response && response.success) {
      yield put(getRoleSuccess(response.data));
    } else {
      yield put(getRoleFailure(response?.message || "Failed to fetch roles"));
    }
  } catch (error) {
    yield put(getRoleFailure(error.message));
  }
}

export function* watchGetRole() {
  yield takeLatest(GET_ROLE_REQUEST, handleGetRole);
}
