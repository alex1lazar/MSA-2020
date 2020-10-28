import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import Colors from "../../../constants/colors";

const CalendarSingleDate = (props) => {
  const { date, setCurrentDate } = props;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setCurrentDate(date);
      }}
    >
      <View style={{ ...styles.container, ...props.style }} onTouch>
        <Text style={styles.text}>{date.weekday}</Text>
        <Text style={styles.text}>{date.date}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
  },
  text: {
    color: Colors.text,
    marginBottom: 5,
  },
});

export default CalendarSingleDate;
