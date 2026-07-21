// src/actions/auth/addCertificateActions.js
export const ADD_CERTIFICATE_REQUEST = "ADD_CERTIFICATE_REQUEST";
export const ADD_CERTIFICATE_SUCCESS = "ADD_CERTIFICATE_SUCCESS";
export const ADD_CERTIFICATE_FAILURE = "ADD_CERTIFICATE_FAILURE";
export const CLEAR_ADD_CERTIFICATE = "CLEAR_ADD_CERTIFICATE";

export const addCertificateRequest = (payload) => {
  console.log("📤 Dispatching ADD_CERTIFICATE_REQUEST with payload:", payload);
  return {
    type: ADD_CERTIFICATE_REQUEST,
    payload, // { companyId, certificates: [{certificateName, frontPhoto, backPhoto}] }
  };
};

export const addCertificateSuccess = (data) => ({
  type: ADD_CERTIFICATE_SUCCESS,
  payload: data,
});

export const addCertificateFailure = (error) => ({
  type: ADD_CERTIFICATE_FAILURE,
  payload: error,
});

export const clearAddCertificate = () => ({
  type: CLEAR_ADD_CERTIFICATE,
});
