import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_PLANS_REQUEST,
  getPlansSuccess,
  getPlansFailure,
} from "../actions/getPlansActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

// Worker Saga
function* handleGetPlans(action) {
  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.getPlans,
      API_METHODS.POST,
      action.payload || {} // send payload if needed
    );

    if (response && response.success) {
      yield put(getPlansSuccess(response));
    } else {
      yield put(getPlansFailure(response?.message || "Failed to fetch plans"));
    }
  } catch (error) {
    yield put(getPlansFailure(error.message));
  }
}

// Watcher Saga
export function* watchGetPlans() {
  yield takeLatest(GET_PLANS_REQUEST, handleGetPlans);
}
