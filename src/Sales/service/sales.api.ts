import { api } from "../../global.api";

export const fetchProductsales = async () => {
  const response = await api.get('product/salesInfo')
  return response
};

export const salesRequestInfo = async (data:any) =>{
  const response = await api.post('sales/salesInfo',data)
  return response
}
export  const makesalesrequest = async (data:any) =>{
  const response = await api.post('sales/createsales', data)
  return response
}
export const fetchNormalsellrecord = async() =>{
  const response = await api.get('sales/salesToday')
  return response
}
export const CreateDebtrecord = async(data:any) =>{
  const response = await api.post('debt/create_Debt', data)
  return response
}