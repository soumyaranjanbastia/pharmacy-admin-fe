import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_COUNTRY_REQUEST,
  getCountrySuccess,
  getCountryFailure,
} from "../actions/getCountryActions";

import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

// Worker Saga
function* handleGetCountry() {
  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.getCountryData,
      API_METHODS.POST
    );

    if (response.success) {
      yield put(getCountrySuccess(response.data));
    } else {
      yield put(getCountryFailure(response.message || "Failed to fetch countries"));
    }
  } catch (error) {
    yield put(getCountryFailure(error.message));
  }
}

// Watcher Saga
export function* watchGetCountry() {
  yield takeLatest(GET_COUNTRY_REQUEST, handleGetCountry);
}
