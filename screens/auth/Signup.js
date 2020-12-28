import * as React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, Alert } from "react-native";
import Firebase, { db } from "../../config/Firebase";

const SignupPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  async function handleSignup() {
    try {
      const response = await Firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      if (response.user.uid) {
        const user = {
          uid: response.user.uid,
          fullName: fullName,
          email: email,
        };

        db.collection("users").doc(response.user.uid).set(user);
        navigation.navigate("Home");
      }
    } catch (e) {
      console.log(e);
    }
  }

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
          <Button
            onPress={() => handleSignup()}
            title="SIGN UP"
            color="#A53F2B"
          />
        </View>
        <View style={styles.secondaryBttn}>
          <Button
            title="Login"
            onPress={() => navigation.navigate("Login")}
          ></Button>
        </View>
      </View>
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
  },
  button: {
    paddingTop: 24,
    // borderRadius: 24,
  },
  secondaryBttn: {
    backgroundColor: "#fff",
    color: "transparent",
  },
});
// Firebase.auth()
//   .createUserWithEmailAndPassword(email, password)
//   .then(() => {
//

//     db.collection("users").doc().set({
//       fullName: fullName,
//       email: email,
//     });
//   })
//   .catch((error) => console.log(error));
