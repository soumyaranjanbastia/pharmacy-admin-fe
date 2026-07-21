// import {
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGIN_FAILURE,
// } from "../actions/loginActions";

// const initialState = {
//   data: null,
//   loading: false,
//   error: null,
// };

// const loginReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_REQUEST:
//       console.log("🟡 Reducer => LOGIN_REQUEST:", action.payload);
//       return { ...state, loading: true, error: null };

//     case LOGIN_SUCCESS:
//       console.log("🟢 Reducer => LOGIN_SUCCESS:", action.payload);
//       return { ...state, loading: false, data: action.payload };

//     case LOGIN_FAILURE:
//       console.error("🔴 Reducer => LOGIN_FAILURE:", action.payload);
//       return { ...state, loading: false, error: action.payload };

//     default:
//       return state;
//   }
// };

// export default loginReducer;


// ===== 2. UPDATED REDUCER (loginReducer.js) =====
// import {
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGIN_FAILURE,
// } from "../actions/loginActions";

// const initialState = {
//   data: null,
//   loading: false,
//   error: null,
//   statusCode: null,
// };

// const loginReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_REQUEST:
//       console.log("🟡 Reducer => LOGIN_REQUEST:", action.payload);
//       return { 
//         ...state, 
//         loading: true, 
//         error: null, 
//         statusCode: null,
//         data: null 
//       };

//     case LOGIN_SUCCESS:
//       console.log("🟢 Reducer => LOGIN_SUCCESS:", action.payload);
//       return { 
//         ...state, 
//         loading: false, 
//         data: action.payload.data,
//         statusCode: action.payload.statusCode,
//         error: null
//       };

//     case LOGIN_FAILURE:
//       console.error("🔴 Reducer => LOGIN_FAILURE:", action.payload);
//       return { 
//         ...state, 
//         loading: false, 
//         error: action.payload.error,
//         statusCode: action.payload.statusCode,
//         data: null
//       };

//     default:
//       return state;
//   }
// };

// export default loginReducer;



// src/reducers/auth/loginReducer.js
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_CLEAR,
} from "../actions/loginActions";
import { LOGOUT_SUCCESS } from "../actions/logoutActions";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      console.log("🟡 Reducer => LOGIN_REQUEST:", action.payload);
      return { ...state, loading: true, error: null };

    case LOGIN_SUCCESS:
      console.log("🟢 Reducer => LOGIN_SUCCESS:", action.payload);
      return {
        ...state,
        loading: false,
        data: action.payload, // may include success:true OR false
        error: null,          // ❌ no error for success:false
      };

    case LOGIN_FAILURE:
      console.error("🔴 Reducer => LOGIN_FAILURE:", action.payload);
      return { ...state, loading: false, error: action.payload };

    case LOGIN_CLEAR:
    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};

export default loginReducer;
