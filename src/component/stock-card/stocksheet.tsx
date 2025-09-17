import './stocksheet.css'
import type { Stockprops } from '../../stock/Stock'
import React, { useState } from 'react'
import { StockUpdate } from '../../stock/stockservice'

interface Stockupdate {
    Method?: 'add' | 'Removed'
    product_id?: number
    total_stock?: number
    Reasons?: string
    product_category?: string
   

}
export const Stocksheet:React.FC<Stockprops> = ({product_id,product_name,UpdateAt,last_add_stock,last_stock,fullname, product_category,requestFn})=> {
 const [StockupdateData, seStockupdateData] = useState<Partial<Stockupdate>>({})
 const [formValues, setFormValues] = useState<any>({})
 const [isSubmitting, setIsSubmitting] = useState(false)

 const handleOnchage:React.ChangeEventHandler<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement> = (e)=>{
  const {name , value } = e.target
  setFormValues((prev:any)=> ({...prev,[name]: value}))
 }

 const handleSubmit = async()=>{
  requestFn
  try{
    setIsSubmitting(true)
    const methodRaw = (formValues?.method || '').toString().toLowerCase()
    const Method: Stockupdate['Method'] = methodRaw === 'add' ? 'add' : methodRaw === 'removed' ? 'Removed' : undefined

    const addVal = Number(formValues?.add_stock || 0)
    const deductVal = Number(formValues?.deduct || 0)

    let total_stock: number = 0 
    if (!isNaN(addVal) && addVal > 0) total_stock = addVal
    if (!isNaN(deductVal) && deductVal > 0) total_stock = deductVal


    const payload: Stockupdate = {
      product_id,
      Method,
      total_stock,
      Reasons: formValues?.reasons,
      product_category: product_category 
    }
    
    seStockupdateData(payload)
    if (!payload.product_id) throw new Error('Missing product id')
    if (typeof payload.total_stock === 'undefined') throw new Error('Provide add or deduct amount') // Allow 0
     console.log(payload,product_id)
    const response = await StockUpdate( payload)
    console.log("userId", response.data.data)

    if ((response as any)?.data?.success === false) {
      alert((response as any)?.data?.message || 'Failed to update stock')
    } else {
      alert('Stock updated successfully')
    }
  }catch(err){
   alert('Failed to update stock')
   console.error('Something went wrong', err)
  } finally {
    setIsSubmitting(false)
  }
 }
  return (
    <div className='stock-sheet-container'>
        <div className="stock-form-container">
            <div className="update-stock">
                <h2>Update Stock</h2>
                  <div className="update-input-container">
                    <label htmlFor="Pname">Productid</label>
                    <input type="text" name='product_id' id='Pname' value={product_id} readOnly style={{color:"black", fontSize:"18px" , fontWeight:"500"}}/>
                </div>
                <div className="update-input-container">
                    <label htmlFor="Pname">ProductName</label>
                    <input type="text" name='productname' id='Pname' value={product_name} readOnly style={{color:"black", fontSize:"18px" , fontWeight:"500"}}/>
                </div>
                <div className="update-input-container">
                    <label htmlFor="categ">Category</label>
                    <input type="text" name='category' id='Categ' value={product_category} readOnly style={{color:"black", fontSize:"18px" , fontWeight:"500"}}/>
                </div>
              <div className="update-input-container">
                    <label htmlFor="method">Method Select</label>
                    <select name='method' id='method' onChange={handleOnchage} defaultValue="" style={{color:"black", fontSize:"18px" , fontWeight:"500"}}>
                      <option value="" disabled>Select Update Option</option>
                      <option value="add">Add</option>
                      <option value="removed">Removed</option>
                    </select>
                </div>
                {formValues?.method === 'add' ? (
                  <div className="update-input-container">
                    <label htmlFor="Add">Add-stock</label>
                    <input type="number" name='add_stock' id='Add' onChange={handleOnchage} placeholder={String(last_add_stock)} style={{color:"black", fontSize:"18px" , fontWeight:"500"}} />
                  </div>
                ) : formValues?.method === 'removed' ? (
                  <div className="update-input-container">
                    <label htmlFor="Remove">Deduct-stock</label>
                    <input type="number" name='deduct' id='Remove' onChange={handleOnchage} placeholder={String(last_stock)} style={{color:"black", fontSize:"18px" , fontWeight:"500"}}/>
                  </div>
                ) : null}

                {
                  formValues?.method === 'add' ?(
                  <div className="update-input-container">
                    <label htmlFor="mv">Stock Move (IN/OUT)</label>
                    <select name='move_category' id='mv' onChange={handleOnchage} defaultValue="IN" style={{color:"black", fontSize:"18px" , fontWeight:"500"}}>
                      <option value="IN">IN</option>
                    </select>
                </div>
                  ):formValues?.method === 'removed'?(
                     <div className="update-input-container">
                    <label htmlFor="mv">Stock Move (IN/OUT)</label>
                    <select name='move_category' id='mv' onChange={handleOnchage} defaultValue="" style={{color:"black", fontSize:"18px" , fontWeight:"500"}}>
                      <option value="" disabled>Select move</option>
                      <option value="IN">IN</option>
                      <option value="OUT">OUT</option>
                    </select>
                </div>
                  ):null

                }

                <div className="text-area-stock">
                <div className="update-input-container">
                    <label htmlFor="res">Reasons</label>
                    <textarea  name='reasons' id='res' onChange={handleOnchage} style={{color:"black", fontSize:"18px" , fontWeight:"500", background:"white", border:"none"}}/>
                </div>
              </div>
                <button name='update' onClick={handleSubmit} disabled={isSubmitting}>{isSubmitting ? 'Updating...' : 'Update Stock'}</button>
            </div>
        </div>
        <div className="stock-information-container">
               <h2>Stock Information</h2>
               <div className="stock-spec-info">
                <label htmlFor="">Product-name</label>
                <h2>{product_name}</h2>
               </div>
                 <div className="stock-spec-info">
                <label htmlFor="">Stock-remain</label>
                <h2>{last_stock}</h2>
               </div>
                <div className="stock-spec-info">
                <label htmlFor="">Stock-remain</label>
                <h2>{last_add_stock}</h2>
               </div>
                 <div className="stock-spec-info">
                <label htmlFor="">Last Update</label>
                <h2>{UpdateAt.substring(0,10)}</h2>
               </div>
                 <div className="stock-spec-info">
                <label htmlFor="">Person-update</label>
                <h2>{fullname}</h2>
               </div>
                 <div className="stock-spec-info">
                <label htmlFor="">Date-Expected to End</label>
                <h2>Depend</h2>
               </div>
        </div>
    </div>
  )
}
