export const CREATE_BRANCH_REQUEST = "CREATE_BRANCH_REQUEST";
export const CREATE_BRANCH_SUCCESS = "CREATE_BRANCH_SUCCESS";
export const CREATE_BRANCH_FAILURE = "CREATE_BRANCH_FAILURE";
export const CREATE_BRANCH_CLEAR   = "CREATE_BRANCH_CLEAR";

export const createBranchRequest = (payload) => ({
  type: CREATE_BRANCH_REQUEST,
  payload,
});

export const createBranchSuccess = (data) => ({
  type: CREATE_BRANCH_SUCCESS,
  payload: data,
});

export const createBranchFailure = (error) => ({
  type: CREATE_BRANCH_FAILURE,
  payload: error,
});

export const createBranchClear = () => ({
  type: CREATE_BRANCH_CLEAR,
});
