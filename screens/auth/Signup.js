import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import Firebase, { db } from "../../config/Firebase";

import { updateError } from "../../store/actions";

import ErrorBox from "../../core/components/ErrorBox";
import AsyncStorage from "@react-native-community/async-storage";

const SignupPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const error = useSelector((state) => state.profile.authError);
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem("loggedIn").then((data) => {
      if (data) navigation.navigate("Login");
    });

    Firebase.auth().onAuthStateChanged((user) => {
      if (user) navigation.navigate("Todo");
    });
  }, []);

  const signUp = async () => {
    if (fullName === "") dispatch(updateError("Full name is required !"));
    else
      try {
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

          //navigate to home
          navigation.navigate("Todo");
        }
      } catch (err) {
        dispatch(updateError(err.message));
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.signupContainer}>
        <Text style={styles.titleText}>Sign up to be more productive</Text>

        <Text style={styles.subtitleText}>Full Name</Text>
        <View>
          <TextInput
            style={styles.inputText}
            placeholder="e.g. John Doe"
            placeholderTextColor="#9A9A9A"
            onChangeText={(fullName) => setFullName(fullName)}
          />
        </View>

        <Text style={styles.subtitleText}>Email</Text>
        <View>
          <TextInput
            style={styles.inputText}
            placeholder="e.g. x@mail.com"
            placeholderTextColor="#9A9A9A"
            onChangeText={(email) => setEmail(email)}
            defaultValue={email}
          />
        </View>

        <Text style={styles.subtitleText}>Password</Text>
        <View>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="more than 7 characters"
            placeholderTextColor="#9A9A9A"
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <View style={styles.button}>
          <Button onPress={signUp} title="SIGN UP" color="#A53F2B" />
        </View>
        <View style={styles.secondaryBttn}>
          <Button
            title="Go to Sign In"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>

      {error !== "" && <ErrorBox error={error} />}
    </View>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#020D0D",
    height: "100%",
    alignItems: "center",
  },

  signupContainer: {
    color: "#fff",
    flex: 1,
    alignItems: "left",
    paddingTop: 25,
    width: "80%",
  },
  titleText: {
    color: "#fff",
    opacity: 87,
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 8,
  },
  subtitleText: {
    paddingTop: 24,
    paddingBottom: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    opacity: 87,
  },

  inputText: {
    color: "#fff",
    opacity: 87,
    paddingBottom: 4,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    outlineWidth: 0,
  },
  button: {
    paddingTop: 24,
    // borderRadius: 24,
  },
  secondaryBttn: {
    backgroundColor: "#fff",
    color: "transparent",
    marginTop: 24,
  },
});
