import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../../../constants/colors";

const CalendarSingleDate = (props) => {
  const { date, weekday } = props;

  return (
    <View style={{ ...styles.container, ...props.style }}>
      <Text style={styles.text}>{weekday}</Text>
      <Text style={styles.text}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  text: {
    color: Colors.text,
    marginBottom: 5,
  },
});

export default CalendarSingleDate;
