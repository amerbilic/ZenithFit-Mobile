import React from "react";
import { View, FlatList } from "react-native";
import GoalItem from "../../components/atoms/GoalItem";
import { genderList } from "../../store/reducers/goals";

const GoalsGenderScreen = (props) => {
  return (
    <View>
      <FlatList
        data={genderList}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <GoalItem
            imgUrl={itemData.item.imageUrl}
            goalName={itemData.item.title}
            onSelect={() => {
              props.navigation.navigate("GoalsOptions");
            }}
          />
        )}
      />
    </View>
  );
};

export default GoalsGenderScreen;
