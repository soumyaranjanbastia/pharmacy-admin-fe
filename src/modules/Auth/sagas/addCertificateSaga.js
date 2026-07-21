// src/sagas/auth/addCertificateSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import {
  ADD_CERTIFICATE_REQUEST,
  addCertificateSuccess,
  addCertificateFailure,
} from "../actions/addCertificateActions";

import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

function* handleAddCertificate(action) {
  console.log("📝 Saga received payload:", action.payload);
  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.addCertificate,
      API_METHODS.POST,
      action.payload
    );

    console.log("📥 Add Certificate API response:", response);

    if (response && response.success) {
      yield put(addCertificateSuccess(response));
    } else {
      yield put(addCertificateFailure(response?.message || "Failed to add certificate"));
    }
  } catch (error) {
    yield put(addCertificateFailure(error.message));
  }
}

export function* watchAddCertificate() {
  yield takeLatest(ADD_CERTIFICATE_REQUEST, handleAddCertificate);
}
