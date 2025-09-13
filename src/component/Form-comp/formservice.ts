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

export  const ProductInfo = async()=>{
  try{
    const response = await api.get('/stock/prInfo')
    return response
  }catch(err){
    console.error("Failed to fetch the data",err)
    throw err
  }
}