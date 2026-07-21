import { call, put, takeLatest } from "redux-saga/effects";
import {
  CREATE_BRANCH_REQUEST,
  createBranchSuccess,
  createBranchFailure,
} from "../actions/createBranchActions";
import {
  GET_BRANCHES_REQUEST,
} from "../actions/getBranchesActions";
import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

function* handleCreateBranch(action) {
  try {
    console.log("🚀 Saga triggered: Create Branch", action.payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.createBranch,
      API_METHODS.POST,
      action.payload
    );

    console.log("📥 Create Branch API response:", response);

    if (response && response.success) {
      yield put(createBranchSuccess(response));
       yield put({ type: GET_BRANCHES_REQUEST });
    } else {
      yield put(
        createBranchFailure(response?.message || "Failed to create branch")
      );
    }
  } catch (error) {
    yield put(createBranchFailure(error.message));
  }
}

export function* watchCreateBranch() {
  yield takeLatest(CREATE_BRANCH_REQUEST, handleCreateBranch);
}
