export const GET_COMPANYTYPE_REQUEST = "GET_COMPANYTYPE_REQUEST";
export const GET_COMPANYTYPE_SUCCESS = "GET_COMPANYTYPE_SUCCESS";
export const GET_COMPANYTYPE_FAILURE = "GET_COMPANYTYPE_FAILURE";

export const getCompanyTypeRequest = () => ({
  type: GET_COMPANYTYPE_REQUEST,
});

export const getCompanyTypeSuccess = (data) => ({
  type: GET_COMPANYTYPE_SUCCESS,
  payload: data,
});

export const getCompanyTypeFailure = (error) => ({
  type: GET_COMPANYTYPE_FAILURE,
  payload: error,
});
