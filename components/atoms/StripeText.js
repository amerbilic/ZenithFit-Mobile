import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/stripe-react-native";
import { View, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import axios from "axios";

const StripeText = (props) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`http://192.168.0.13:8000/payment-sheet/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      await axios.post("http://192.168.0.13:8000/finalizeOrder", {
        total: props.price,
        provider: "stripe",
        status: "succesful",
        userId,
        productList: props.items,
      });
      dispatch(cartActions.resetCart());
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View>
      <Button
        disabled={!loading}
        variant="primary"
        onPress={openPaymentSheet}
        color={"#7043ec"}
        title="Checkout"
      />
    </View>
  );
};


export default StripeText;
