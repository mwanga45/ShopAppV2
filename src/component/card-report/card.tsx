import "./card.css"
export const CardReport = ()=>{
    return(
        <div className="card-container">
            <div className="card-title">
                <p className="fast-low">Fast-sales</p>
            </div>
            <div className="product-class">
                <ul>
                    <li className="prd-cls"></li>
                    <li className="prd-cls"></li>
                </ul>
            </div>
            <div className="percentage-remain">
                <ul>
                    <li className="prd-cls"></li>
                    <li className="prd-cls"></li>
                </ul>
            </div>
        </div>
    )
}