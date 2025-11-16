import { api } from "./global.api"

export const CheckCapitalInfo = async()=>{
    const response = await api.get('checkcapitalinfo')
    return response
}