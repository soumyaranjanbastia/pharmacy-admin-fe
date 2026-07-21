import { call, put, takeLatest } from "redux-saga/effects";
import {
  DELETE_BRANCH_REQUEST,
  deleteBranchSuccess,
  deleteBranchFailure,
} from "../actions/deleteBranchActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

function* handleDeleteBranch(action) {
  try {
    console.log("🚀 Deleting branch with ID:", action.payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.deleteBranch,
      API_METHODS.POST,
      action.payload // { branchId }
    );

    console.log("📥 Delete Branch API response:", response);

    if (response && response.success) {
      yield put(deleteBranchSuccess(response));
    } else {
      yield put(deleteBranchFailure(response?.message || "Failed to delete branch"));
    }
  } catch (error) {
    yield put(deleteBranchFailure(error.message));
  }
}

export function* watchDeleteBranch() {
  yield takeLatest(DELETE_BRANCH_REQUEST, handleDeleteBranch);
}
