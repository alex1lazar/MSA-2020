import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

import { updateError, updateUid } from "../../store/actions";

import ErrorBox from "../../core/components/ErrorBox";
import Firebase from "../../config/Firebase";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const error = useSelector((state) => state.profile.authError);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Test");
  }, []);

  const signIn = async () => {
    try {
      const response = await Firebase.auth().signInWithEmailAndPassword(
        email,
        password
      );

      await AsyncStorage.setItem("loggedIn", true);
      dispatch(updateUid(response.user.uid));

      navigation.navigate("Todo");
    } catch (err) {
      dispatch(updateError(err.message));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.titleText}>Log into your account</Text>
        <Text style={styles.subtitleText}>Email</Text>
        <View>
          <TextInput
            style={styles.inputText}
            placeholder="e.g. x@mail.com"
            placeholderTextColor="#9A9A9A"
            onChangeText={(email) => setEmail(email)}
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
          <Button onPress={signIn} title="Sign In" color="#A53F2B" />
        </View>

        <View style={styles.secondaryBttn}>
          <Button
            title="Go to Sign Up"
            onPress={() => navigation.navigate("Signup")}
          />
        </View>
      </View>

      {error !== "" && <ErrorBox error={error} />}
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#020D0D",
    height: "100%",
    alignItems: "center",
  },

  loginContainer: {
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
    fontWeight: "medium",
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
  },

  secondaryBttn: {
    marginTop: 24,
    backgroundColor: "#020D0D",
  },
});
