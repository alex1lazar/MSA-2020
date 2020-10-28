import React from "react";
import { StyleSheet, View } from "react-native";

import CalendarDates from "./components/CalendarDates";
import Task from "./components/Task";

const currentDates = [
  { weekday: "F", date: "23.10" },
  { weekday: "S", date: "24.10" },
  { weekday: "S", date: "25.10" },
];

const tasks = [
  { title: "Task1", checked: false, priority: "high" },
  { title: "Task2", checked: false, priority: "low" },
];

const Home = () => {
  const renderedTasks = tasks.map((task) => {
    return <Task task={task} />;
  });

  return (
    <View>
      {/* TODO: Calendar functionality
      <Calendar/> */}
      <View style={styles.calendarContainer}>
        {/* <Icon/> */}
        <CalendarDates currentDates={currentDates} />
      </View>

      <View style={styles.tasksContainer}>{renderedTasks}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: "row",
  },
});

export default Home;
