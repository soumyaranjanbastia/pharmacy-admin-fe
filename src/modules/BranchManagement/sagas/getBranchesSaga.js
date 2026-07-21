import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_BRANCHES_REQUEST,
  getBranchesSuccess,
  getBranchesFailure,
} from "../actions/getBranchesActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

function* handleGetBranches() {
  try {
    console.log("🚀 Saga triggered: Fetching Branches...");

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.getBranches,
      API_METHODS.POST
    );

    console.log("📥 Branches API response:", response);

    if (response && response.success) {
      yield put(getBranchesSuccess(response.data));
    } else {
      yield put(
        getBranchesFailure(response?.message || "Failed to fetch branches")
      );
    }
  } catch (error) {
    yield put(getBranchesFailure(error.message));
  }
}

export function* watchGetBranches() {
  yield takeLatest(GET_BRANCHES_REQUEST, handleGetBranches);
}
