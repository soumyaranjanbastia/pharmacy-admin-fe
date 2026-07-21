export const GET_DISTRICTS_REQUEST = "GET_DISTRICTS_REQUEST";
export const GET_DISTRICTS_SUCCESS = "GET_DISTRICTS_SUCCESS";
export const GET_DISTRICTS_FAILURE = "GET_DISTRICTS_FAILURE";

export const getDistrictsRequest = () => ({
  type: GET_DISTRICTS_REQUEST,
});

export const getDistrictsSuccess = (data) => ({
  type: GET_DISTRICTS_SUCCESS,
  payload: data,
});

export const getDistrictsFailure = (error) => ({
  type: GET_DISTRICTS_FAILURE,
  payload: error,
});
