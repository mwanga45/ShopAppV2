import "./salesdeviation.css"
import { FaArrowsSplitUpAndLeft, FaArrowUp, FaArrowDown, FaChartLine } from "react-icons/fa6";

export const Salesdeviation = () => {
    return (
        <div className="dev-container">
            <div className="dev-header">
                <div className="dev-icon">
                    <FaChartLine />
                </div>
                <h3 className="dev-title">Sales Deviation</h3>
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
                    <div className="metric-value">2,300,000 Tsh</div>
                </div>
                
                <div className="dev-metric">
                    <div className="metric-header">
                        <span className="metric-label">Expected Generated</span>
                        <div className="metric-icon neutral">
                            <FaChartLine />
                        </div>
                    </div>
                    <div className="metric-value">2,500,000 Tsh</div>
                </div>
                
                <div className="dev-metric">
                    <div className="metric-header">
                        <span className="metric-label">Deviation</span>
                        <div className="metric-icon negative">
                            <FaArrowDown />
                        </div>
                    </div>
                    <div className="metric-value deviation">200,000 Tsh</div>
                </div>
                
                <div className="dev-metric">
                    <div className="metric-header">
                        <span className="metric-label">Deviation Percentage</span>
                        <div className="metric-icon negative">
                            <FaArrowDown />
                        </div>
                    </div>
                    <div className="metric-value percentage">8%</div>
                </div>
            </div>
            
            <div className="dev-footer">
                <div className="status-indicator">
                    <span className="status-text">Below Target</span>
                    <div className="status-bar">
                        <div className="status-fill" style={{width: '92%'}}></div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}