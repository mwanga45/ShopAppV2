import Donat_chart from "./chart"
import "./stockcard.css"
export default function Stockcard() {
  return (
    <div className="stock-card-container">
      <div className="stock-card-main">
        <div className="stock-card-info">
          <p className="info-about">Product-name</p>
          <p className="info-real">Pallet starter</p>
          <p className="info-about">Remain Product</p>
          <p className="info-real">5/20 pc</p>
          <p className="info-about">% Remain </p>
          <p className="info-real">20%</p>
        </div>
        <div className="stock-card-donut">
            <Donat_chart/>
        </div>
      </div>
    </div>
  )
}
