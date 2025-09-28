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
export  const AdminVerification = async(data:any)=>{
    try{
        const response = await api.post("auth/admin-verification", data)    
        return response
    }catch(err){
        console.error("failed to verify admin", err) 
        throw err
    }
}
export const RegisterUser = async(data:any)=>{
    try{
        const response = await api.post("auth/register", data)
        return response
    }catch(err){    
        console.error("failed to register user", err) 
        throw err
    }
}