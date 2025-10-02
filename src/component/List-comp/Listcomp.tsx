import { GetproductList } from "../../AdminPanel/adminservice"
import { PiDotsThreeCircle } from "react-icons/pi";
import "./list.css"
import { useEffect, useState} from "react"
import { EditProdoct, CreateDiscount } from "../Form-comp/Form";
import { RiCloseFill } from "react-icons/ri";
import {CutoffCard} from "../Admincord/CutoffCard";
export interface ProductInfo{
    id:number,
    UpdateAt: string,
    product_name: string,
    userId: 1,
    product_category: string,
    product_type: string,
    wpurchase_price?: string |null,
    rpurchase_price: string|null,
    wholesales_price: string|null,
    retailsales_price: string|null
    user:{
        fullname:string|null
    }
}
export const ListComp = ()=>{
    const [product, setproduct] = useState<ProductInfo[]>([])
    const [EditRow, setEditRow] =useState<ProductInfo|null>()
    const [isClicked, setisClicked] = useState(false)
    const handleselectedRow = (row:ProductInfo)=>{
        setEditRow({...row})

    }
    const handleActionButton = ()=>{
    setisClicked(!isClicked)
    }
    useEffect(()=>{
    const fetchallproduct = async()=>{
        try{
            const productddata = await GetproductList()
            setproduct(productddata)
        }catch(err){
           console.error("something went wrong", err)
           throw err
        }
        
    }
    fetchallproduct()   
    },[])
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
                               {product.length > 0 ?(
                                product.map((p,index)=>(
                             <tr className="product-table-row" key={p.id}>
                                <td>{`P${(index + 1).toString().padStart(3,'0')}`}</td>
                                <td>{p.product_name}</td>
                                <td>{p.product_category}</td>
                                <td>{p.product_type}</td>
                                <td>{p.wpurchase_price ?? p.rpurchase_price ?? 0}</td>
                                <td>{p.wholesales_price ?? p.retailsales_price ?? 0}</td>
                                <td>{p.user.fullname}</td>
                                <td>{p.UpdateAt.substring(0,10)}</td>
                                <td><button className="Actin-btn" onClick={()=>{handleActionButton(); handleselectedRow(p)}}><PiDotsThreeCircle size={16}/></button></td>
                               </tr>
                                ))
                               ):(
                                <tr style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                    <td style={{color:"black", fontSize:"20px", fontWeight:"700"}}>No product is found</td>
                                </tr>
                               )}
                            </tbody>
                        </table>
              </div>
                {
                    isClicked &&
                    <div className="edit-product-main-container">
                <div className="close-poup-container" onClick={handleActionButton}>
                    <div className="icon-close" >
                        <RiCloseFill  size={30}/>
                    </div>
                    </div>
              <div >
                  <div className="Edit-title-container">
                    <p>Welcome To Edit Page!</p>
                  </div>
                 <div className="edit-container">
                    <div className="product-edit-info">
                        <div className="edit-title-product">
                            <p>Edited Product-details</p>
                        </div>
                      <ul>
                        <div className="edit-info">
                            <li className="label-info">Product-Name</li>
                            <li className="updated-info" style={{color:"red"}}>{EditRow?.product_name}</li>
                        </div>
                        <div className="edit-info">
                            <li className="label-info">Product-Category</li>
                            <li className="updated-info" style={{color:"red"}}>{EditRow?.product_category}</li>
                        </div>
                        <div className="edit-info">
                            <li className="label-info">Product-Type</li>
                            <li className="updated-info" style={{color:"red"}}>{EditRow?.product_type}</li>
                        </div>
                         <div className="edit-info">
                            <li className="label-info">Purchase-Price</li>
                            <li className="updated-info"  style={{color:"green"}}>{EditRow?.product_category === "wholesales"?Number(EditRow.wpurchase_price).toLocaleString():Number(EditRow?.rpurchase_price).toLocaleString()}.Tsh</li>
                        </div>
                        <div className="edit-info">
                            <li className="label-info">selling-Price</li>
                            <li className="updated-info" style={{color:"green"}}>{EditRow?.product_category === "wholesales"?Number(EditRow.wholesales_price).toLocaleString():Number(EditRow?.retailsales_price).toLocaleString()}Tsh</li>
                        </div>
                        <div className="edit-info">
                            <li className="label-info">Profit Per Each</li>
                            <li className="updated-info" style={{color:"green"}}>{EditRow?.product_category === "wholesales"?(Number(EditRow.wholesales_price) - Number(EditRow.wpurchase_price)).toLocaleString():(Number(EditRow?.retailsales_price)-Number(EditRow?.rpurchase_price)).toLocaleString()}.Tsh</li>
                        </div>


                      </ul>
                    </div>
                    <div className="product-edit-form-container">
                        <EditProdoct product_name={EditRow?.product_name} product_id={String(EditRow?.id)} product_category={EditRow?.product_category} product_type={EditRow?.product_type} rpurchase_price={EditRow?.rpurchase_price} wpurchase_price={EditRow?.wpurchase_price} Rs_price={EditRow?.retailsales_price} Ws_price={EditRow?.wholesales_price} />
                    </div>
                 </div>
                  <div className="Edit-title-container">
                        <p>Product Other Info</p>
                    </div>
                    <div className="container-product-info">
                        <div className="cuttoff-details">
                           <CutoffCard/>
                        </div>
                        <div className="cutoff-product-form-container">
                            < CreateDiscount product_name={EditRow?.product_name} pId={EditRow?.id} />
                        </div>
                    </div>
              </div>
            </div>
}
        </div>
    )
}