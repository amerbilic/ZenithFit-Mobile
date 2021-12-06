import axios from "axios";
import {Alert} from 'react-native'
export const LOAD_ORDERS = "LOAD_ORDERS";
export const ADD_RATING = "ADD_RATING";
export const UPDATE_RATING = "UPDATE_RATING";

export const loadOrders = (orderData) => {
  return {
    type: LOAD_ORDERS,
    orderData: orderData,
  };
};

export const fetchOrdersData = (userId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      await axios
        .get(`http://192.168.0.13:8000/orders/user/${userId}`)
        .then((response) => {
          dispatch(loadOrders(response.data));
        })
        .catch(function (error) {
          if (error.response) {
            throw new Error(error.response.data.error.message);
          }
        });
    };
    await fetchData();
  };
};

export const addRating = (frmData) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.post(`http://192.168.0.13:8000/rating`, frmData);
      const data = response.data;
      return data;
    };

    try {
      await fetchData();
      Alert.alert("Succesfully added rating")
    } catch (error) {
      console.log(error.response);
      Alert.alert(error.response ? error.response.data.error.message : error);
    }
  };
};

export const updateRating = (frmData) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.put(`http://192.168.0.13:8000/rating/${frmData.id}`, frmData);
      const data = response.data;
      return data;
    };

    try {
      await fetchData();
      Alert.alert("Succesfully updated rating")
    } catch (error) {
      console.log(error.response);
      Alert.alert(error.response ? error.response.data.error.message : error);
    }
  };
};
