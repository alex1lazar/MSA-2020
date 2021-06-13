import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View } from "react-native";

import Colors from "../../../constants/colors";

import { updateSelectedDate } from "../../../store/actions";

import CalendarSingleDate from "./CalendarSingleDate";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const createNextDates = () => {
  var dates = [];
  var currentDate = new Date();

  for (var i = 0; i <= 6; i++) {
    if (i > 0) currentDate.setDate(currentDate.getDate() + 1);

    const dateDay = currentDate.getDate().toString();
    const dateMonth = (currentDate.getMonth() + 1).toString();
    const weekday = days[currentDate.getDay()].charAt(0);
    const date = { date: dateDay + "." + dateMonth, weekday };

    dates = [...dates, date];
  }

  return dates;
};

const CalendarDates = () => {
  const [currentActiveDate, setCurrentActiveDate] = useState("");
  const dispatch = useDispatch();
  const dates = createNextDates();

  useEffect(() => {
    // Get current date with day and month
    const today = new Date();
    const day = today.getUTCDate().toString();
    const month = (today.getUTCMonth() + 1).toString();

    setCurrentActiveDate(day + "." + month);
  }, []);

  useEffect(() => {
    dispatch(updateSelectedDate(currentActiveDate));
  }, [currentActiveDate]);

  const renderedDates = dates.map((date, i) => (
    <CalendarSingleDate
      setCurrentDate={(date) => {
        setCurrentActiveDate(date.date);
      }}
      date={date}
      style={currentActiveDate === date.date && styles.activeDay}
      key={i}
    />
  ));

  return <View style={styles.datesContainer}>{renderedDates}</View>;
};

const styles = StyleSheet.create({
  activeDay: {
    borderColor: Colors.secondaryLight,
    borderWidth: 1,
  },

  datesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    width: "100%",
    paddingLeft: "4vw",
    paddingRight: "4vw",
    flex: 1,
  },
});

export default CalendarDates;
