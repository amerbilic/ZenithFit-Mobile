import React from "react";
import { Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "../../components/molecules/OrderItem";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return <OrderItem amount={itemData.item.totalAmount} date={itemData.item.readableDate} items={itemData.item.items}/>;
      }}
    ></FlatList>
  );
};

export default OrdersScreen;
