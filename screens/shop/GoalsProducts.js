import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import CategoryGridTile from "../../components/atoms/CategoryGridTile";
import { useSelector, useDispatch } from "react-redux";
import * as goalsActions from "../../store/actions/goals";
import Colors from "../../constants/Colors";
import { useIsFocused } from "@react-navigation/native";

const GoalsScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const productsList = useSelector((state) => state.goals.goalProducts);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(
        goalsActions.fetchGoalsDirectoryList(props.route.params.goalName)
      );
      setIsLoading(false);
    };

    fetchData();
  }, [dispatch]);

  return (
    <View>
      {!isLoading ? (
        <FlatList
          data={productsList}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={(itemData) => (
            <CategoryGridTile
              title={itemData.item.name}
              color={"#484a4d"}
              imgUrl={itemData.item.imageUrl}
              onSelect={() => {
                props.navigation.navigate("ProductsOverview", {
                  categoryId: itemData.item.id,
                  name: itemData.item.name,
                });
              }}
            />
          )}
        />
      ) : (
        <ActivityIndicator size="large" color={Colors.primary} />
      )}
    </View>
  );
};

export default GoalsScreen;
