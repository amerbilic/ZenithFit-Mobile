import React from "react";
import { View, FlatList } from "react-native";
import GoalItem from "../../components/atoms/GoalItem";
import { goalsItems } from "../../store/reducers/goals";

const GoalsScreen = (props) => {

  return (
    <View>
      <FlatList
        data={goalsItems}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <GoalItem
            imgUrl={itemData.item.imageUrl}
            goalName={itemData.item.title}
            onSelect={() => {
              props.navigation.navigate("GoalsProducts", {
                goalName: itemData.item.linkUrl,
              });
            }}
          />
        )}
      />
    </View>
  );
};



export default GoalsScreen;
