import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
} from "react-native";
import {getRatings, calcRating} from '../../helpers/calculateRatings'
import Colors from "../../constants/Colors";
import StarRating from "./StarRating";

const ProductItem = (props) => {
  let TouchableComponent = TouchableOpacity;
  const ratingScores = props.rating.map(getRatings);
  const totalRating = ratingScores.reduce(calcRating, 0);
  const averageRating = totalRating / ratingScores.length;
  const articleRating = averageRating;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={props.onViewDetail} useForeground>
          <View style={styles.details}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.imgUrl }} />
            </View>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.priceAndRating}>
              <Text style={styles.price}>${props.price}</Text>
              <StarRating rating={articleRating}/>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Add to Cart"
                onPress={props.onAddToCart}
                color={"#7043ec"}
              />
            </View>
          </View>
        </TouchableComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "#23232e",
    borderRadius: 10,
    margin: 20,
    height: 300,
    overflow: "hidden",
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Abel_400Regular",
    color: "white",
    textAlign: "center",
    marginVertical: 10,
  },
  price: {
    fontSize: 19,
    color: Colors.accent,
    textAlign: "center",
  },
  priceAndRating: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 10,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    height: "58%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  buttonContainer: {
    width: "30%",
  },
  details: {
    display: "flex",
    alignItems: "center",
  },
});

export default ProductItem;
