import { api } from "../global.api"

export const  customerInfo = async() =>{
    const response  = await api.get('order/customerInfo')
    return response
 }

 export const Debtinfo = async()=>{
    const  response = await api.get('debt/debtinfo')
    return response
 }