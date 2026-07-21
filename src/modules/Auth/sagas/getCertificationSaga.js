// src/sagas/auth/getCertificationSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_CERTIFICATION_REQUEST,
  getCertificationSuccess,
  getCertificationFailure,
} from "../actions/getCertificationActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

// Worker Saga
function* handleGetCertification(action) {
  console.log("📝 Saga received payload:", action.payload);
  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.getCertification,
      API_METHODS.POST,
      action.payload
    );

    console.log("📥 Get Certification API response:", response);

    if (response && response.success) {
      yield put(getCertificationSuccess(response));
    } else {
      yield put(
        getCertificationFailure(response?.message || "Failed to fetch certification list")
      );
    }
  } catch (error) {
    yield put(getCertificationFailure(error.message));
  }
}

// Watcher Saga
export function* watchGetCertification() {
  yield takeLatest(GET_CERTIFICATION_REQUEST, handleGetCertification);
}
