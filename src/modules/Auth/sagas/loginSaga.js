import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
} from "../actions/loginActions";

import { apiGateway } from "../../../api/apiGateway";
import API_ENDPOINTS from "../../../api/apiEndpoints";
import { API_METHODS } from "../../../api/apiConfig";

// Worker Saga
function* handleLogin(action) {
  console.log("📝 Saga received login payload:", action.payload);
  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.login,
      API_METHODS.POST,
      action.payload
    );
console.log("Login Screen Response:", response);

    if (response) {
      // Always send to reducer (success:true OR success:false both cases)
      yield put(loginSuccess(response));
    } else {
      yield put(loginFailure("No response from server"));
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

// Watcher Saga
export function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
}


// ===== 3. UPDATED SAGA (loginSaga.js) =====
// import { call, put, takeLatest } from "redux-saga/effects";
// import {
//   LOGIN_REQUEST,
//   loginSuccess,
//   loginFailure,
// } from "../actions/loginActions";
// import { apiGateway } from "../../../api/apiGateway";
// import API_ENDPOINTS from "../../../api/apiEndpoints";
// import { API_METHODS } from "../../../api/apiConfig";

// // Worker Saga
// function* handleLogin(action) {
//   console.log("📝 Saga received login payload:", action.payload);
//   try {
//     const response = yield call(
//       apiGateway,
//       API_ENDPOINTS.login,
//       API_METHODS.POST,
//       action.payload
//     );

//     console.log("🔍 API Response:", response);

//     // ✅ Check if response has status code
//     const statusCode = response?.status || response?.statusCode || 200;
//     console.log("📊 Status Code:", statusCode);

//     // 👉 Handle different status codes
//     if (statusCode >= 200 && statusCode < 300) {
//       // Success response
//       if (response && response.success) {
//         yield put(loginSuccess(response, statusCode));
//       } else {
//         // Success status but data.success = false
//         yield put(loginSuccess(response, statusCode));
//       }
//     } else {
//       // Error status codes (400, 401, 404, 500, etc.)
//       yield put(
//         loginFailure(
//           response?.message || `Request failed with status ${statusCode}`,
//           statusCode
//         )
//       );
//     }
//   } catch (error) {
//     console.error("🚨 Saga Error:", error);
    
//     // Extract status code from error
//     const statusCode = error.response?.status || 
//                       error.status || 
//                       error.statusCode || 
//                       500;
    
//     const errorMessage = error.response?.data?.message || 
//                         error.message || 
//                         "Something went wrong";

//     yield put(loginFailure(errorMessage, statusCode));
//   }
// }

// // Watcher Saga
// export function* watchLogin() {
//   yield takeLatest(LOGIN_REQUEST, handleLogin);
// }


// // src/sagas/auth/loginSaga.js
// import { call, put, takeLatest } from "redux-saga/effects";
// import { apiGateway } from "../../../api/apiGateway";
// import API_ENDPOINTS from "../../../api/apiEndpoints";
// import { API_METHODS } from "../../../api/apiConfig";
// import {
//   LOGIN_REQUEST,
//   loginSuccess,
//   loginFailure,
// } from "../actions/loginActions";

// function* handleLogin(action) {
//   console.log("📝 Saga => LOGIN_REQUEST payload:", action.payload);
//   try {
//     const response = yield call(
//       apiGateway,
//       API_ENDPOINTS.login,
//       API_METHODS.POST,
//       action.payload
//     );

//     if (response) {
//       // ✅ both success:true and success:false will go here
//       yield put(loginSuccess(response));
//     } else {
//       yield put(loginFailure("No response from server"));
//     }
//   } catch (error) {
//     console.error("🚨 Saga => LOGIN_FAILURE:", error.message);
//     yield put(loginFailure(error.message));
//   }
// }

// export default function* watchLogin() {
//   yield takeLatest(LOGIN_REQUEST, handleLogin);
// }
