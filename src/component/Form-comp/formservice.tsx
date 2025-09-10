import { api } from "../../global.api";

export const productRegister = async (productData: any) => {
  try {
    const response = await api.post("/product/create", productData);
    return response.data;
  } catch (error) {
    console.error("Error registering product:", error);
    throw error;
  }
};