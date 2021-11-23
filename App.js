import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { useFonts, Abel_400Regular } from "@expo-google-fonts/abel";
import ReduxThunk from "redux-thunk";
import React from "react";
import MainNavigator from "./navigation/AppNavigator";
import AppLoading from "expo-app-loading";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";
import categoryReducer from "./store/reducers/categories";
import goalsReducer from './store/reducers/goals';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
  category: categoryReducer,
  goals:goalsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  let [fontsLoaded] = useFonts({
    Abel_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
}


