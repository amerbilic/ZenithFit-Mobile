import axios from "axios";

export const LOAD_PRODUCTS = "LOAD_PRODUCTS";
export const LOAD_PRODUCT = "LOAD_PRODUCT";

export const loadProducts = (products) => {
  return { type: LOAD_PRODUCTS, products };
};
export const loadProduct = (product) => {
  return { type: LOAD_PRODUCT, product };
};

export const fetchProductsData = (name) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios
        .get(`http://192.168.0.13:8000/category/articles/${name}`)
        .catch(function (error) {
          if (error.response) {
            throw new Error(error.response.data.error.message);
          }
        });
      const data = response.data.articles;
      return data;
    };

    const productsData = await fetchData();
    dispatch(loadProducts(productsData));
  };
};

export const fetchDetailData = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios
        .get(`http://192.168.0.13:8000/articles/article/${id}`)
        .catch(function (error) {
          if (error.response) {
            throw new Error(error.response.data.error.message);
          }
        });
      const data = response.data;
      return data;
    };
    const productData = await fetchData();
    dispatch(loadProduct(productData));
  };
};
