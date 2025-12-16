import "./stock.css";
import { Stockcard } from "../component/stock-card/stockcard";
import { Stocksheet } from "../component/stock-card/stocksheet";
import { RiCloseFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { StockCardResult } from "./stockservice";
import { FiSearch } from "react-icons/fi";
import type{ StockTransactionInterface } from "../type.interface";
import { FaExchangeAlt } from "react-icons/fa";

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
  const [transSearch, setTransSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [movementFilter, setMovementFilter] = useState<"all" | "remove_out" | "remove_in" | "add_in">("all");
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

  const cardView = (
    <div key="card-view" className="stock-content-main panel fade-slide-in">
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
    </div>
  );

  const transView = (
    <div key="trans-view" className="stock-content-main trans-content panel fade-slide-in">
      <div className="trans-filters">
        <div className="filter-group">
          <label>Product name</label>
          <input
            type="text"
            placeholder="Search product..."
            value={transSearch}
            onChange={(e) => setTransSearch(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>From date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>To date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Movement</label>
          <select
            value={movementFilter}
            onChange={(e) =>
              setMovementFilter(e.target.value as typeof movementFilter)
            }
          >
            <option value="all">All</option>
            <option value="remove_out">Remove OUT</option>
            <option value="remove_in">Remove IN</option>
            <option value="add_in">Add IN</option>
          </select>
        </div>
      </div>
      <div className="trans-table-wrapper">
        <table className="trans-table">
            <colgroup>
              <col style={{ width: "10%" }} />
              <col style={{ width: "16%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
          <thead>
            <tr>
              <th>Date</th>
              <th>Pname</th>
              <th>Category</th>

              <th>Prev</th>
              <th>New</th>
              <th>Total Pc</th>
              <th>Reasons</th>
              <th>By</th>
              <th>Method</th>
              <th>Movement</th>
            </tr>
          </thead>
          <tbody>
            {(stockTransaction ?? [])
              .filter((t) => {
                const nameMatch = t.Pname?.toLowerCase().includes(transSearch.toLowerCase());
                const created = new Date(t.Date);
                const fromOk = fromDate ? created >= new Date(fromDate) : true;
                const toOk = toDate ? created <= new Date(toDate + "T23:59:59.999Z") : true;
                let movementOk = true;
                if (movementFilter === "remove_out") movementOk = t.Method === "remove" && t.Movement === "OUT";
                if (movementFilter === "remove_in") movementOk = t.Method === "remove" && t.Movement === "IN";
                if (movementFilter === "add_in") movementOk = t.Method === "add" && t.Movement === "IN";
                return nameMatch && fromOk && toOk && movementOk;
              })
              .map((t, idx) => (
                <tr key={`${t.Date}-${idx}`}>
                  <td>{new Date(t.Date).toLocaleDateString()}</td>
                  <td className="nowrap">{t.Pname}</td>
                  <td>{t.product_category}</td>
                  <td>{Number(t.prev_stock).toFixed(0)}-Pc</td>
                  <td>{Number(t.new_stock).toFixed(0)}-Pc</td>
                  <td>{Number(t.total_pc).toFixed(0)}-Pc</td>
                  <td className="nowrap">{t.reasons}</td>
                  <td>{t.character}</td>
                  <td className={t.Method === "add" ? "pill add" : "pill remove"}>{t.Method}</td>
                  <td className={t.Movement === "IN" ? "pill add" : "pill remove"}>{t.Movement}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {(stockTransaction?.length ?? 0) === 0 && (
          <div className="trans-empty">No transactions found</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="stock-main-conatiner animated-enter">
      <div className="Sock-header">
        <h1 className="stpage-title">Stock Analysis page</h1>
        <button
          className="toggle-trans-btn"
          onClick={() => setisTrans((p) => !p)}
        >
          <FaExchangeAlt style={{ marginRight: 6 }} />
          {isTrans ? "Back to Cards" : "View Transactions"}
        </button>
      </div>
      <div className="panel-switch">
        {isTrans ? transView : cardView}
      </div>
    </div>
  );
}
