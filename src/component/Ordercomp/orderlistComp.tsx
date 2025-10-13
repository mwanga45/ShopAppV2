import "./Ordercomp.css";

export const OrderlistComp = () => {
  return (
    <div className="Ord-list-main-container">
      <div className="ord-header">
        <span>ID</span>
        <span>Customer Name</span>
        <span>Product Name</span>
        <span>Quantity</span>
        <span>Pay Amount</span>
        <span>Paid Amount</span>
        <span>Paid Status</span>
        <span>Receiving Date</span>
      </div>

      <div className="ord-list-scroll">
        <div className="ord-row">
          <span>100</span>
          <span>John Doe</span>
          <span>Tumbili Seed</span>
          <span>2 Bags</span>
          <span>50,000</span>
          <span>25,000</span>
          <span>Partial Paid</span>
          <span>27-08-2025</span>
        </div>

        <div className="ord-row">
          <span>101</span>
          <span>Jane Doe</span>
          <span>Sunflower Oil</span>
          <span>1 Drum</span>
          <span>80,000</span>
          <span>80,000</span>
          <span>Fully Paid</span>
          <span>28-08-2025</span>
        </div>
      </div>
    </div>
  );
};
