// // src/actions/auth/getAllCouponsActions.js
// export const GET_ALL_COUPONS_REQUEST = "GET_ALL_COUPONS_REQUEST";
// export const GET_ALL_COUPONS_SUCCESS = "GET_ALL_COUPONS_SUCCESS";
// export const GET_ALL_COUPONS_FAILURE = "GET_ALL_COUPONS_FAILURE";

// // Action Creators
// export const getAllCouponsRequest = (payload) => {
//   console.log("📤 Dispatching GET_ALL_COUPONS_REQUEST with payload:", payload);
//   return {
//     type: GET_ALL_COUPONS_REQUEST,
//     payload, // { planId }
//   };
// };

// export const getAllCouponsSuccess = (data) => ({
//   type: GET_ALL_COUPONS_SUCCESS,
//   payload: data,
// });

// export const getAllCouponsFailure = (error) => ({
//   type: GET_ALL_COUPONS_FAILURE,
//   payload: error,
// });


export const GET_ALL_COUPONS_REQUEST = "GET_ALL_COUPONS_REQUEST";
export const GET_ALL_COUPONS_SUCCESS = "GET_ALL_COUPONS_SUCCESS";
export const GET_ALL_COUPONS_FAILURE = "GET_ALL_COUPONS_FAILURE";

export const getAllCouponsRequest = (payload) => ({
  type: GET_ALL_COUPONS_REQUEST,
  payload, // { planId }
});

export const getAllCouponsSuccess = (data) => ({
  type: GET_ALL_COUPONS_SUCCESS,
  payload: data,
});

export const getAllCouponsFailure = (error) => ({
  type: GET_ALL_COUPONS_FAILURE,
  payload: error,
});
