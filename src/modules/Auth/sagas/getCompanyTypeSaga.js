import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_COMPANYTYPE_REQUEST,
  getCompanyTypeSuccess,
  getCompanyTypeFailure,
} from "../actions/getCompanyTypeActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

function* handleGetCompanyType() {
  try {
    console.log("🚀 Saga triggered: Fetching Company Types...");

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.getCompanyType,
      API_METHODS.POST
    );

    console.log("📥 Company Type API response:", response);

    if (response && response.success) {
      yield put(getCompanyTypeSuccess(response.data));
    } else {
      yield put(
        getCompanyTypeFailure(response?.message || "Failed to fetch company types")
      );
    }
  } catch (error) {
    yield put(getCompanyTypeFailure(error.message));
  }
}

export function* watchGetCompanyType() {
  yield takeLatest(GET_COMPANYTYPE_REQUEST, handleGetCompanyType);
}
