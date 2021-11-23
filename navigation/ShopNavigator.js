import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { useDispatch } from "react-redux";
import React from "react";
import ProductsOverviewScreen, {
  screenOptions as ProductsOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, {
  screenOptions as ProductDetailsScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import AuthScreen from "../screens/user/AuthScreen";
import CategoriesScreen from "../screens/shop/CategoriesScreen";
import GoalsScreen from "../screens/shop/GoalsScreen";
import GoalsGenderScreen from "../screens/shop/GoalsGenderScreen";
import GoalsProducts from "../screens/shop/GoalsProducts";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as authActions from "../store/actions/auth";

const defaultOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "#008080" : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerTitleAlign: "center",
};

const ProductsStackNavigator = createStackNavigator();

function ProductsNavigator() {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultOptions}>
      <ProductsStackNavigator.Screen
        name="Categories"
        component={CategoriesScreen}
      />
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={ProductsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={ProductDetailsScreenOptions}
      />
      <ProductsStackNavigator.Screen name="Cart" component={CartScreen} />
    </ProductsStackNavigator.Navigator>
  );
}

const OrdersStack = createStackNavigator();

function OrdersNavigator() {
  return (
    <OrdersStack.Navigator screenOptions={defaultOptions}>
      <OrdersStack.Screen name="Your Orders" component={OrdersScreen} />
    </OrdersStack.Navigator>
  );
}
const GoalsStack = createStackNavigator();

function GoalsNavigator() {
  return (
    <GoalsStack.Navigator screenOptions={defaultOptions}>
      <GoalsStack.Screen
        name="GoalsGenders"
        component={GoalsGenderScreen}
        options={{ headerTitle: "Select your gender" }}
      />
      <GoalsStack.Screen
        name="GoalsOptions"
        component={GoalsScreen}
        options={{ headerTitle: "Select your goal" }}
      />
      <GoalsStack.Screen
        name="GoalsProducts"
        component={GoalsProducts}
        options={{ headerTitle: "Recommended for you" }}
      />
    </GoalsStack.Navigator>
  );
}

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerTitle: "Authenticate" }}
      />
    </AuthStackNavigator.Navigator>
  );
};

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 40 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={"#008080"}
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      screenOptions={{
        drawerActiveTintColor: "#5DFDCB",
        drawerInactiveTintColor: "white",
        drawerStyle: {
          backgroundColor: "#484a4d",
          width: 220,
        },
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? "#484a4d" : "",
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: (drawerConfig) => {
            return (
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={23}
                color={drawerConfig.color}
              />
            );
          },
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (drawerConfig) => {
            return (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={drawerConfig.color}
              />
            );
          },
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Goals"
        component={GoalsNavigator}
        options={{
          drawerIcon: (drawerConfig) => {
            return (
              <Ionicons
                name={
                  Platform.OS === "android" ? "barbell-outline" : "ios-list"
                }
                size={23}
                color={drawerConfig.color}
              />
            );
          },
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};
