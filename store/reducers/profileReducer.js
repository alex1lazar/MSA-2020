import { GET_USER, SIGN_IN, UPDATE_TASKS } from "../actions/types";

const INITIAL_STATE = {
  uid: "",
  data: {},
  tasks: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN: {
      return { ...state, uid: action.payload };
    }
    case GET_USER: {
      return { ...state, data: action.payload };
    }
    case UPDATE_TASKS: {
      return {
        ...state,
        tasks: action.payload,
      };
    }
    default:
      return state;
  }
};
