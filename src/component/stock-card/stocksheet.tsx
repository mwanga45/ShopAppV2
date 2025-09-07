import './stocksheet.css'

export default function Stocksheet() {
  return (
    <div className='stock-sheet-container'>
        <div className="stock-form-container">
            <div className="update-stock">
                <h2>Update Stock</h2>
                <div className="update-input-container">
                    <label htmlFor="Pname">ProductName</label>
                    <input type="text" name='productname'id='Pname' readOnly value={"Pallet-starter"} />
                </div>
                  <div className="update-input-container">
                    <label htmlFor="categ">Category</label>
                    <input type="text" name='Category'id='Categ' readOnly value={"Wholesales"}/>
                </div>
                  <div className="update-input-container">
                    <label htmlFor="Add">Add-stock</label>
                    <input type="text" name='Add-stock'id='Add' />
                </div>
                  <div className="update-input-container">
                    <label htmlFor="Remove">Deduct-stock</label>
                    <input type="text" name='Deduct'id='Remove' />
                </div>
                <button name='update'>Update Stock</button>
            </div>

        </div>
        <div className="stock-information-container">
               <h2>Stock Information</h2>
               <div className="stock-spec-info">
                <label htmlFor="">Product-name</label>
                <h2>Pallet starter</h2>
               </div>
                 <div className="stock-spec-info">
                <label htmlFor="">Stock-remain</label>
                <h2>500 bag</h2>
               </div>
                 <div className="stock-spec-info">
                <label htmlFor="">Last Update</label>
                <h2>date</h2>
               </div>
                 <div className="stock-spec-info">
                <label htmlFor="">Person-update</label>
                <h2>Eliamin Mwanga</h2>
               </div>
                 <div className="stock-spec-info">
                <label htmlFor="">Date-Expected to End</label>
                <h2>date</h2>
               </div>
        </div>
    </div>
  )
}
