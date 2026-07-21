export const GET_BRANCHES_REQUEST = "GET_BRANCHES_REQUEST";
export const GET_BRANCHES_SUCCESS = "GET_BRANCHES_SUCCESS";
export const GET_BRANCHES_FAILURE = "GET_BRANCHES_FAILURE";

export const getBranchesRequest = () => ({
  type: GET_BRANCHES_REQUEST,
});

export const getBranchesSuccess = (data) => ({
  type: GET_BRANCHES_SUCCESS,
  payload: data,
});

export const getBranchesFailure = (error) => ({
  type: GET_BRANCHES_FAILURE,
  payload: error,
});
