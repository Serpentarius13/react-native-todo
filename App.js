//! WARNING! THIS CODE IS PURE SHIT! LOOK INSIDE ONLY IF YOU WANT TO HAVE YOUR EYES BURNED!

import {
  //! List of components used
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Pressable,
  ScrollView,
  FlatList, //! Fuck this mofo
  Modal,
  Image,
} from "react-native";
import { useState, useRef } from "react";

export default function App() {
  const [goalArr, putGoal] = useState([]); //! Goal array
  const [text, setText] = useState(""); //! Temp text
  const [removed, setRemoved] = useState(0); //! Removed goals

  const [modVis, setModVis] = useState(false); //! Modal

  const inputHandle = (someText) => {
    //! Updating input

    setText(someText);
  };

  const addGoal = (goal) => {
    //! Adding goal

    goal = [goal, null];
    putGoal([...goalArr, goal]);
    setText("");
  };

  const strokeGoal = (goal) => {
    //! Stroking goal

    const index = goalArr.indexOf(goal);
    const textDecor = goalArr[index][1] //! Look at this motherfucker
      ? null
      : {
          textDecorationLine: "line-through",
          color: "black",
        };
    goalArr[index] = [goalArr[index][0], textDecor];
    putGoal([...goalArr]);
  };

  const removeGoal = (goal) => {
    //! Removing goal

    const index = goalArr.indexOf(goal);  //! Finding it
    goalArr.splice(index, 1);
    putGoal([...goalArr]);
    setRemoved((count) => {
      return (count += 1);
    });
  };

  const removeAll = () => {
    //! Removing them all

    putGoal([]);

    setModVis((vis) => true); //! Opening modal

    console.log(modVis);

    setTimeout(() => setModVis(false), 3000); //! Closing modal
  };

  return (
    <View style={styles.container}> //! Global container 
      <Modal animationType="slide" visible={modVis}> //! Modal container !animationType! !visible!
        <View style={styles.modal}>
          <Image source={require("./assets/floppa.png")}></Image> //! Image container !source!
          <Text
            style={{
              ...styles.text,
              color: "white",
              fontSize: 30,
              marginLeft: 0,
              marginTop: 24,
            }}
          >
            {" "}
            You have completed{" "}
            <Text
              style={{
                ...styles.text,
                color: "white",
                fontSize: 48,
                marginLeft: "0",
                marginTop: 24,
              }}
            >
              {" "}
              {removed}{" "}
            </Text>{" "}
            tasks! Cool!{" "}
          </Text>
        </View>
      </Modal>
      <TextInput //! Input
        style={styles.input}
        placeholder="type here"
        onChangeText={(data) => inputHandle(data)}
        value={text}
      ></TextInput>
      <Button onPress={(data) => addGoal(text)} title="Add goal"></Button> //!Button !title!
      <View
        style={{
          width: 390,
          height: "65%",
          overflow: "scroll",
          alignItems: "center",
        }}
      >
        <ScrollView //! Scroll view
          alwaysBounceVertical={false} //! !Bounce property!
          contentContainerStyle={styles.container} //! Styling only with !contentContainerStyle!
        >
          {goalArr.map((el) => (
            <View key={Math.random() * 123456} style={styles.goal}> //! Unique key implementation (-.-)
              <Pressable
                style={{ position: "absolute", top: "25%", left: "-6%" }}
                onPress={(data) => removeGoal(el)}
              >
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
                style={ //! Crazy part two
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

      <Pressable style={styles.endButton} onPress={(data) => removeAll()}> //! Pressable
        <Text style={{ color: "white", fontSize: 24 }}>
          {" "}
          Remove all {"\n"}{" "}
          <Text style={{ color: "white", fontSize: 12 }}> (click this) </Text>
        </Text>
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

export const styles = StyleSheet.create({ //! Stylesheet
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
    color: "white",
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
    position: "relative",
  },

  modal: {
    width: "100%",
    height: "100%",
    backgroundColor: "#845ef7",
    justifyContent: "center",
    alignItems: "center",
  },
});
