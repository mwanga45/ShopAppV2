import "./card.css"
import { FaChartLine, FaBoxes, FaShoppingCart, FaPercentage } from "react-icons/fa"

export const CardReport = () => {
    return (
        <div className="card-container">
            <div className="card-title">
                <FaChartLine className="card-icon" />
                <p className="fast-low">Fast-sales Month</p>
            </div>
            <div className="product-class">
                <ul>
                    <li className="prd-cls">
                        <FaBoxes className="list-icon" />
                        Whole sales
                    </li>
                    <li className="prd-cls">
                        <FaShoppingCart className="list-icon" />
                        Retails-sales
                    </li>
                </ul>
            </div>
            <div className="percentage-remain">
                <p className="card-title">
                    <FaPercentage className="card-icon" />
                    Percentage Remain each
                </p>
                <div className="product-class">
                    <ul>
                        <li className="prd-cls">%Productname Remain</li>
                        <li className="prd-cls">%Productname Remain</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}