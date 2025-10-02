import type React from "react"
import "./summarycard.css"
interface SummaryCardProps {
   icon:React.ElementType
   SummaryTitle?:string,
   SummaryActInfo?:string | number,
   style?: React.CSSProperties;


}
export const SummaryCard:React.FC<SummaryCardProps> =({icon:Icon,SummaryActInfo,SummaryTitle, style})=>{
    return(
        <div className="summary-card-container" style={style}>
            <div className="summary-icon">
               <Icon size={25}/>
            </div>
            <div className="summary-info">
                <p className="summary-titlename">
                    {SummaryTitle}
                </p>
                <p className="summary-act-info" style={style}>
                    {SummaryActInfo}
                </p>
            </div>

        </div>
    )

}