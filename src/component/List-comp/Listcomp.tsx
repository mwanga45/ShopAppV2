import "./list.css"
export const ListComp = ()=>{
    return(
        <div className="product-list-container">
              <div className="product-list-title">
                <h2>Product list</h2>
              </div>
              <div className="product-content-container">
                        <table className="prodlist-table" >
                            <thead>
                                <tr className="prodlist-head-row">
                                <th>ProductId</th>
                                <th>ProductName</th>
                                <th>Prod Category</th>
                                <th>Product-type</th>
                                <th>Purchase Price</th>
                                <th>Selling Price</th>
                                <th>Registered by</th>
                                <th>Last Updated</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                               <tr className="product-table-row">
                                <td>P001</td>
                                <td>Pallet Starter</td>
                                <td>Wholesales</td>
                                <td>Solid</td>
                                <td>63000</td>
                                <td>66000</td>
                                <td>John Doe</td>
                                <td>2023-10-26</td>
                                <td>Edit</td>
                               </tr>
                            </tbody>
                        </table>
              </div>

        </div>
    )
}