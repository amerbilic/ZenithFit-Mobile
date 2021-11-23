import { IMPORT_DATA } from "../actions/categories";

const initialState = {
  categories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IMPORT_DATA:
      state.categories = action.categories;
      return state;
  }
  return state;
};
