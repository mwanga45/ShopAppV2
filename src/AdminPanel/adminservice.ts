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

export const Account_details  = async()=>{
    try{
        const response = await api.get('auth/acc_info')
        return response

    }catch(err){
        console.error(err)
        throw err
    }
}
export const Update_Product = async(data:any)=>{
    try{
        const response =  await api.patch(`product/${data.id}`, data)
        return response
    }catch(err){
      console.error(err)
      throw err
    }
}
export const CreateDisCount = async(data:any) =>{
    try{
    const  response =  await api.post('product/discount', data)
    return response

    }catch(err){
        console.error(err)
        throw err
    }
}
export  const  ReturnDisc = async()=>{
    try{
        const response = await api.get('product/Disc_result')
        return response
    }catch(err){
        console.error(err)
        throw err
    }
} 
export const specDisc = async (id?:string)=>{
    try{
      const  response = await api.get(`product/spec/${id}`)
      return response
    }catch(err){
        console.error(err)
        throw err
    }
    
}
export const BusinessWorthData = async()=>{
    try{
        const response = await api.get('profit-dev/networth')
        return response

    }catch(err){
        console.log(err)
        throw err
    }
}

export const CapitalAssign = async(data:any)=>{
    try{
        const  response =await api.post('management/create&update', data)
        return response
    }catch(err){
        console.error(err)
        throw err
    }
}
export const CreateService = async(data:any) => {
    try{
        const response = await api.post('management/createservice', data)
        return response

    }catch(err){
        console.log(err)
    }
}