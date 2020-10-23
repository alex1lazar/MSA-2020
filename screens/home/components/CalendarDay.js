import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CalendarDay = (props) => {
  const { date, weekday } = props;

  return (
    <View>
      <Text>{weekday}</Text>
      <Text>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CalendarDay;
