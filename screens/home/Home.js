import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";

import Colors from "../../constants/colors";
import { updateTasks } from "../../store/actions";

import CalendarDates from "./components/CalendarDates";
import Task from "./components/Task";

const tasksData = [
  {
    id: "1",
    name: "Task1",
    checked: false,
    priority: "high",
    subtasks: [
      { id: "1", name: "Subtask 1", checked: false },
      { id: "2", name: "Subtask 2", checked: false },
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
      <View style={styles.calendarContainer}>
        <Icon
          name="calendar"
          type="evilicon"
          color={Colors.secondaryLight}
          size={44}
        />
        <CalendarDates />
      </View>

      <View style={styles.tasksContainer}>{renderedTasks}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 24,
    width: "100%",
  },
});

export default Home;
