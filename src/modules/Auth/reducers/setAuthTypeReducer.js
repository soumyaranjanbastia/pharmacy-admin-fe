import {
  SET_AUTH_TYPE_REQUEST,
  SET_AUTH_TYPE_SUCCESS,
  SET_AUTH_TYPE_FAILURE,
} from "../actions/setAuthTypeActions";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const setAuthTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_TYPE_REQUEST:
      console.log("🟡 Reducer => SET_AUTH_TYPE_REQUEST:", action.payload);
      return { ...state, loading: true, error: null };

    case SET_AUTH_TYPE_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case SET_AUTH_TYPE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default setAuthTypeReducer;
