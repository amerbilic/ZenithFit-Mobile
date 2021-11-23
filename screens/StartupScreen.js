import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../store/actions/auth";
import Colors from "../constants/Colors";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        dispatch(authActions.setDidTryAL());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expTime } = transformedData;
      const expDate = new Date(expTime);
      if (expDate <= new Date() || !token || !userId) {
        dispatch(authActions.setDidTryAL());
        return;
      }
      const expirationTime = expDate.getTime() - new Date().getTime();
      dispatch(authActions.authenticate(token, userId, expirationTime));
    };
    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
