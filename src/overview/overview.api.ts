import { api } from "../global.api"

export const  GraphInfomation =  async()=>{
const response = await api.get('profit-dev/graph')
return response
}
export  const CustomerInfo = async()=>{
    const response = await api.get('debt/CustomerInfo')
    return response
}