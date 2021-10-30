import { WOO_COMMERCE_URL } from "../constants";
import { wcInstance } from "./instances";

export default {
  products: {
    fetchProducts: () => wcInstance.get(`${WOO_COMMERCE_URL}/products`),
    fetchCategories: () =>
      wcInstance.get(`${WOO_COMMERCE_URL}/products/categories`),
  },
};
