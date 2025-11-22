import { api } from "../global.api";

export const DashboardResponseInfo = async() =>{
   const response = await api.get('profit-dev/dash')
   return response
}
export const DashordGraphdata =async() =>{
   try{
      const response = await api.get('profit-dev/graph')
      return response
   }catch(err){
      console.error(err)
      throw err
   }
}
export const Pendingsalesreturn =async() =>{
   try{
    const response = await api.get('sales/salesToday')
    return response
   }catch(err){
      console.error(err)
      throw err
   }
}