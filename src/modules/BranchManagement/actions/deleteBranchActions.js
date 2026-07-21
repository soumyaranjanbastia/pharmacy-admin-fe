export const DELETE_BRANCH_REQUEST = "DELETE_BRANCH_REQUEST";
export const DELETE_BRANCH_SUCCESS = "DELETE_BRANCH_SUCCESS";
export const DELETE_BRANCH_FAILURE = "DELETE_BRANCH_FAILURE";
export const DELETE_BRANCH_CLEAR = "DELETE_BRANCH_CLEAR";

export const deleteBranchRequest = (branchId) => ({
  type: DELETE_BRANCH_REQUEST,
  payload: { branchId }, // 👈 send branchId
});

export const deleteBranchSuccess = (data) => ({
  type: DELETE_BRANCH_SUCCESS,
  payload: data,
});

export const deleteBranchFailure = (error) => ({
  type: DELETE_BRANCH_FAILURE,
  payload: error,
});

export const deleteBranchClear = () => ({
  type: DELETE_BRANCH_CLEAR,
});
