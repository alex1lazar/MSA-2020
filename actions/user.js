import Firebase, { db } from "../config/Firebase";

export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";

//actions

export const updateEmail = (email) => {
  return {
    type: UPDATE_EMAIL,
    payload: email,
  };
};

export const updatePassword = (password) => {
  return {
    type: UPDATE_PASSWORD,
    payload: password,
  };
};

export const getUser = (uid) => {
  return async (dispatch) => {
    try {
      const user = await db.collection("users").doc(uid).get();

      dispatch({ type: LOGIN, payload: user.data() });
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      // const { email, password } = getState().user;
      const response = await Firebase.auth().signInWithEmailAndPassword(
        email,
        password
      );

      dispatch(getUser(response.user.uid));
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };
};

export const signup = (email, password, fullName) => {
  return async (dispatch) => {
    try {
      //   const { email, password } = user;
      const response = await Firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      );
      if (response.user.uid) {
        const user = {
          uid: response.user.uid,
          email: email,
          fullName: fullName,
        };

        db.collection("users").doc(response.user.uid).set(user);

        dispatch({ type: SIGNUP, payload: user });
      }
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };
};
