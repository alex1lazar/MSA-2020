import Firebase, { db } from "../../config/Firebase";
import {
  GET_USER,
  SIGN_IN,
  UPDATE_ERROR,
  UPDATE_SELECTED_DATE,
  UPDATE_TASKS,
  UPDATE_UID,
} from "./types";

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

export const getUser = (uid) => async (dispatch) => {
  try {
    const user = await db.collection("users").doc(uid).get();

    dispatch({ type: GET_USER, payload: user.data() });
  } catch (err) {
    console.log(err);
  }
};

export const signIn = (email, password) => async (dispatch) => {
  try {
    const response = await Firebase.auth().signInWithEmailAndPassword(
      email,
      password
    );

    dispatch({ type: SIGN_IN, payload: response.user.uid });
  } catch (err) {
    console.log(err);
  }
};
