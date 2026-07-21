import { call, put, takeLatest } from "redux-saga/effects";
import {
  ADD_COMPANY_DETAILS_REQUEST,
  addCompanyDetailsSuccess,
  addCompanyDetailsFailure,
} from "../actions/addCompanyDetailsActions";

import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

// Worker Saga
function* handleAddCompanyDetails(action) {
  console.log("📝 Saga received payload:", action.payload);
  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.addCompanyDetails,
      API_METHODS.POST,
      action.payload
    );
   console.log("Company Details Saga response:",response);
    if (response && response.success) {
      yield put(addCompanyDetailsSuccess(response));
    } else {
      yield put(addCompanyDetailsFailure(response?.message || "Failed to add company details"));
    }
  } catch (error) {
    yield put(addCompanyDetailsFailure(error.message));
  }
}

// Watcher Saga
export function* watchAddCompanyDetails() {
  yield takeLatest(ADD_COMPANY_DETAILS_REQUEST, handleAddCompanyDetails);
}
