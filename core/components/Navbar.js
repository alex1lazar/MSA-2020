import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

import Colors from "../../constants/colors";

const navbarOptions = [
  { iconName: "check-square", iconType: "feather", size: 32, text: "Todo" },
  { iconName: "ios-add-circle", iconType: "ionicon", size: 52 },
  { iconName: "ios-alarm", iconType: "ionicon", size: 32, text: "Focus" },
];

const Navbar = () => {
  const renderedOptions = navbarOptions.map((option, index) => (
    <View key={index}>
      <Icon
        name={option.iconName}
        type={option.iconType}
        size={option.size}
        color={Colors.text}
      />

      <Text style={styles.optionText}>{option.text}</Text>
    </View>
  ));

  return <View style={styles.navbar}>{renderedOptions}</View>;
};

const styles = StyleSheet.create({
  navbar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 70,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 70,
    paddingVertical: 5,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  optionText: {
    color: Colors.text,
  },
});

export default Navbar;
