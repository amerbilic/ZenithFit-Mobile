import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  ImageBackground,
  StyleSheet,
} from "react-native";

const GoalItem = (props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.screen}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <ImageBackground
                style={styles.image}
                source={{ uri: props.imgUrl }}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.goalName}>{props.goalName}</Text>
                </View>
              </ImageBackground>
            </View>
          </View>
        </TouchableComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 20,
    height: 300,
    overflow: "hidden",
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10,
  },
  imageContainer: {
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  goalName: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Abel_400Regular",
    color: "white",
    backgroundColor: "black",
    padding:5,
    textAlign:"center",
  },
  textContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GoalItem;
