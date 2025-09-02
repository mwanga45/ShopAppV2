import { api } from "../../global.api";

export const fetchWholeSales = async () => {
  const response = await api.get("/sales/wholesale"); // Assuming a /sales/wholesale endpoint
  return response.data;
};
