import { api } from "../global.api"

export const  customerInfo = async() =>{
    const response  = await api.get('order/customerInfo')
    return response
 }

 export const Debtinfo = async()=>{
    const  response = await api.get('debt/debtinfo')
    return response
 }

 export const DebtorInfo = async (id:any) =>{
    const  response = await api.get(`debt/${id}`)
    return response
 }
 export const SendsmsTo = async (data:any) =>{
   const response = await api.post('sms/send-sms', data)
   return response
 }
 export const CombinedProduct = async()=>{
   const response = await api.get('order/bothproduct')
   return response
 }

 export const CreateOrder = async (data: any) => {
   const response = await api.post('order/create', data)
   return response
 }