import './stocksheet.css'
import type { Stockprops } from '../../stock/Stock'
export const Stocksheet:React.FC<Stockprops> = ({product_id,product_name,CreatedAt,last_add_stock,last_stock,fullname, product_category})=> {
  
  return (
    <div className='stock-sheet-container'>
        <div className="stock-form-container">
            <div className="update-stock">
                <h2>Update Stock</h2>
                  <div className="update-input-container">
                    <label htmlFor="Pname">Productid</label>
                    <input type="text" name='productname'id='Pname' value={product_id} readOnly/>
                </div>
                <div className="update-input-container">
                    <label htmlFor="Pname">ProductName</label>
                    <input type="text" name='productname'id='Pname' value={product_name} readOnly/>
                </div>
                <div className="update-input-container">
                    <label htmlFor="categ">Category</label>
                    <input type="text" name='Category'id='Categ' value={product_category} readOnly/>
                </div>
                 <div className="update-input-container">
                    <label htmlFor="mt">Select Method</label>
                    <input type="text" name='method'id='mt' value={product_category}/>
                </div>

                  <div className="update-input-container">
                    <label htmlFor="Add">Add-stock</label>
                    <input type="number" name='Add-stock'id='Add'style={{color:"black", fontSize:"18px" , fontWeight:"500"}} />
                </div>
                  <div className="update-input-container">
                    <label htmlFor="Remove">Deduct-stock</label>
                    <input type="number" name='Deduct'id='Remove' style={{color:"black", fontSize:"18px" , fontWeight:"500"}}/>
                </div>
                <div className="update-input-container">
                    <label htmlFor="res">Reasons</label>
                    <input type="number" name='reasons'id='res' style={{color:"black", fontSize:"18px" , fontWeight:"500"}}/>
                </div>
                
                <button name='update'>Update Stock</button>
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
                <h2>{CreatedAt.substring(0,10)}</h2>
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
