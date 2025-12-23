import { GetproductList } from "../../AdminPanel/adminservice";
import { PiDotsThreeCircle } from "react-icons/pi";
import "./list.css";
import { useEffect, useState } from "react";
import { EditProdoct, CreateDiscount } from "../Form-comp/Form";
import { RiCloseFill } from "react-icons/ri";
import { CutoffCard } from "../Admincord/CutoffCard";
import { specDisc } from "../../AdminPanel/adminservice";
import { FaSearch } from "react-icons/fa";
import { DateFormat } from "../../format.helper";
export interface DiscountInfo {
  UpdateAt?: string;
  percentage?: string;
  CashDiscount?: number;
  start_from?: number;
  product_name?: string;
  id: number;
}
export interface ProductInfo {
  id: number;
  UpdateAt: string;
  product_name: string;
  userId: 1;
  product_category: string;
  product_type: string;
  wpurchase_price?: string | null;
  rpurchase_price: string | null;
  wholesales_price: string | null;
  retailsales_price: string | null;
  user: {
    fullname: string | null;
  };
}
export const ListComp = () => {
  const [product, setproduct] = useState<ProductInfo[]>([]);
  const [EditRow, setEditRow] = useState<ProductInfo | null>();
  const [searchText, setsearchText] = useState('')
  const [DiscRec, setDiscRec] = useState<DiscountInfo[]>([]);
  const [isClicked, setisClicked] = useState(false);
  const handleselectedRow = (row: ProductInfo) => {
    setEditRow({ ...row });
  };
  const handleActionButton = () => {
    setisClicked(!isClicked);
  };
  const handleDiscount = async (productId?: number) => {
    if (!productId) {
      return;
    }
    const response = await specDisc(String(productId));
    if (!response.data.success) {
      setDiscRec([
        {
          product_name: EditRow?.product_name,
          start_from: 0,
          percentage: "0",
          CashDiscount: 0,
          id: 0,
        },
      ]);
      return;
    }
    setDiscRec(response.data.data);
  };

  useEffect(() => {
    const fetchallproduct = async () => {
      try {
        const productddata = await GetproductList();
        setproduct(productddata);
      } catch (err) {
        console.error("something went wrong", err);
        throw err;
      }
    };
    fetchallproduct();
  }, []);
  const filterProduct = product.filter((item)=>{
    return item.product_name.toLowerCase().includes(searchText.toLowerCase())
  })
  useEffect(() => {
    if (EditRow?.id) {
      handleDiscount(EditRow.id);
    }
  }, [EditRow?.id]);

  const totalProducts = product.length;
  const totalRetail = product.filter(
    (p) => p.product_category?.toLowerCase() === "retailsales"
  ).length;
  const totalWholesale = product.filter(
    (p) => p.product_category?.toLowerCase() === "wholesales"
  ).length;

  return (
    <div className="product-list-container">
      <div className="product-list-title">
        <h2>Product list</h2>
      </div>
      <div style={{display:"flex", width:"100%", height:"auto" , alignItems:"center",justifyContent:"center"}}>
      <div className="stats-bar">
        <div className="stat-chip stat-total">
          <div className="stat-dot" />
          <div>
            <span className="stat-label">Total Products</span>
            <span className="stat-value">{totalProducts}</span>
          </div>
        </div>
        <div className="stat-chip stat-retail">
          <div className="stat-dot" />
          <div>
            <span className="stat-label">Retail Products</span>
            <span className="stat-value">{totalRetail}</span>
          </div>
        </div>
        <div className="stat-chip stat-wholesale">
          <div className="stat-dot" />
          <div>
            <span className="stat-label">Wholesale Products</span>
            <span className="stat-value">{totalWholesale}</span>
          </div>
        </div>
      </div>
      </div>
      <div style={{display:"flex", width:"100%", height:"auto" , alignItems:"center",justifyContent:"center"}}>
      <div className="search-container-list">
        <FaSearch className="search-icon" />
        <input type="text" className="search-input" placeholder="Search..." name="searchText" onChange={(e)=> setsearchText(e.target.value)} />
      </div>
      </div>
      <div className="product-content-container">
        <div className="prodlist-wrapper">
          <table className="prodlist-table">
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
              {filterProduct.length > 0 ? (
                filterProduct.map((p, index) => (
                  <tr className="product-table-row" key={p.id}>
                    <td>{`P${(index + 1).toString().padStart(3, "0")}`}</td>
                    <td>{p.product_name}</td>
                    <td>{p.product_category}</td>
                    <td>{p.product_type}</td>
                    <td>{p.wpurchase_price ?? p.rpurchase_price ?? 0}</td>
                    <td>{p.wholesales_price ?? p.retailsales_price ?? 0}</td>
                    <td>{p.user.fullname}</td>
                    <td>{DateFormat(p.UpdateAt)}</td>
                    <td>
                      <button
                        className="Actin-btn"
                        onClick={() => {
                          handleActionButton();
                          handleselectedRow(p);
                        }}
                      >
                        <PiDotsThreeCircle size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="prodlist-empty-row">
                  <td colSpan={9}>No product is found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isClicked && (
        <div className="edit-product-main-container">
          <div className="close-poup-container" onClick={handleActionButton}>
            <div className="icon-close">
              <RiCloseFill size={30} />
            </div>
          </div>
          <div>
            <div className="Edit-title-container">
              <span>Welcome To Edit Page!</span>
            </div>
            <div className="edit-container">
              <div className="product-edit-info">
                <div className="edit-title-product">
                  <span>{EditRow?.product_name} Product details</span>
                </div>
                <ul>
                  <div className="edit-info">
                    <li className="label-info">Product-Name</li>
                    <li className="updated-info" style={{ color: "red" }}>
                      {EditRow?.product_name}
                    </li>
                  </div>
                  <div className="edit-info">
                    <li className="label-info">Product-Category</li>
                    <li className="updated-info" style={{ color: "red" }}>
                      {EditRow?.product_category}
                    </li>
                  </div>
                  <div className="edit-info">
                    <li className="label-info">Product-Type</li>
                    <li className="updated-info" style={{ color: "red" }}>
                      {EditRow?.product_type}
                    </li>
                  </div>
                  <div className="edit-info">
                    <li className="label-info">Purchase-Price</li>
                    <li className="updated-info" style={{ color: "green" }}>
                      {EditRow?.product_category === "wholesales"
                        ? Number(EditRow.wpurchase_price).toLocaleString()
                        : Number(EditRow?.rpurchase_price).toLocaleString()}
                      .Tsh
                    </li>
                  </div>
                  <div className="edit-info">
                    <li className="label-info">selling-Price</li>
                    <li className="updated-info" style={{ color: "green" }}>
                      {EditRow?.product_category === "wholesales"
                        ? Number(EditRow.wholesales_price).toLocaleString()
                        : Number(EditRow?.retailsales_price).toLocaleString()}
                      Tsh
                    </li>
                  </div>
                  <div className="edit-info">
                    <li className="label-info">Profit Per Each</li>
                    <li className="updated-info" style={{ color: "green" }}>
                      {EditRow?.product_category === "wholesales"
                        ? (
                            Number(EditRow.wholesales_price) -
                            Number(EditRow.wpurchase_price)
                          ).toLocaleString()
                        : (
                            Number(EditRow?.retailsales_price) -
                            Number(EditRow?.rpurchase_price)
                          ).toLocaleString()}
                      .Tsh
                    </li>
                  </div>
                </ul>
              </div>
              <div className="product-edit-form-container">
                <EditProdoct
                  product_name={EditRow?.product_name}
                  product_id={String(EditRow?.id)}
                  product_category={EditRow?.product_category}
                  product_type={EditRow?.product_type}
                  rpurchase_price={EditRow?.rpurchase_price}
                  wpurchase_price={EditRow?.wpurchase_price}
                  Rs_price={EditRow?.retailsales_price}
                  Ws_price={EditRow?.wholesales_price}
                />
              </div>
            </div>
            <div className="Edit-title-container">
              <span>Product Other Info</span>
            </div>
            <div className="container-product-info">
              <div className="cuttoff-details">
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h3>Product Discount Info</h3>
                </div>
                <div className="card-conatiner-Disc">
                  {DiscRec.map((item) => (
                    <CutoffCard
                      key={item.id}
                      id={item.id}
                      product_name={item.product_name}
                      percentage={item.percentage}
                      start_from={item.start_from}
                      CashDiscount={item.start_from}
                    />
                  ))}
                </div>
              </div>
              <div className="cutoff-product-form-container">
                <CreateDiscount
                  product_name={EditRow?.product_name}
                  pId={EditRow?.id}
                  Ws_price={EditRow?.wholesales_price}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
