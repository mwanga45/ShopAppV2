import "./debtor.css"
export const Debtor = () => {
  return (
    <div className="dbt-container">
      <div className="dbt-title">
        <h3 className="dbt-head">Debtor Overview</h3>
      </div>
      <div className="dbt-content">
        <div className="dbt-stat">
          <div className="stat-row">
            <span className="stat-label">Total Debtors:</span>
            <span className="stat-value">24</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Outstanding Amount:</span>
            <span className="stat-value">$12,450</span>
          </div>
          <div className="debtor-list">
            <div className="debtor-head">
                <div className="debtor-title">
                    <p className="actl-head">Name</p>
                    <p className="actl-head">Return date</p>
                </div>
                <div className="debtor-details">
                    <p>Eliamin mwanga</p>
                    <p>10-12-2015</p>
                </div>
                    <div className="debtor-details">
                    <p>Eliamin mwanga</p>
                    <p>10-12-2015</p>
                </div>
            </div>
          </div>
        </div>
        <div className="indicator-debtor">
            <div className="reach">
                <p className="description">Playment reach</p>
                 <div className="descr-color"></div>
            </div>
            <div className="not-reach">
                <p className="description">Not yet Reach</p>
                <div className="color-descr"></div>
            </div>
        </div>
      </div>
    </div>
  )
}