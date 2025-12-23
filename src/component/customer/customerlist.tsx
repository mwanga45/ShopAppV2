import type React from "react";
import styles from "./customerlist.module.css";
import type{ CustomerInfoInterface, CustomerInfoCollection,  SimplebarInterface } from "../../type.interface";
import { PiDotsThreeCircle } from "react-icons/pi";
import { DateFormat } from "../../format.helper";
import { Button } from "../button/Button";
import { useState} from "react";
import { CreateCustomer } from "../../overview/overview.api";
import { toast } from "react-toastify";

export const CustomerList: React.FC<CustomerInfoCollection> = ({
  CustomerDetails,
}) => {
  return (
    <div>
      <table className={styles.customerlisttable}>
        <thead>
          <tr>
            <th>S/N</th>
            <th>CustomerName</th>
            <th>Location</th>
            <th>Phone Number</th>
            <th>Debt-status</th>
            <th>RegisteredAt</th>
            <th>View More details</th>
          </tr>
        </thead>
        <tbody>
          {CustomerDetails ? (
            CustomerDetails.length > 0 ? (
              CustomerDetails.map((i, index) => (
                <tr key={i.customerName}>
                  <td>{`C.${(index + 1).toString().padStart(3, "0")}`}</td>
                  <td>{i.customerName}</td>
                  <td>{i.location}</td>
                  <td>+{i.Dial}</td>
                  <td>{i.DebtStatus ?'exist':'not exist'}</td>
                  <td >{DateFormat(i.RegisteredAt ?? '')}</td>
                  <td className={styles.customizedtd}>
                    <PiDotsThreeCircle size={36} enableBackground={2} color="yellow" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>No CustomerInfo</tr>
            )
          ) : (
            <tr>No Information returned</tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export const Simplebar:React.FC<SimplebarInterface>=({Value, description})=>{
  return(
       <div className="stat-chip stat-wholesale">
          <div className="stat-dot" />
          <div>
            <span className="stat-label">{description}</span>
            <span className="stat-value">{Value}</span>
          </div>
        </div>
  )
}
export  const CreateCustomerForm =()=>{
const [formData, setformData] = useState<CustomerInfoInterface>()

const handleOnchange =(e:React.ChangeEvent<HTMLInputElement>)=>{
 const {name , value} = e.target;
 setformData((prev) => ({...prev, [name]:value}));
}

 const finalPayload = {
  PhoneNumber:formData?.Dial,
  CustomerName:formData?.customerName,
  Location:formData?.location
 }
const handleValidateForm =()=>{
 if(!finalPayload.CustomerName){
   return alert('please Enter Custpmer Name')
 }
 if(finalPayload.CustomerName.length > 25 || finalPayload.CustomerName.length <5){
  return alert('customer name must have atleast 5 character and almost 25 character')
 }
}
const handleSubmit = async(e:React.FormEvent)=>{
  e.preventDefault()
  handleValidateForm()
  try{
   const response = await CreateCustomer(finalPayload)
   if(!response.data.success){
    return toast.error(response.data.message)
   }
  toast.success(response.data.message)
  }catch(err){
    alert(err)
  }
}
  return(
    <div className={styles.formContainer} onSubmit={handleSubmit}>
     <div className={styles.formTitle}><span>Add Customer</span></div> 
     <form className={styles.mainFormContainer}>
      <div className={styles.inputContainer}>
       <div><label htmlFor="Cn">CustomerName</label></div> 
        <input type="text" id="Cn" name="customerName" placeholder="Enter customer-name" value={formData?.customerName} onChange={handleOnchange}/>
      </div>
            <div className={styles.inputContainer}>
       <div><label htmlFor="Ph">Phone Number</label></div> 
        <input type="text" id="Ph" name="Dial" placeholder="Enter Phone Number" value={formData?.Dial} onChange={handleOnchange}/>
      </div>
            <div className={styles.inputContainer}>
       <div><label htmlFor="loc">Customer Location(Optional)</label></div> 
        <input type="text" name="location" id= 'loc' placeholder="Enter Customer location" value={formData?.location} onChange={handleOnchange} />
      </div>
      <div className={styles.ClassicBtnContainer}><Button buttonName="Create Customer"/></div>
     </form>

    </div>
  )
}
