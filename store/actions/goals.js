import axios from "axios";

export const LOAD_GOAL_PRODUCTS = "LOAD_GOAL_PRODUCTS";

export const loadGoalProducts = (goalProducts) => {
  return { type: LOAD_GOAL_PRODUCTS, goalProducts };
};

export const fetchGoalsDirectoryList = (directoryName) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios
        .get(`http://192.168.0.13:8000/category/goals/${directoryName}`)
        .catch(function (error) {
          if (error.response) {
            throw new Error(error.response.data.error.message);
          }
        });
      const data = response.data;
      return data;
    };

    const productsData = await fetchData();
    dispatch(loadGoalProducts(productsData));
  };
};
