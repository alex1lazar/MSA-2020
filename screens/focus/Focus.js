import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Navbar from "../../core/components/Navbar";

const Focus = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.focusContainer}>
      <Text>Focus</Text>

      <Navbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  focusContainer: {},
});

export default Focus;
