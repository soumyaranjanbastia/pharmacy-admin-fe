import { call, put, takeLatest } from "redux-saga/effects";
import {
  PRESCRIPTION_OCR_REQUEST,
  prescriptionOcrSuccess,
  prescriptionOcrFailure,
} from "../actions/prescriptionOcrActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

function* handlePrescriptionOcr(action) {
  try {
    console.log("🚀 Saga triggered: Extracting Prescription OCR...", action.payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.prescriptionOcr,
      API_METHODS.POST,
      action.payload
    );

    console.log("📥 Prescription OCR API response:", response);

    if (response && response.success) {
      yield put(prescriptionOcrSuccess(response.data));
    } else {
      yield put(
        prescriptionOcrFailure(response?.message || "Failed to process prescription OCR")
      );
    }
  } catch (error) {
    yield put(prescriptionOcrFailure(error.message));
  }
}

export function* watchPrescriptionOcr() {
  yield takeLatest(PRESCRIPTION_OCR_REQUEST, handlePrescriptionOcr);
}
