import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Pressable,
  ScrollView,
} from "react-native";
import { useState, useRef } from "react";

export default function App() {
  const [goalArr, putGoal] = useState([]); //! Goal array
  const [text, setText] = useState(""); //! Temp text
  const [removed, setRemoved] = useState(0); //! Removed goals

  const inputHandle = (someText) => {
    //! Updating input
    setText(someText);
  };

  const addGoal = (goal) => {
    goal = [goal, null];
    putGoal([...goalArr, goal]);
  };

  const strokeGoal = (goal) => {
    const index = goalArr.indexOf(goal);
    const textDecor = goalArr[index][1]
      ? null
      : {
          textDecorationLine: "line-through",
          color: 'black'
        };
    goalArr[index] = [goalArr[index][0], textDecor];
    putGoal([...goalArr]);
  };

  const removeGoal = (goal) => {
    const index = goalArr.indexOf(goal);
    goalArr.splice(index, 1);
    putGoal([...goalArr]);
    setRemoved((count) => {
      return (count += 1);
    });
  };

  const removeAll = () => {
    putGoal([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="type here"
        onChangeText={(data) => inputHandle(data)}
        value={text}
      ></TextInput>
      <Button onPress={(data) => addGoal(text)} title="Add goal"></Button>
      <View
        style={{
          width: 390,
          height: "65%",
          overflow: "scroll",
          alignItems: "center",
        }}
      >
        <ScrollView alwaysBounceVertical={false} contentContainerStyle={styles.container}>
          {goalArr &&
            goalArr.map((el) => (
              <View key={Math.random() * 10000} style={styles.goal}>
                <Pressable style={{position: "absolute", top: '25%', left: '-6%'}}onPress={(data) => removeGoal(el)}>
                  <Text
                    style={{
                      ...styles.goalText,
                      fontWeight: "normal",
                      fontSize: 24,
                    }}
                  >
                    {" "}
                    X{" "}
                  </Text>
                </Pressable>
                <Text
                  style={
                    el[1]
                      ? Object.assign({ ...styles.goalText }, { ...el[1] })
                      : styles.goalText
                  }
                  onPress={(data) => strokeGoal(el)}
                >
                  {el[0]}
                </Text>
              </View>
            ))}
        </ScrollView>
      </View>

      <Pressable style={styles.endButton} onPress={(data) => removeAll()}>
        <Text style={{ color: "white", fontSize: 24 }}> Remove all </Text>
      </Pressable>
      <Text
        onPress={(data) => setRemoved(0)}
        style={{
          ...styles.text,
          marginHorizontal: "auto",
          fontSize: 14,
          marginRight: 16,
        }}
      >
        {" "}
        You have completed {goalArr.filter((el) => el[1] !== null).length}{" "}
        tasks! ({removed + goalArr.filter((el) => el[1] !== null).length}{" "}
        total!){" "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 390,
    height: 760,
    marginTop: "5%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  input: {
    width: 240,
    height: 60,
    fontSize: 20,
    borderColor: "blue",
    borderWidth: 1,
    textAlign: "center",
    color: "black",
    marginTop: 20,
  },

  text: {
    fontFamily: "sans-serif",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 24,
    textAlign: "center",
  },
  goalText: {
    fontFamily: "sans-serif",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 24,
    textAlign: "center",
    color: 'white',
  },

  endButton: {
    marginTop: "auto",
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "blue",
    marginBottom: 12,
  },

  goal: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#845ef7",
    color: "white",
    marginTop: 10,
    width: "80%",
    position: 'relative',
  },
});
