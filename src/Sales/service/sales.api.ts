import { api } from "../../global.api";

export const fetchProductsales = async () => {
  const response = await api.get('product/salesInfo')
  return response
};

