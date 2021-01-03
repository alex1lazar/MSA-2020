import { UPDATE_TASKS } from "./types";

export const updateTasks = (payload) => {
  return {
    type: UPDATE_TASKS,
    payload: payload,
  };
};
