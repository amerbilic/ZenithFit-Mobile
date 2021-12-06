import React from "react";
import Colors from "../../constants/Colors";
import CartItem from "../../components/molecules/CartItem";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import StripeText from '../../components/atoms/StripeText'
import * as cartActions from "../../store/actions/cart";

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const cartTotal = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        id: parseInt(key),
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const deleteCartItemHandler = () => {
    dispatch(cartActions.removeFromCart(itemData.item.id));
  }

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${cartTotal}</Text>
        </Text>
        <StripeText items={cartItems} price={cartTotal}/>
      </View>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <CartItem
              deletable
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              amount={itemData.item.productPrice}
              onDelete={() => {
                dispatch(cartActions.removeFromCart(itemData.item.id));
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "#23232e",
  },
  summaryText: {
    fontWeight: "bold",
    fontSize: 18,
    color:"white"
  },
  amount: {
    color: Colors.accent,
  },
});

export default CartScreen;
