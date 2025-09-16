import { api } from "../global.api";

export const GetproductList= async() =>{
    try{
        const response = await api.get("/product/getproduct")
        return response.data
    }catch(err){   
        console.error("failed to get data",err)
        throw err
    }
}
export const GetuserList  = async() =>{
    try{
       const  response = await api.get("auth/user-list")
       return response
    }catch(err){
        console.error(err)
        throw err
    }

}