import axios from "axios";

export const IMPORT_DATA = "IMPORT_DATA";

export const importData = (categories) => {
  return { type: IMPORT_DATA, categories };
};

export const fetchCategoriesData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios
        .get("http://192.168.0.13:8000/category/")
        .catch(function (error) {
          if (error.response) {
            throw new Error(error.response.data.error.message);
          }
        });

      const data = response.data;
      return data;
    };

    const categoryData = await fetchData();
    dispatch(importData(categoryData));
  };
};
