import { call, put, takeLatest } from "redux-saga/effects";
import {
  CREATE_POS_SALE_REQUEST,
  createPosSaleSuccess,
  createPosSaleFailure,
} from "../actions/createPosSaleActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

function* handleCreatePosSale(action) {
  try {
    console.log("🚀 Saga triggered: Creating POS Sale...", action.payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.createPosSale,
      API_METHODS.POST,
      action.payload
    );

    console.log("📥 Create POS Sale API response:", response);

    if (response && response.success) {
      yield put(createPosSaleSuccess(response.data));
    } else {
      yield put(
        createPosSaleFailure(response?.message || "Failed to create POS sale")
      );
    }
  } catch (error) {
    yield put(createPosSaleFailure(error.message));
  }
}

export function* watchCreatePosSale() {
  yield takeLatest(CREATE_POS_SALE_REQUEST, handleCreatePosSale);
}
