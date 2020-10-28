import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";

import { updateTasks } from "../../store/actions";

import CalendarDates from "./components/CalendarDates";
import Task from "./components/Task";

const currentDates = [
  { weekday: "F", date: "23.10" },
  { weekday: "S", date: "24.10" },
  { weekday: "S", date: "25.10" },
];

const tasksData = [
  {
    name: "Task1",
    checked: false,
    priority: "high",
    subtasks: [
      { name: "Subtask 1", checked: false },
      { name: "Subtask 2", checked: false },
    ],
  },
  { name: "Task2", checked: false, priority: "low" },
];

const Home = () => {
  const tasks = useSelector((state) => state.profile.tasks);
  const dispatch = useDispatch();

  const renderedTasks = tasks.map((task, i) => {
    return <Task task={task} key={i} />;
  });

  useEffect(() => {
    dispatch(updateTasks(tasksData));
  }, []);

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
