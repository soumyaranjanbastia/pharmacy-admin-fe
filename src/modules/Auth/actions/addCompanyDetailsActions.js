// Action Types
export const ADD_COMPANY_DETAILS_REQUEST = "ADD_COMPANY_DETAILS_REQUEST";
export const ADD_COMPANY_DETAILS_SUCCESS = "ADD_COMPANY_DETAILS_SUCCESS";
export const ADD_COMPANY_DETAILS_FAILURE = "ADD_COMPANY_DETAILS_FAILURE";

// Action Creators
export const addCompanyDetailsRequest = (payload) => {
  console.log("📤 Dispatching ADD_COMPANY_DETAILS_REQUEST:", payload);
  return {
    type: ADD_COMPANY_DETAILS_REQUEST,
    payload,
  };
};

export const addCompanyDetailsSuccess = (data) => ({
  type: ADD_COMPANY_DETAILS_SUCCESS,
  payload: data,
});

export const addCompanyDetailsFailure = (error) => ({
  type: ADD_COMPANY_DETAILS_FAILURE,
  payload: error,
});
