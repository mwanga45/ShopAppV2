import { api } from "../global.api"

export const  customerInfo = async() =>{
    const response  = await api.get('order/customerInfo')
    return response
 }