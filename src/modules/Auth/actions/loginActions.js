// // // Action Types
// export const LOGIN_REQUEST = "LOGIN_REQUEST";
// export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// export const LOGIN_FAILURE = "LOGIN_FAILURE";

// // Action Creators
// export const loginRequest = (payload) => {
//   console.log("📤 Dispatching LOGIN_REQUEST with payload:", payload);
//   return {
//     type: LOGIN_REQUEST,
//     payload,
//   };
// };

// export const loginSuccess = (data) => ({
//   type: LOGIN_SUCCESS,
//   payload: data,
// });

// export const loginFailure = (error) => ({
//   type: LOGIN_FAILURE,
//   payload: error,
// });


// ===== 1. UPDATED ACTION (loginActions.js) =====
// Action Types
// export const LOGIN_REQUEST = "LOGIN_REQUEST";
// export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// export const LOGIN_FAILURE = "LOGIN_FAILURE";

// // Action Creators
// export const loginRequest = (payload) => {
//   console.log("📤 Dispatching LOGIN_REQUEST with payload:", payload);
//   return {
//     type: LOGIN_REQUEST,
//     payload,
//   };
// };

// export const loginSuccess = (data, statusCode = 200) => ({
//   type: LOGIN_SUCCESS,
//   payload: {
//     data,
//     statusCode
//   },
// });

// export const loginFailure = (error, statusCode = 500) => ({
//   type: LOGIN_FAILURE,
//   payload: {
//     error,
//     statusCode
//   },
// });




// src/actions/auth/loginActions.js

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_CLEAR = "LOGIN_CLEAR";

export const loginRequest = (payload) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload) => ({
  type: LOGIN_FAILURE,
  payload,
});

export const loginClear = () => ({
  type: LOGIN_CLEAR,
});
