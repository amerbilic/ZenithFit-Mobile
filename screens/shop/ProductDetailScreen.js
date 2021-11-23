import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
const ProductDetailScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const productId = props.route.params.productId;
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.products.productDetail);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      await dispatch(productActions.fetchDetailData(productId));
      setIsLoading(false);
    };
    loadProducts();
  }, [dispatch]);

  return (
    <View>
      {!isLoading ? (
        <ScrollView>
          <Image style={styles.image} source={{ uri: selectedProduct.img }} />
          <View style={styles.buttons}>
            <Button
              color={Colors.primary}
              title="Add to cart"
              onPress={() => {
                dispatch(cartActions.addToCart(selectedProduct));
              }}
            />
          </View>
          <Text style={styles.price}>${selectedProduct.price}</Text>
          <Text style={styles.description}>{selectedProduct.desc}</Text>
        </ScrollView>
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

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "Abel_400Regular",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "Abel_400Regular",
  },
  buttons: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default ProductDetailScreen;
