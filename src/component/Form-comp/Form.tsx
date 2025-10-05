import "./form_comp.css"
import { RiCloseFill } from "react-icons/ri";
import React, {useEffect, useState} from "react";
import { Submitbtn } from "../button/Submitbtn";
import { productRegister } from "./formservice";
import { Update_Product } from "../../AdminPanel/adminservice";
import { CreateDisCount } from "../../AdminPanel/adminservice";
import { StockCreate } from "../../stock/stockservice";
import {ProductInfo} from "./formservice"
import  Toggle from "../button/toggle"
import { toast, ToastContainer } from "react-toastify";





interface FormCompProps {
  onClick?: () => void;
  onClose?: () => void;
  isOpen?: boolean;
  product_name?:string
  product_id?:string
  product_category?:string
  product_type?:string
  Rs_price?:string |null,
  Ws_price?:string |null,
  wpurchase_price?:string | null,
  rpurchase_price?:string|null
  pId?:number
}

export default function FormComp({ onClose, isOpen = true}: FormCompProps) {
  const [close, setClose] = useState<boolean>(isOpen);
  const [formData, setFormData] = useState({
    product_name: '',
    product_category: 'wholesales',
    product_type: 'Solid',
    Rs_price: '',
    Ws_price: '',
    wpurchase_price: '',
    rpurchase_price:''

  });

  const handleClose = () => {
    setClose(false);
    if (onClose) {
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        product_name: formData.product_name,
        product_category: formData.product_category,
        product_type: formData.product_type,
      };

      if (formData.product_category === "retailsales") {
        if (formData.Rs_price) payload.Rs_price = formData.Rs_price;
        if (formData.rpurchase_price) payload.rpurchase_price = formData.rpurchase_price;
      } else if (formData.product_category === "wholesales") {
        if (formData.Ws_price) payload.Ws_price = formData.Ws_price;
        if (formData.wpurchase_price) payload.wpurchase_price = formData.wpurchase_price;
      }
      if(window.confirm("are sure  you want to registration")){
        await productRegister(payload);
      }

      alert('Product registered successfully!');
      handleClose();
    } catch (error: any) {
      console.error("Error registering product:", error.response ? error.response.data : error.message);
      alert('Failed to register product: ' + (error.response?.data?.message || error.message));
    }
  };

  if (!close) {
    return null;
  }

  return (
    <div className='form-main-container'>
        <div className="icon-conyainer">
          <div className="icon" onClick={handleClose}>
            <RiCloseFill color="white" size={30} fontWeight={500}/>
          </div>
        </div>
        <div className="frm-container">
            <div className="form-title">
              <p>Product-Register</p>
            </div>
            <form className="main-form-content" onSubmit={handleSubmit}>
              <div className="input-value">
                <label htmlFor="ProductName">Product Name</label>
                <input type="text" name="product_name" id= "ProductName" value={formData.product_name} onChange={handleChange} required />
              </div>

              <div className="two-column-inputs">
                <div className="input-value">
                    <label htmlFor="product-category">Category</label>
                    <select name="product_category" id="product-category" value={formData.product_category} onChange={handleChange}>
                      <option value="wholesales">Wholesales</option>
                      <option value="retailsales">Retailsales</option>
                    </select>
                </div>
                <div className="input-value">
                    <label htmlFor="product-type">Type</label>
                    <select name="product_type" id="product-type" value={formData.product_type} onChange={handleChange}>
                      <option value="Solid">Solid</option>
                      <option value="Liquid">Liquid</option>
                    </select>
                </div>
                {formData.product_category === "retailsales"&&(
                <>
                <div className="input-value">
                    <label htmlFor="rs-price">Retail Price</label>
                    <input type="text" name="Rs_price" id="rs-price" value={formData.Rs_price} onChange={handleChange} placeholder="e.g., 6000" />
                </div>
                <div className="input-value">
                    <label htmlFor="Rpurchase-price">Retailpurchase Price</label>
                 <input type="text" value={formData.rpurchase_price} name="rpurchase_price" id = "purchase-price" onChange={handleChange} placeholder="e.g., 5000" />
               </div>
               </>
                )}
                {
                  formData.product_category === "wholesales"&& (
                  <>
                <div className="input-value">
                    <label htmlFor="ws-price">Wholesale Price</label>
                    <input type="text" name="Ws_price" id="ws-price" value={formData.Ws_price} onChange={handleChange} placeholder="e.g., 5500" />
                </div>
                <div className="input-value">
                    <label htmlFor="Wpurchase-price">Wholepurchase Price</label>
                 <input type="text" value={formData.wpurchase_price} name="wpurchase_price" id = "purchase-price" onChange={handleChange} placeholder="e.g., 5000" />
               </div>
                 </>
                  )
                }
              </div>
               <div className="btn-container">
                  <Submitbtn buttonName="Create-product" type="submit"/>
               </div>
            </form>
        </div>
    </div>
  )
}



