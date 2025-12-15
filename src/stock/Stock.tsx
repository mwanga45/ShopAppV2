import "./stock.css";
import { Stockcard } from "../component/stock-card/stockcard";
import { Stocksheet } from "../component/stock-card/stocksheet";
import { RiCloseFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { StockCardResult } from "./stockservice";
import { FiSearch } from "react-icons/fi";
import type{ StockTransactionInterface } from "../type.interface";

export interface Stockprops {
  product_id: number;
  product_name: string;
  user_id: number;
  fullname: string;
  last_add_stock: number;
  last_stock: number;
  UpdateAt: string;
  percentageRemain: number;
  product_category: string;
  //  requestFn?: () => void;
}
export default function Stock() {
  const [Showupdate, setShowupdate] = useState<boolean>(false);
  const [Carddata, setCarddata] = useState<Stockprops[]>([]);
  const [searchText, setsearchText] = useState("");
  const [selectedStock, setSelectedStock] = useState<Stockprops | null>(null);
  const [selectedType, setSelectedType] = useState("All");
  const [isTrans, setisTrans] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [stockTransaction, setstockTransaction] = useState<StockTransactionInterface[]>()
  const handleShowUpdateForm: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    setShowupdate(!Showupdate);
  };

  // Fetch stock data function
  const fetchStockData = async () => {
    try {
      const response = await StockCardResult();
      if (!response.data.success) {
        console.error(response.data.message);
        return;
      }
      setCarddata(response.data.data.finalresult);
      setstockTransaction(response.data.data.returnStockTransaction)
    } catch (err) {
      console.error("Failed to fetch stock data:", err);
    }
  };

  // Initial fetch and auto-refresh setup
  useEffect(() => {
    // Fetch immediately on mount
    fetchStockData();

    // Set up auto-refresh every 5 seconds
    const refreshInterval = setInterval(() => {
      // Only refresh if update form is not open
      if (!Showupdate) {
        fetchStockData();
      }
    }, 5000); // Refresh every 5 seconds

    // Cleanup interval on unmount
    return () => clearInterval(refreshInterval);
  }, [Showupdate]); // Re-run when Showupdate changes

  const filtercardData: Stockprops[] = Carddata.filter((items) => {
    const matchesName = items.product_name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesType =
      selectedType === "All" || items.product_category === selectedType;

    const matchesCategory =
      selectedCategory === "All" || items.product_category === selectedCategory;

    return matchesName && matchesType && matchesCategory;
  });

  return (
    <div className="stock-main-conatiner animated-enter">
      <div className="Sock-header">
        <h1 className="stpage-title">Stock Analysis page</h1>
      </div>
      {isTrans === false ?
             <div className="stock-content-main">
        <p className="filter-title">Filter by</p>
        <div className="filter-container">
          <div className="filter-by-category">
            <button onClick={() => setSelectedType("All")}>All</button>
            <button onClick={() => setSelectedType("Solid")}>Solid</button>
            <button onClick={() => setSelectedType("Liquid")}>Liquid</button>
          </div>
          <div className="filter-by-name-style">
            <input
              type="text"
              name="searchText"
              placeholder="search by name"
              value={searchText}
              onChange={(e) => setsearchText(e.target.value)}
              style={{ outline: "none" }}
            />
            <FiSearch size={25} />
          </div>
        </div>
        {filtercardData ? (
          <div className="card-stock-list">
            {filtercardData.map((s) => (
              <Stockcard
                key={s.product_id}
                onclick={(e) => {
                  handleShowUpdateForm(e);
                  setSelectedStock(s);
                }}
                product_id={s.product_id}
                product_name={s.product_name}
                UpdateAt={s.UpdateAt}
                last_add_stock={s.last_add_stock}
                last_stock={s.last_stock}
                fullname={s.fullname}
                user_id={s.user_id}
                percentageRemain={s.percentageRemain || 0}
                product_category={s.product_category}
              />
            ))}
          </div>
        ) : (
          <div className="card-stock-list">
            <span>Please No stock info is available</span>
          </div>
        )}
        {Showupdate && selectedStock && (
          <div className="pop-background">
            <div className="close-poup-container">
              <div
                className="icon-close"
                onClick={() => setShowupdate(!Showupdate)}
              >
                <RiCloseFill size={30} />
              </div>
            </div>
            <div className="content-container-component">
              <Stocksheet 
                {...selectedStock} 
                onUpdateSuccess={() => {
                  fetchStockData();
                  setShowupdate(false);
                }}
              />
            </div>
          </div>
        )}
      </div>: <div className="stock-content-main"></div>
      }
    </div>
  );
}
