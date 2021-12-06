import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import StarRating from "../atoms/StarRating";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {props.title}
        </Text>
      </View>
      <View style={styles.itemData}>
        {props.userRating && (
          <View style={styles.starRating}>
            <StarRating input/>
          </View>
        )}
        {!props.userRating && (
          <Text style={(styles.description, { color: Colors.accent })}>
            ${props.amount}
          </Text>
        )}

        {props.deletable && (
          <TouchableOpacity
            onPress={props.onDelete}
            style={styles.deleteButton}
          >
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color={Colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "#302a38",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    borderRadius: 5,
    marginVertical: 2,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
  },
  starRating: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  quantity: {
    color: "#888",
    fontSize: 16,
    marginRight: 5,
  },
  description: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    width: "80%",
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
