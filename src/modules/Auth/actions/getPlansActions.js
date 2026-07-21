// Action Types
export const GET_PLANS_REQUEST = "GET_PLANS_REQUEST";
export const GET_PLANS_SUCCESS = "GET_PLANS_SUCCESS";
export const GET_PLANS_FAILURE = "GET_PLANS_FAILURE";

// Action Creators
export const getPlansRequest = (payload) => ({
  type: GET_PLANS_REQUEST,
  payload, // if backend needs any payload
});

export const getPlansSuccess = (data) => ({
  type: GET_PLANS_SUCCESS,
  payload: data,
});

export const getPlansFailure = (error) => ({
  type: GET_PLANS_FAILURE,
  payload: error,
});
