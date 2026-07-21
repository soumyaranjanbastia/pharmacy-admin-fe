import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_DISTRICTS_REQUEST,
  getDistrictsSuccess,
  getDistrictsFailure,
} from "../actions/getDistrictsActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

function* handleGetDistricts() {
  try {
    console.log("🚀 Saga triggered: Fetching Districts...");

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.getDistricts,
      API_METHODS.POST
    );

    console.log("📥 Districts API response:", response);

    if (response && response.success) {
      yield put(getDistrictsSuccess(response.data));
    } else {
      yield put(
        getDistrictsFailure(response?.message || "Failed to fetch districts")
      );
    }
  } catch (error) {
    yield put(getDistrictsFailure(error.message));
  }
}

export function* watchGetDistricts() {
  yield takeLatest(GET_DISTRICTS_REQUEST, handleGetDistricts);
}
