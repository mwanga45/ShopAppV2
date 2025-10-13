import "./Ordercomp.css";
export const OrderlistComp = () => {
  return (
    <div className="Ord-list-main-container">
      <div>
        <ul>
          <li>ID</li>
          <li>Customer name</li>
          <li>Product name</li>
          <li>Product Quantity</li>
          <li>PayAmount</li>
          <li>PaidAmount</li>
          <li>Paid Status</li>
          <li>Reciving Date</li>
        </ul>
      </div>
      <div>
        <ul>
         <li>100</li>
         <li>Jonh Doe</li>
          <li>Tumbili seed</li>
          <li>2 Bags</li>
          <li>50000</li>
          <li>250000</li>
          <li>Partialpaid</li>
          <li>27-08-2025</li>
        </ul>
      </div>
    </div>
  );
};
