import "./daysales.css";
export const AdminsalesAnaysis = () => {
  return (
    <div className="salesAnaysis-main-container">
      <div className="salesAnalysis-title-container">
        <span className="analysis-first-title">Sales</span>
        <span className="analysis-second-title">
          Overview of Your sales Performance today{" "}
        </span>
      </div>
      <div className="salesdayasanalysis-container">
        <div className="sales-analysis-graph-container"></div>
        <div className="salasAnalysis-card-container">
          <div className="business-card-comaparizone">
            <div className="first-card-comparizone">stock-in</div>
            <div className="second-card-comparizone">stock-out</div>
          </div>
          <div className="business-card-comaparizone">
            <div className="first-card-comparizone">profi comparizone today</div>
            <div className="second-card-comparizone">profit comparizone yesterday</div>
          </div>
        </div>
      </div>
      <div className="order-debt-record-deviation">
        <div className="today-debtor-list"></div>
        <div className="order-list-total-deviation">
          <div className="title-orderlist-deviatian-container">
            <span>Order Placement And Deviation </span>
          </div>
          <div className="order-card-deviation"></div>
        </div>
      </div>
    </div>
  );
};
