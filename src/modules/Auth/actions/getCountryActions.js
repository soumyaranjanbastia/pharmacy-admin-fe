// Action Types
export const GET_COUNTRY_REQUEST = "GET_COUNTRY_REQUEST";
export const GET_COUNTRY_SUCCESS = "GET_COUNTRY_SUCCESS";
export const GET_COUNTRY_FAILURE = "GET_COUNTRY_FAILURE";

// Action Creators
export const getCountryRequest = () => ({
  type: GET_COUNTRY_REQUEST,
});

export const getCountrySuccess = (data) => ({
  type: GET_COUNTRY_SUCCESS,
  payload: data,
});

export const getCountryFailure = (error) => ({
  type: GET_COUNTRY_FAILURE,
  payload: error,
});
