import { api } from "../global.api"

export const StockUpdate = async(id:string,updatestock:any)=>{
    try{
    const response =  await api.patch(`/stock/${id}`,updatestock)
    return response.data
    }catch(err){
      console.error("Failed to updatestock", err)
      throw err
    }
}