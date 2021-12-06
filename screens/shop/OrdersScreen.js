import React, { useState, useEffect,shallowEqual } from "react";
import { FlatList, ActivityIndicator, View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "../../components/molecules/OrderItem";
import * as OrderActions from "../../store/actions/orders";
import moment from "moment";

const OrdersScreen = (props) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders,shallowEqual);
  const userId = useSelector((state) => state.auth.userId);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true);
      await dispatch(OrderActions.fetchOrdersData(userId));
      setIsLoading(false);
    }

    loadOrders();
  }, [dispatch]);


  return (
    <View style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator size="large" color={"#7043ec"} />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => {
            return (
              <OrderItem
                amount={itemData.item.total}
                date={moment(itemData.item.createdAt).format(
                  "MMMM Do YYYY, hh:mm"
                )}
                items={itemData.item.order_items}
              />
            );
          }}
        ></FlatList>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default OrdersScreen;
