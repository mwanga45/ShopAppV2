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
    product_category: 'none',
    product_type: 'solid',
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
      await productRegister(formData);
      alert('Product registered successfully!');
      handleClose();
    } catch (error) {
      alert('Failed to register product.');
      console.error(error);
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
                <input type="text" name="product_name" id= "ProductName" value={formData.product_name} onChange={handleChange} />
              </div>

              <div className="two-column-inputs">
                <div className="input-value">
                    <label htmlFor="product-category">Category</label>
                    <select name="product_category" id="product-category" value={formData.product_category} onChange={handleChange}>
                      <option value="none">Select Category</option>
                      <option value="both">Both</option>
                      <option value="wholesales">Wholesales</option>
                      <option value="retailsales">Retailsales</option>
                    </select>
                </div>
                <div className="input-value">
                    <label htmlFor="product-type">Type</label>
                    <select name="product_type" id="product-type" value={formData.product_type} onChange={handleChange}>
                      <option value="solid">Solid</option>
                      <option value="liquid">Liquid</option>
                    </select>
                </div>
                <div className="input-value">
                    <label htmlFor="rs-price">Retail Price</label>
                    <input type="text" name="Rs_price" id="rs-price" value={formData.Rs_price} onChange={handleChange} placeholder="e.g., 6000" />
                </div>
                <div className="input-value">
                    <label htmlFor="ws-price">Wholesale Price</label>
                    <input type="text" name="Ws_price" id="ws-price" value={formData.Ws_price} onChange={handleChange} placeholder="e.g., 5500" />
                </div>
                <div className="input-value">
                    <label htmlFor="Wpurchase-price">Wholepurchase Price</label>
                 <input type="text" value={formData.wpurchase_price} name="purchase_price" id = "purchase-price" onChange={handleChange} placeholder="e.g., 5000" />
               </div>
                <div className="input-value">
                    <label htmlFor="Rpurchase-price">Retailpurchase Price</label>
                 <input type="text" value={formData.rpurchase_price} name="purchase_price" id = "purchase-price" onChange={handleChange} placeholder="e.g., 5000" />
               </div>
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
