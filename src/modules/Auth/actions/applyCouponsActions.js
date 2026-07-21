// src/actions/auth/applyCouponsActions.js
export const APPLY_COUPONS_REQUEST = "APPLY_COUPONS_REQUEST";
export const APPLY_COUPONS_SUCCESS = "APPLY_COUPONS_SUCCESS";
export const APPLY_COUPONS_FAILURE = "APPLY_COUPONS_FAILURE";
export const CLEAR_APPLY_COUPONS = "CLEAR_APPLY_COUPONS";
// Action Creators
export const applyCouponsRequest = (payload) => {
  console.log("📤 Dispatching APPLY_COUPONS_REQUEST with payload:", payload);
  return {
    type: APPLY_COUPONS_REQUEST,
    payload, // { planId, couponId }
  };
};

export const applyCouponsSuccess = (data) => ({
  type: APPLY_COUPONS_SUCCESS,
  payload: data,
});

export const applyCouponsFailure = (error) => ({
  type: APPLY_COUPONS_FAILURE,
  payload: error,
});
export const clearApplyCoupons = () => ({
  type: CLEAR_APPLY_COUPONS, // ✅ New
});