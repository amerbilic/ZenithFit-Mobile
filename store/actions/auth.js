import axios from "axios";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const register = async () => {
      const response = await axios
        .post("http://192.168.0.13:8000/auth/signup", {
          email,
          password,
          username: email,
          firstname: "Amer",
          lastname: "Rorie",
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            throw new Error(error.response.data.error.message);
          }
        });

      const data = response.data;
      return data;
    };

    const resData = await register();
    const userId = resData.userId;
    const token = resData.accessToken;
    const decodeToken = jwt_decode(resData.accessToken);
    const expTime = new Date(
      new Date().getTime() + parseInt(decodeToken.exp) * 1000
    );
    dispatch(authenticate(userId, token, parseInt(decodeToken.exp) * 1000));
    saveDataToStorage(token, userId, expTime);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const login = async () => {
      const response = await axios
        .post("http://192.168.0.13:8000/auth/login", {
          email,
          password,
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            throw new Error(error.response.data.error.message);
          }
        });

      const data = response.data;
      return data;
    };

    const resData = await login();
    const userId = resData.userId;
    const token = resData.accessToken;
    const decodeToken = jwt_decode(resData.accessToken);
    const expTime = new Date(
      new Date().getTime() + parseInt(decodeToken.exp) * 1000
    );

    dispatch(authenticate(userId, token, parseInt(decodeToken.exp) * 1000));
    saveDataToStorage(token, userId, expTime);
  };
};

const saveDataToStorage = (token, userId, expTime) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expTime: expTime.toISOString(),
    })
  );
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};
