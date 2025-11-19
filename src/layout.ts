import { api } from "./global.api"

export const CheckCapitalInfo = async()=>{
    const response = await api.get('management/checkcapitalinfo')
    return response
}