import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

import Colors from "../../constants/colors";

const timestampToDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString("en-US", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  });
};

const History = () => {
  const tasks = useSelector((state) => state.profile.tasks).sort(
    (a, b) => b.timestamp - a.timestamp
  );

  const groupedTasks = tasks.reduce(function (r, a) {
    r[timestampToDate(a.timestamp)] = r[timestampToDate(a.timestamp)] || [];
    r[timestampToDate(a.timestamp)].push(a);
    return r;
  }, {});

  const renderedGroupedTasks = Object.entries(groupedTasks).map(
    ([key, value]) => {
      const renderedTasks = value.map((task) => {
        const renderedSubtasks = task.subtasks?.map((subtask) => {
          return (
            <View style={styles.subtaskTextContainer}>
              <Text style={styles.subtaskText}>- {subtask.name}</Text>

              <Icon
                name={subtask.checked ? "ios-checkmark" : "ios-close"}
                type="ionicon"
                size={36}
                color={
                  subtask.checked ? "rgb(48, 209, 88)" : "rgb(255, 69, 58)"
                }
              />
            </View>
          );
        });

        return (
          <View style={styles.groupedTaskContainer}>
            <View style={styles.taskTextContainer}>
              <Text style={styles.taskText}>
                {"\u25CF"} {task.name}
              </Text>

              <Icon
                name={task.checked ? "ios-checkmark" : "ios-close"}
                type="ionicon"
                size={44}
                color={task.checked ? "rgb(48, 209, 88)" : "rgb(255, 69, 58)"}
              />
            </View>

            <View>{renderedSubtasks}</View>
          </View>
        );
      });

      return (
        <View style={styles.taskContainer}>
          <Text style={styles.dateText}>{key}</Text>

          <View>{renderedTasks}</View>
        </View>
      );
    }
  );

  return (
    <View style={styles.historyContainer}>
      <Text style={styles.headerText}>History</Text>

      <View>{renderedGroupedTasks}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  dateText: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 6,
  },

  headerText: {
    color: "#fff",
    fontFamily: "Menlo",
    fontWeight: "600",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 12,
  },

  historyContainer: {
    padding: 10,
    backgroundColor: Colors.background,
    minHeight: "100vh",
  },

  groupedTaskContainer: {
    marginBottom: 6,
  },

  subtaskText: {
    color: Colors.text,
    fontSize: 16,
    marginLeft: 16,
    marginRight: 8,
  },

  subtaskTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  taskContainer: {
    marginBottom: 14,
  },

  taskText: {
    color: Colors.text,
    fontSize: 20,
    marginRight: 8,
  },

  taskTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default History;
