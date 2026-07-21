export const SEARCH_MEDICINES_REQUEST = "SEARCH_MEDICINES_REQUEST";
export const SEARCH_MEDICINES_SUCCESS = "SEARCH_MEDICINES_SUCCESS";
export const SEARCH_MEDICINES_FAILURE = "SEARCH_MEDICINES_FAILURE";

export const searchMedicinesRequest = (query) => ({
  type: SEARCH_MEDICINES_REQUEST,
  payload: query,
});

export const searchMedicinesSuccess = (data) => ({
  type: SEARCH_MEDICINES_SUCCESS,
  payload: data,
});

export const searchMedicinesFailure = (error) => ({
  type: SEARCH_MEDICINES_FAILURE,
  payload: error,
});
