import Firebase, { db } from "../../config/Firebase";
import { GET_USER, SIGN_IN, SIGN_UP, UPDATE_TASKS } from "./types";

export const updateTasks = (payload) => {
  return {
    type: UPDATE_TASKS,
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

export const signUp = (email, password, fullName) => async (dispatch) => {
  let user = {};

  try {
    const response = await Firebase.auth().createUserWithEmailAndPassword(
      email,
      password
    );

    if (response.user.uid) {
      user = {
        uid: response.user.uid,
        email: email,
        fullName: fullName,
      };

      db.collection("users").doc(response.user.uid).set(user);

      dispatch({ type: SIGN_UP, payload: user });
    }
  } catch (err) {
    console.log(err);
  }
};
