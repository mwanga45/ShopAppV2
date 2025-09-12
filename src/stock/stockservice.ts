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
export const Stockresult =async()=>{
    try{
        const stockinfo =     await api.get('/stock/stockresult')
        return stockinfo
    }catch(err){
        console.error("failed to get Stockresult", err)
        throw err
    }
}