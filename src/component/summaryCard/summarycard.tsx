import type React from "react"
import "./summarycard.css"
interface SummaryCardProps {
   icon:React.ElementType
   SummaryTitle:string,
   SummaryActInfo:string


}
export const SummaryCard:React.FC<SummaryCardProps> =({icon:Icon,SummaryActInfo,SummaryTitle})=>{
    return(
        <div className="summary-card-container">
            <div className="summary-icon">
               <Icon size={20}/>
            </div>
            <div className="summary-info">
                <p className="summary-titlename">
                    {SummaryTitle}
                </p>
                <p className="summary-act-info">
                    {SummaryActInfo}.Sh
                </p>
            </div>

        </div>
    )

}