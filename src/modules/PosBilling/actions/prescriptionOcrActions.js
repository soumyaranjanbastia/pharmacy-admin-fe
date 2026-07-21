export const PRESCRIPTION_OCR_REQUEST = "PRESCRIPTION_OCR_REQUEST";
export const PRESCRIPTION_OCR_SUCCESS = "PRESCRIPTION_OCR_SUCCESS";
export const PRESCRIPTION_OCR_FAILURE = "PRESCRIPTION_OCR_FAILURE";

export const prescriptionOcrRequest = (fileData) => ({
  type: PRESCRIPTION_OCR_REQUEST,
  payload: fileData,
});

export const prescriptionOcrSuccess = (data) => ({
  type: PRESCRIPTION_OCR_SUCCESS,
  payload: data,
});

export const prescriptionOcrFailure = (error) => ({
  type: PRESCRIPTION_OCR_FAILURE,
  payload: error,
});
