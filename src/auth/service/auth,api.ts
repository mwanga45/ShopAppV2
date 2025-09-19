import { api } from "../../global.api";

export const login =async(Credential:{email:string,password:string})=>{
  const respose = await api.post("/auth/login",Credential)
  return respose.data
}
export const register = async(user:{username:string,password:string,nida:string})=>{
    const respose = await api.post("auth/register",user)
    return respose.data

}