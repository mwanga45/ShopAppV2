import { useState } from "react";
import type { DeviationResultCard } from "../../type.interface";
import "./salesdeviation.css"
import { FaArrowsSplitUpAndLeft, FaArrowUp, FaArrowDown, FaChartLine } from "react-icons/fa6";

export const Salesdeviation:React.FC<DeviationResultCard> = ({TotalGenerated, PercentageDeviation, DeviationAmount, ExpectedRevenue}) => {

    return (
        <div className="dev-container">
            <div className="dev-header">
                <div className="dev-icon">
                    <FaChartLine />
                </div>
                <h3 className="dev-title">Sales Deviation Analysis</h3>
                <div className="dev-arrow">
                    <FaArrowsSplitUpAndLeft />
                </div>
            </div>
            
            <div className="dev-content">
                <div className="dev-metric">
                    <div className="metric-header">
                        <span className="metric-label">Total Today Generated</span>
                        <div className="metric-icon positive">
                            <FaArrowUp />
                        </div>
                    </div>
                    <div className="metric-value">{Number(TotalGenerated).toLocaleString()}.Tsh</div>
                </div>
                
                <div className="dev-metric">
                    <div className="metric-header">
                        <span className="metric-label">Expected Generated</span>
                        <div className="metric-icon neutral">
                            <FaChartLine />
                        </div>
                    </div>
                    <div className="metric-value">{Number(ExpectedRevenue).toLocaleString()}.Tsh</div>
                </div>
                
                <div className="dev-metric">
                    <div className="metric-header">
                        <span className="metric-label">Deviation</span>
                        <div className="metric-icon negative">
                            <FaArrowDown />
                        </div>
                    </div>
                    <div className="metric-value deviation">{Number(DeviationAmount).toLocaleString()}.Tsh</div>
                </div>
                
                <div className="dev-metric">
                    <div className="metric-header">
                        <span className="metric-label">Deviation Percentage</span>
                        <div className="metric-icon negative">
                            <FaArrowDown />
                        </div>
                    </div>
                    <div className="metric-value percentage">{Number(PercentageDeviation).toFixed(1)}%</div>
                </div>
            </div>
            
            <div className="dev-footer">
                <div className="status-indicator">
                    <span className="status-text">Below Target</span>
                    <div className="status-bar">
                        <div className="status-fill" style={{width: `${PercentageDeviation}`}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}