export  const EditProdoct:React.FC<FormCompProps>=({product_category,product_id,product_type,product_name,wpurchase_price,Ws_price, Rs_price, rpurchase_price})=> {
  const [formData, setFormData] = useState({
    product_name:product_name,
    product_category: product_category,
    product_type: product_type,
    Rs_price:Rs_price ,
    Ws_price: Ws_price,
    wpurchase_price: wpurchase_price,
    rpurchase_price:rpurchase_price,
    id:product_id

  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload:any = {
        product_name: formData.product_name,
        product_category: formData.product_category,
        product_type: formData.product_type,
        id: Number(product_id)
        

      };

      if (formData.product_category === "retailsales") {
        if (formData.Rs_price != null && formData.Rs_price !== '') payload.Rs_price = String(formData.Rs_price);
        if (formData.rpurchase_price != null && formData.rpurchase_price !== '') payload.rpurchase_price = String(formData.rpurchase_price);
      } else if (formData.product_category === "wholesales") {
        if (formData.Ws_price != null && formData.Ws_price !== '') payload.Ws_price = String(formData.Ws_price);
        if (formData.wpurchase_price != null && formData.wpurchase_price !== '') payload.wpurchase_price = String(formData.wpurchase_price);
      }
      if(window.confirm("Are sure you want to make this update")){
        console.log(payload)
         const reponse = await Update_Product(payload);
         if(!reponse.data.success){
          alert(reponse.data.message)
          
         }
         alert(reponse.data.message)
      }

      

    } catch (error: any) {
      console.error("Error registering product:", error.response ? error.response.data : error.message);
      alert('Failed to register product: ' + (error.response?.data?.message || error.message));
    }
  };

  if (!close) {
    return null;
  }

  return (
        <div className="frm-container">
            <div className="form-title">
              <p>{product_name}-Update</p>
            </div>
            <form className="main-form-content" onSubmit={handleSubmit}>
              <div className="input-value">
                <label htmlFor="ProductName">Product Name</label>
                <input type="text" name="product_name" id= "ProductName" value={formData.product_name} onChange={handleChange} required />
              </div>

              <div className="two-column-inputs">
                <div className="input-value">
                    <label htmlFor="product-category">Category</label>
                    <select name="product_category" id="product-category" value={formData.product_category} onChange={handleChange}>
                      <option value="wholesales">Wholesales</option>
                      <option value="retailsales">Retailsales</option>
                    </select>
                </div>
                <div className="input-value">
                    <label htmlFor="product-type">Type</label>
                    <select name="product_type" id="product-type" value={formData.product_type} onChange={handleChange}>
                      <option value="Solid">Solid</option>
                      <option value="Liquid">Liquid</option>
                    </select>
                </div>
                {formData.product_category === "retailsales"&&(
                <>
                <div className="input-value">
                    <label htmlFor="rs-price">Retail Price</label>
                    <input type="text" name="Rs_price" id="rs-price" value={formData.Rs_price || ""} onChange={handleChange} placeholder="e.g., 6000" />
                </div>
                <div className="input-value">
                    <label htmlFor="Rpurchase-price">Retailpurchase Price</label>
                 <input type="text" value={formData.rpurchase_price || ""} name="rpurchase_price" id = "purchase-price" onChange={handleChange} placeholder="e.g., 5000" />
               </div>
               </>
                )}
                {
                  formData.product_category === "wholesales"&& (
                  <>
                <div className="input-value">
                    <label htmlFor="ws-price">Wholesale Price</label>
                    <input type="text" name="Ws_price" id="ws-price" value={formData.Ws_price|| ""} onChange={handleChange} placeholder="e.g., 5500" />
                </div>
                <div className="input-value">
                    <label htmlFor="Wpurchase-price">Wholepurchase Price</label>
                 <input type="text" value={formData.wpurchase_price || ""} name="wpurchase_price" id = "purchase-price" onChange={handleChange} placeholder="e.g., 5000" />
               </div>
                 </>
                  )
                }
              </div>
               <div className="btn-container">
                  <Submitbtn buttonName="Update" type="submit"/>
               </div>
            </form>
        </div>
  
  )
}


