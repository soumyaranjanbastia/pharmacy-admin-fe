export const CREATE_POS_SALE_REQUEST = "CREATE_POS_SALE_REQUEST";
export const CREATE_POS_SALE_SUCCESS = "CREATE_POS_SALE_SUCCESS";
export const CREATE_POS_SALE_FAILURE = "CREATE_POS_SALE_FAILURE";

export const createPosSaleRequest = (payload) => ({
  type: CREATE_POS_SALE_REQUEST,
  payload,
});

export const createPosSaleSuccess = (data) => ({
  type: CREATE_POS_SALE_SUCCESS,
  payload: data,
});

export const createPosSaleFailure = (error) => ({
  type: CREATE_POS_SALE_FAILURE,
  payload: error,
});
