import './daysales.css'
export const AdminsalesAnaysis = () => {
  return (
    <div className="salesAnaysis-main-container">
      <div className="salesAnalysis-title-container">
        <span className='analysis-first-title'>Sales</span>
        <span className='analysis-second-title'>Overview of Your sales Performance today </span>
      </div>
      <div className="salesdayasanalysis-container">
        <div className="sales-analysis-graph-container"></div>
        <div className="salasAnalysis-card-container"></div>
      </div>
      <div className="order-debt-record-deviation">
          <div className="today-debtor-list"></div>
          <div className="order-list-total-deviation">
            <div className="order-card-deviation"></div>
          </div>
      </div>
    </div>
  );
};
