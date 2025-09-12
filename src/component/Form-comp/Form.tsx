import "./form_comp.css"
import { RiCloseFill } from "react-icons/ri";
import {useState} from "react";
import { Submitbtn } from "../button/Submitbtn";
import { productRegister } from "./formservice";


interface FormCompProps {
  onClick?: () => void;
  onClose?: () => void;
  isOpen?: boolean;
}

export default function FormComp({onClick, onClose, isOpen = true}: FormCompProps) {
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

      await productRegister(payload);
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


interface StuckFormprops{
  onClose?: () => void;
  isOpen?: boolean;
  product_id?:string;
  category:string;
  productname?:string
}
export const StockupdateForm:React.FC<StuckFormprops> = ({onClose,isOpen=true,category,product_id,productname}) =>{
  const [isopen, setidopen ] = useState<boolean>(isOpen)
  const handleClose = ()=>{
    setidopen(!isopen)
    if(onClose){
      onClose()
    }
  }
  const [StockData, setStockData] = useState({
    Product_id:"",
    total_stock:"",
    category:"",
    product_type:"",
  })
  const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
    const {name , value} = e.target
    setStockData(prev=>({...prev,[name]:value}))
 }
 const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try{

    }catch(err){
      console.log(err)
      throw err
    }
 }

  return(
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
                <input type="text" name="productname" id= "ProductName" value={productname} onChange={handleChange} required readOnly/>
              </div>
                <div className="input-value">
                    <label htmlFor="cat">Category</label>
                    <input type="text" name="category" id="cat" value={category} onChange={handleChange} required readOnly />
                </div>
                   <div className="input-value">
                    <label htmlFor="stock">Stock Number</label>
                    <input type="text" name="total_stock" id="stock" value={StockData.total_stock} onChange={handleChange} required />
                </div>
               <div className="btn-container">
                  <Submitbtn buttonName="Create-product" type="submit"/>
               </div>
            </form>
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
