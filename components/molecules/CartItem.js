import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity}</Text>
        <Text style={styles.description} numberOfLines={1}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.description}>${props.amount}</Text>
        {props.deletable && <TouchableOpacity onPress={props.onDelete} style={styles.deleteButton}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color="red"
          />
        </TouchableOpacity>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  quantity: {
    color: "#888",
    fontSize: 16,
    marginRight:5,
  },
  description: {
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
