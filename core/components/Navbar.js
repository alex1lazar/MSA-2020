import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";

import Colors from "../../constants/colors";

const navbarOptions = [
  {
    iconName: "check-square",
    iconType: "feather",
    size: 32,
    text: "Todo",
    component: "Todo",
  },
  {
    iconName: "bar-chart-2",
    iconType: "feather",
    size: 32,
    text: "Statistics",
    component: "Statistics",
  },
  {
    iconName: "ios-alarm",
    iconType: "ionicon",
    size: 32,
    text: "Focus",
    component: "Focus",
  },
];

const Navbar = ({ navigation }) => {
  const route = useRoute();

  const renderedOptions = navbarOptions.map((option, index) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate(option.component)}
      key={index}
    >
      <View onTouch>
        <Icon
          name={option.iconName}
          type={option.iconType}
          size={option.size}
          color={route.name === option.component ? "#fff" : Colors.text}
        />

        <Text
          style={
            route.name === option.component
              ? styles.selectedOptionText
              : styles.optionText
          }
        >
          {option.text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  ));

  return <View style={styles.navbar}>{renderedOptions}</View>;
};

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 70,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 50,
    paddingVertical: 5,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  optionText: {
    color: Colors.text,
  },

  selectedOptionText: {
    color: "#fff",
  },
});

export default Navbar;