interface StockFormprops{
  onClose?: () => void;
  isOpen?: boolean;
}
interface productInfo {
  id:number,
  product_category:string,
  product_name:string


}
export const StockRegForm:React.FC<StockFormprops> = ({onClose,isOpen=true}) =>{
  const [isopen, setidopen ] = useState<boolean>(isOpen)
  const [wproductInfo, setwproductInfo] = useState<productInfo[]>()
  const [rproductInfo, setrproductInfo] = useState<productInfo[]>()
  const [Hearder,setHearder] = useState<String>("Wholesales-Stock-Reg")
  const [isDefault, setisDefault] = useState<boolean>(false)
  const handleClose = ()=>{
    setidopen(!isopen)
    if(onClose){
      onClose()
    }
  }
  const [StockData, setStockData] = useState({
    product_id:'',
    total_stock:"",
    product_category:"",
  })
  const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
    const {name , value} = e.target
    if(name === 'product_category'){
      const selectedProduct = wproductInfo?.find((p)=> String(p.id) === value) || rproductInfo?.find((p)=> String(p.id) === value)
      setStockData((prev)=>({...prev,product_id:value,product_category:selectedProduct?.product_category || ""}))
    }else{
      setStockData(prev=>({...prev,[name]:value}))
    }
 }
 const handleChangeCategory = (next:boolean)=>{
  setisDefault(next)
    setHearder( next ? "Retalsales-Stock-Reg":"Wholesales-Stock-Reg")
 }
 useEffect(()=>{
   const handleproductInfo = async()=>{
    try{
      const response = await ProductInfo() 
      setwproductInfo(response.data.ForWholesales)
      setrproductInfo(response.data.ForRetailsales)
    }catch(err){
      console.error("Failed to connect  to server")
      throw err
    }
   }
    handleproductInfo()
 },[])

 const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try{
       const response = await StockCreate(StockData)
       if(!response.data.success){
        alert(response.data.message)
        return
       }
       toast.success(response.data.message)
       

    }catch(err){
      console.log(err)
      throw err
    }
 }

  return(
    <div className='form-main-container'>
      <div className="icon-conyainer">
        <ToastContainer/>
          <div className="icon" onClick={handleClose}>
            <RiCloseFill color="white" size={30} fontWeight={500}/>
          </div>
        </div>
        <div className="frm-container">
            <div className="form-title" style={{background:"#2A7B9B",display:"flex",columnGap:"10px"}}>
               <Toggle onChange={handleChangeCategory}checked= {isDefault}/>
              <p>{Hearder}</p>
            </div>
            <form className="main-form-content" onSubmit={handleSubmit}>
                <div className="input-value">
                    <label htmlFor="product-category">Category</label>
                    <select name="product_category" id="product-category" value={StockData.product_id} onChange={handleChange}>
                      <option value="">Please select Product category</option>
                     {
                      !isDefault ?(
                      wproductInfo?(
                       wproductInfo.map((p)=>(
                        <option key={p.id} value={p.id}>{p.product_name}</option>
                       ))
                      ):(
                        <option>No product in this category</option>
                      )):(
                        rproductInfo?(
                          rproductInfo.map((p)=>(
                            <option key={p.id} value={p.id}>{p.product_name}</option>
                          ))
                        ):(
                          <option value="">No product yet in this category</option>
                        )
                      )
                     }
                    </select>
                </div>
                <div className="input-value">
                    <label htmlFor="cat">Category</label>
                    <input type="text" name="category" id="cat" value={StockData.product_category} onChange={handleChange} required  readOnly />
                </div>
                   <div className="input-value">
                    <label htmlFor="stock">Stock Number</label>
                    <input type="text" name="total_stock" id="stock" value={StockData.total_stock} onChange={handleChange} required />
                </div>
               <div className="btn-container">
                  <Submitbtn buttonName="Create Stock" type="submit"/>
               </div>
            </form>
        </div>
    </div>
  )
}

export const SalesRecForm = ()=>{
  const [isWhole, setWhole] =  useState<boolean>(false)
  const [wholesales, setWholesales] = useState([])
  const [retailsales, setretailsales] = useState([])
   const handleOnsubmit =(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
  }
  return(
    
    <div className='form-main-container' >
      <div className="icon-conyainer">
        <ToastContainer/>
          <div className="icon" >
            <RiCloseFill color="white" size={30} fontWeight={500} />
          </div>
        </div>
        <div className="main-conatiner-sales">
        <div className="frm-container">
            <div className="form-title" >
               {/* <Toggle onChange={handleChangeCategory}checked= {isDefault}/> */}
              <p>Whole sales Record</p>
            </div>
            <form className="main-form-content" onSubmit={handleOnsubmit}>
            <div className="form-container-decoration">
                <div className="input-value">
                    <label htmlFor="product-category">Product</label>
                    <select name="product_category" id="product-category" value="" >
                      <option value="">Select product</option>
                     {
                      !isWhole ?(
                      wholesales?(
                       wholesales.map((p)=>(
                        <option key="" value=""></option>
                       ))
                      ):(
                        <option>No product exist</option>
                      )):(
                        retailsales?(
                          retailsales.map((p)=>(
                            <option key="" value=""></option>
                          ))
                        ):(
                          <option value="">No product exist</option>
                        )
                      )
                     }
                    </select>
                </div>
                <div className="input-value">
                    <label htmlFor="cat">Category</label>
                    <input type="text" name="category" id="cat" value=""  required  readOnly />
                </div>
                   <div className="input-value">
                    <label htmlFor="stock">Stock Number</label>
                    <input type="text" name="total_stock" id="stock" value=""  required />
                </div>
                    <div className="input-value">
                    <label htmlFor="pA">Product Amount </label>
                    <input type="text" name="pAmount" id="pA" value=""  required />
                </div>
               <div className="btn-container">
                  <p>Discount reach range</p>
                  <Submitbtn buttonName="Submit sales" type="submit"/>
               </div>
              </div>
            </form>
          </div>
          <div className="SalesBord-dispaly"></div>
          </div>
        </div>
  )
}

