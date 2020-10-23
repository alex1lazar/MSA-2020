import React from "react";
import { StyleSheet, View } from "react-native";

import CalendarDates from "./components/CalendarDates";

const currentDates = [
  { weekday: "F", date: "23.10" },
  { weekday: "S", date: "24.10" },
  { weekday: "S", date: "25.10" },
];

const Home = () => {
  return (
    <View>
      {/* TODO: Calendar functionality
      <Calendar/> */}
      <View style={styles.calendarContainer}>
        {/* <Icon/> */}
        <CalendarDates currentDates={currentDates} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: "row",
  },
});

export default Home;
