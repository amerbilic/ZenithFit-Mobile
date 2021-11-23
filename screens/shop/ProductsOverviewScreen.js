import React, { useEffect, useState } from "react";
import { View, FlatList, Platform, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import ProductItem from "../../components/atoms/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/atoms/CustomHeaderButton";
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const categoryName = props.route.params.name;

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() => {
              props.navigation.navigate("Cart");
            }}
          />
        </HeaderButtons>
      ),
    });
    const loadProducts = async () => {
      setIsLoading(true);
      await dispatch(productActions.fetchProductsData(categoryName));
      setIsLoading(false);
    };
    loadProducts();
  }, [dispatch]);

  return (
    <View>
      {!isLoading ? (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <ProductItem
              title={itemData.item.name}
              price={itemData.item.price}
              imgUrl={itemData.item.img}
              onAddToCart={() => {
                dispatch(cartActions.addToCart(itemData.item));
              }}
              onViewDetail={() => {
                props.navigation.navigate("ProductDetail", {
                  productId: itemData.item.id,
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

export const screenOptions = (NavData) => {
  const name = NavData.route.params.name;
  const arr = name.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const outputTitle = arr.join(" ");
  return {
    headerTitle: outputTitle,
  };
};

export default ProductsOverviewScreen;
