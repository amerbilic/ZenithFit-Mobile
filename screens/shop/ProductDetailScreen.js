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
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/atoms/CustomHeaderButton";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import StarRating from "../../components/atoms/StarRating";
import { getRatings, calcRating } from "../../helpers/calculateRatings";

const ProductDetailScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const productId = props.route.params.productId;
  const rating = props.route.params.rating;
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.products.productDetail);

  const ratingScores = rating.map(getRatings);
  const totalRating = ratingScores.reduce(calcRating, 0);
  const averageRating = totalRating / ratingScores.length;
  const articleRating = averageRating;

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
      await dispatch(productActions.fetchDetailData(productId));
      setIsLoading(false);
    };
    loadProducts();
  }, [dispatch]);

  return (
    <View style={styles.blackBG}>
      {!isLoading ? (
        <ScrollView>
          <Image style={styles.image} source={{ uri: selectedProduct.img }} />
          <View style={styles.buttons}>
            <Button
              color={"#7043ec"}
              title="Add to cart"
              onPress={() => {
                dispatch(cartActions.addToCart(selectedProduct));
              }}
            />
          </View>
          <Text style={styles.price}>${selectedProduct.price}</Text>
          <StarRating rating={articleRating} />
          <Text style={styles.description}>{selectedProduct.desc}</Text>
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color={"#7043ec"} />
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
    headerTitleContainerStyle:{
      width:'60%',
      alignItems:'center'
  }}
};

const styles = StyleSheet.create({
  blackBG: {
    flex: 1,
    backgroundColor: "#23232e",
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: Colors.accent,
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "Abel_400Regular",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    marginHorizontal: 10,
    marginTop: 10,
    fontFamily: "Abel_400Regular",
  },
  buttons: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default ProductDetailScreen;
