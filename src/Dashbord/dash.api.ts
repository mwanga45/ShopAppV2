import { api } from "../global.api";

export const DashboardResponseInfo = async() =>{
   const response = await api.get('profit-dev/dash')
   return response
}