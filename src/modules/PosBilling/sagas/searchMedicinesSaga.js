import { call, put, takeLatest } from "redux-saga/effects";
import {
  SEARCH_MEDICINES_REQUEST,
  searchMedicinesSuccess,
  searchMedicinesFailure,
} from "../actions/searchMedicinesActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

function* handleSearchMedicines(action) {
  try {
    console.log("🚀 Saga triggered: Searching Medicines...", action.payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.searchMedicines,
      API_METHODS.POST,
      { query: action.payload }
    );

    console.log("📥 Search Medicines API response:", response);

    if (response && response.success) {
      yield put(searchMedicinesSuccess(response.data));
    } else {
      yield put(
        searchMedicinesFailure(response?.message || "Failed to search medicines")
      );
    }
  } catch (error) {
    yield put(searchMedicinesFailure(error.message));
  }
}

export function* watchSearchMedicines() {
  yield takeLatest(SEARCH_MEDICINES_REQUEST, handleSearchMedicines);
}
