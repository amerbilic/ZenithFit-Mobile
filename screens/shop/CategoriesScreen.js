import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, ActivityIndicator, View } from "react-native";
import CategoryGridTile from "../../components/atoms/CategoryGridTile";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as categoryActions from "../../store/actions/categories";

const CategoriesScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      await dispatch(categoryActions.fetchCategoriesData());
      setIsLoading(false);
    };
    loadCategories();
  }, [dispatch]);

  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.name}
        color={"#484a4d"}
        imgUrl={itemData.item.imageUrl}
        onSelect={() => {
          props.navigation.navigate("ProductsOverview", {
            categoryId: itemData.item.id,
            name: itemData.item.name
          });
        }}
      />
    );
  };

  return (
    <View>
      {!isLoading ? (
        <FlatList
          data={categories}
          renderItem={renderGridItem}
          numColumns={2}
        />
      ) : (
        <ActivityIndicator size="large" color={Colors.primary} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
});

export default CategoriesScreen;