interface DiscInterface {
  product_id?:number,
  pnum?:string,
  Amount?:number,
  percentage?:PerceInterface
  product_name?:string
  Ws_price?:string|null
  UpdateFlag?:boolean,
  perc?:number
}
interface Disc_requestInterface {
  product_id?:number,
  pnum?:number,
  Amount?:number,
  percentage?:PerceInterface
  product_name?:string
  Ws_price?:string|null
  UpdateFlag?:boolean,
  perc?:number
}
interface PerceInterface{
  perce:number
}
export const CreateDiscount:React.FC<FormCompProps> = ({product_name,pId,Ws_price})=>{
  const [formData , setformdata] = useState <DiscInterface>({
    product_id:pId,
    percentage:{perce:0},
    Amount:0,
    pnum:"",
    product_name:product_name,
    Ws_price:Ws_price,
  })
  const HandleOnchage = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target 
  
    setformdata(prev =>{
      const update = {...prev, [name]:value}
      if(name === 'Amount'&& prev.Ws_price){
        const calperc = (Number(value)* 100)/Number(prev.Ws_price)
      update.percentage = {perce:calperc}
      }
      return update
    })
  }
const handleOnsubmit = async(e:React.FormEvent) =>{
  e.preventDefault()
  const perc_Num = formData.percentage?.perce

  const createPayload:Disc_requestInterface = {
    product_id: formData.product_id,
    product_name: formData.product_name,
    Amount: Number(formData.Amount),
    perc: perc_Num,
    pnum: Number(formData.pnum),
    UpdateFlag: false
  }

  const UpdatePayload:Disc_requestInterface = {
    ...createPayload,
    UpdateFlag: true
  }

  try {
    const response = await CreateDisCount(createPayload)

    // case: product discount already exists
    if (response.data.confirm) {
      const userConfirmation = window.confirm(response.data.message)
      if (userConfirmation) {
        const update_Disc = await CreateDisCount(UpdatePayload)
        if (!update_Disc.data.success) {
          alert(update_Disc.data.message)
          return
        }
        alert(update_Disc.data.message)
      } else {
        toast.info("Update cancelled by user")
      }
      return
    }

    // case: fresh create or failed
    alert(response.data.message)

  } catch (err) {
    console.error(err)
    alert("Something went wrong")
  }
}

   return(
    <div className="offer-create-main-container">
    
      <div className="form-title" style={{background:"#e6f8ffff",display:"flex",columnGap:"10px", marginBottom:"12px"}}>
              <p>{`Discount For ${formData.product_name}`}</p>
      </div>
      <form className="offer-form-container" onSubmit={handleOnsubmit} >
           <div className="input-value">
                    <label htmlFor="pname">Product-Name</label>
                    <input type="text" name="product_name" id="pname" onChange={HandleOnchage} value={formData.product_name}   required readOnly />
            </div>
                     <div className="input-value">
                    <label htmlFor="%">Percentage cuttoff</label>
                    <input type="text" name="percentage" id="%"  onChange={HandleOnchage} value={formData.percentage?.perce.toFixed(2)}  required readOnly />
            </div>
                     <div className="input-value">
                    <label htmlFor="amount">Amount</label>
                    <input type="text" name="Amount" id="amount"  onChange={HandleOnchage} value={formData.Amount ?? 0}  required  />
            </div>
                     <div className="input-value">
                    <label htmlFor="pnum">Product Number/Litre</label>
                    <input type="text" name="pnum" id="pnum"  onChange={HandleOnchage} value={formData.pnum}   required placeholder="Enter product number start cutoff" />
            </div>
               <div className="btn-container">
                  <Submitbtn buttonName="Create" type="submit"/>
               </div>

      </form>
      <div>
      <ToastContainer/>
      </div>
    </div>
   )
}
export const useFormClose = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);
  
  return { isOpen, openForm, closeForm };
};
