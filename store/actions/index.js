import {
  GET_USER_TASKS,
  UPDATE_ERROR,
  UPDATE_SELECTED_DATE,
  UPDATE_TASKS,
  UPDATE_UID,
} from "./types";

export const getUserTasks = (payload) => {
  return {
    type: GET_USER_TASKS,
    payload: payload,
  };
};

export const updateTasks = (payload) => {
  return {
    type: UPDATE_TASKS,
    payload: payload,
  };
};

export const updateError = (payload) => {
  return {
    type: UPDATE_ERROR,
    payload: payload,
  };
};

export const updateUid = (payload) => {
  return {
    type: UPDATE_UID,
    payload: payload,
  };
};

export const updateSelectedDate = (payload) => {
  return {
    type: UPDATE_SELECTED_DATE,
    payload: payload,
  };
};
