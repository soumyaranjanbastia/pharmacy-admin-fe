import { call, put, takeLatest } from "redux-saga/effects";
import {
  SET_PIN_REQUEST,
  setPinSuccess,
  setPinFailure,
} from "../actions/setPinActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

// Worker Saga
function* handleSetPin(action) {
  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.setPin,
      API_METHODS.POST,
      action.payload
    );

    if (response && response.success) {
      yield put(setPinSuccess(response));
    } else {
      yield put(setPinFailure(response?.message || "Failed to set PIN"));
    }
  } catch (error) {
    yield put(setPinFailure(error.message));
  }
}

// Watcher Saga
export function* watchSetPin() {
  yield takeLatest(SET_PIN_REQUEST, handleSetPin);
}
