import {
  USER_EXIST_REQUEST,
  USER_EXIST_SUCCESS,
  USER_EXIST_FAILURE,
  USER_EXIST_CLEAR,
} from "../actions/userExistActions";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const userExistReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_EXIST_REQUEST:
      console.log("🟡 Reducer => USER_EXIST_REQUEST:", action.payload);
      return { ...state, loading: true, error: null };

    case USER_EXIST_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case USER_EXIST_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case USER_EXIST_CLEAR:
      return initialState;

    default:
      return state;
  }
};

export default userExistReducer;
