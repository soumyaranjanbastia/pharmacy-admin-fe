// src/actions/auth/getCertificationActions.js

export const GET_CERTIFICATION_REQUEST = "GET_CERTIFICATION_REQUEST";
export const GET_CERTIFICATION_SUCCESS = "GET_CERTIFICATION_SUCCESS";
export const GET_CERTIFICATION_FAILURE = "GET_CERTIFICATION_FAILURE";
export const CLEAR_GET_CERTIFICATION = "CLEAR_GET_CERTIFICATION";

// Action Creators
export const getCertificationRequest = (payload) => {
  console.log("📤 Dispatching GET_CERTIFICATION_REQUEST with payload:", payload);
  return {
    type: GET_CERTIFICATION_REQUEST,
    payload, // { companyTypeId }
  };
};

export const getCertificationSuccess = (data) => ({
  type: GET_CERTIFICATION_SUCCESS,
  payload: data,
});

export const getCertificationFailure = (error) => ({
  type: GET_CERTIFICATION_FAILURE,
  payload: error,
});

export const clearGetCertification = () => ({
  type: CLEAR_GET_CERTIFICATION,
});
