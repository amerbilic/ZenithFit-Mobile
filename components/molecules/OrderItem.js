import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import CartItem from "./CartItem";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount}</Text>
        <Text style={styles.date}>{props.date}</Text>
      <Button
        color={"#7043ec"}
        title="Show Details"
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      </View>
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.article.id}
              quantity={cartItem.quantity}
              amount={cartItem.article.price}
              title={cartItem.article.name}
              userRating={true}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "#302a38",
    borderRadius: 10,
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding:5,
  },
  totalAmount: {
    fontWeight: "bold",
    fontSize: 16,
    color:Colors.accent
  },
  date: {
    fontSize: 16,
    color: "white",
    opacity:0.8
  },
  detailItems: {
    width: "100%",
  },
});

export default OrderItem;
