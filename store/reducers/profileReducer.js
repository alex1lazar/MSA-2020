import {
  GET_USER,
  SIGN_IN,
  UPDATE_SELECTED_DATE,
  UPDATE_TASKS,
  UPDATE_ERROR,
  UPDATE_UID,
} from "../actions/types";

const INITIAL_STATE = {
  uid: "",
  data: {},
  tasks: [],
  selectedDate: "",
  authError: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_UID: {
      return { ...state, uid: action.payload };
    }
    case GET_USER: {
      return { ...state, data: action.payload };
    }
    case UPDATE_SELECTED_DATE: {
      return { ...state, selectedDate: action.payload };
    }
    case UPDATE_ERROR: {
      return { ...state, authError: action.payload };
    }
    case UPDATE_TASKS: {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    }

    default:
      return state;
  }
};
