import React from "react";
import {
  FlatList,
  SectionList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "react-native-elements";

import Colors from "../../constants/colors";

import Navbar from "../../core/components/Navbar";

const Focus = (props) => {
  const { navigation } = props;

  const renderNumber = () => {
    return (
      <View style={styles.numberContainer}>
        <Text>25</Text>
      </View>
    );
  };

  return (
    <View style={styles.focusContainer}>
      <View style={styles.grid}>
        <Text style={styles.heading}>Start a focus session</Text>

        <SafeAreaView style={{ flex: 1 }}>
          <SectionList
            stickySectionHeadersEnabled={false}
            renderSectionHeader={(_) => (
              <>
                <FlatList
                  horizontal
                  data={[
                    { value: "1" },
                    { value: "2" },
                    { value: "3" },
                    { value: "4" },
                    { value: "5" },
                    { value: "6" },
                  ]}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        height: 60,
                        width: 60,
                        backgroundColor: "yellow",
                        margin: 10,
                      }}
                    >
                      <Text>{item.value}</Text>
                    </View>
                  )}
                />
              </>
            )}
          />
          <FlatList
            horizontal
            data={[
              { value: "1" },
              { value: "2" },
              { value: "3" },
              { value: "4" },
              { value: "5" },
              { value: "6" },
            ]}
            renderItem={({ item }) => (
              <View
                style={{
                  height: 60,
                  width: 60,
                  backgroundColor: "yellow",
                  margin: 10,
                }}
              >
                <Text>{item.value}</Text>
              </View>
            )}
          />
        </SafeAreaView>

        <Button title="Focus" buttonStyle={styles.focusButton} />
      </View>

      <Navbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  focusButton: {
    backgroundColor: Colors.secondaryLight,
    borderRadius: "20px",
    width: 150,
  },

  focusContainer: {
    minHeight: "100vh",
    padding: 10,
    backgroundColor: Colors.background,
  },

  heading: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 24,
    textAlign: "center",
    paddingTop: 20,
  },

  grid: {
    height: "85%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Focus;
