import * as React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Button, Alert, TextInput } from "react-native";
import Firebase, { db } from "../../config/Firebase";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // async function handleLogin() {
  //   try {
  //     const response = await Firebase.auth().signInWithEmailAndPassword(
  //       email,
  //       password
  //     );

  //     try {
  //       const user = await db.collection("users").doc(response.user.uid).get();
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  const handleLogin = () => {
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigation.navigate("Home"))
      .catch((error) => console.log(error));
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
            onChangeText={(email) => setEmail({ email })}
          />
        </View>

        <Text style={styles.subtitleText}>Password</Text>
        <View>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="more than 7 characters"
            placeholderTextColor="#9A9A9A"
            onChangeText={(password) => setPassword({ password })}
          />
        </View>

        <View style={styles.button}>
          <Button onPress={() => handleLogin()} title="LOGIN" color="#A53F2B" />
        </View>
        <View style={styles.secondaryBttn}>
          <Button
            title="Signup"
            onPress={() => navigation.navigate("Signup")}
          ></Button>
        </View>
      </View>
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
  },
  button: {
    paddingTop: 24,
  },
  secondaryBttn: {
    marginTop: 24,
    backgroundColor: "#020D0D",
  },
});

//Firebase.auth()
//   .signInWithEmailAndPassword(email, password)
//   .then(() => props.navigation.navigate("Home"))
//   .catch((error) => console.log(error));
