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
            <div className="debtor-name">
                <ul>
                    <p className="name-title">Names</p>
                    <li className="act-list"></li>
                    <li className="act-list"></li>
                    <li className="act-list"></li>
                    <li className="act-list"></li>
                </ul>

            </div>
            <div className="debtor-date">
                <ul>
                    <p className="debtoe-name">Date return</p>
                    <li className="act-list"></li>
                    <li className="act-list"></li>
                    <li className="act-list"></li>
                    <li className="act-list"></li>
                </ul>
            </div>
          </div>
        </div>
        <div className="dbt-chart">
        </div>
      </div>
    </div>
  )
}