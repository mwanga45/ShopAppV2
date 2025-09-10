import "./form_comp.css"
import { RiCloseFill } from "react-icons/ri";
import {useState} from "react";

interface FormCompProps {
  onClick?: () => void;
  onClose?: () => void;
  isOpen?: boolean;
}

export default function FormComp({onClick, onClose, isOpen = true}: FormCompProps) {
  const [close, setClose] = useState<boolean>(isOpen);

  const handleClose = () => {
    setClose(false);
    if (onClose) {
      onClose();
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
              <p>Whole sales Record</p>
            </div>
            <div className="main-form-content">
              <label htmlFor="product-name">Product-Name</label>
              <div className="input-value">
              <select name="productname" id="product-name">
                <option value="">Name of Product</option>
                <option value="">Pallet Starter</option>
                <option value="">Tumbili seed</option>
                <option value="">Pallet</option>
                <option value="">Harsho food</option>
              </select>
              </div>
                <div className="input-value">
                    <label htmlFor="Valueby">pc/kg/litre</label>
                    <input type="text" name="price" id="Valueby" value={6000} />
                </div>
                 <div className="input-value">
                    <label htmlFor="Valueby">pc/kg/litre</label>
                    <input type="date" name="price" id="Valueby"  />
                </div>
                    <div className="input-value">
                    <label htmlFor="Value per each">Value per Each</label>
                 <input type="text" value={12000} name="value" id = "Value per each" readOnly />
               </div>
                  
            </div>
        </div>
    </div>
  )
}

// Export the close functionality
export const useFormClose = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);
  
  return { isOpen, openForm, closeForm };
};
