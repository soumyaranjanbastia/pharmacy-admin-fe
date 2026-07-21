// actions/roleManagement/getRoleActions.js
export const GET_ROLE_REQUEST = "GET_ROLE_REQUEST";
export const GET_ROLE_SUCCESS = "GET_ROLE_SUCCESS";
export const GET_ROLE_FAILURE = "GET_ROLE_FAILURE";

export const getRoleRequest = () => ({
  type: GET_ROLE_REQUEST,
});

export const getRoleSuccess = (data) => ({
  type: GET_ROLE_SUCCESS,
  payload: data,
});

export const getRoleFailure = (error) => ({
  type: GET_ROLE_FAILURE,
  payload: error,
});
