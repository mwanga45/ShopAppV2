import "./debtcomp.css";
import "./CardDiscript.css";
import type {
  CardDiscriptionInterface,
  DebtResponse,
} from "../../type.interface";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
export const Debtcompo: React.FC<DebtResponse> = ({
  findUserDebtInfo,
  findtrack,
  PersonDebt,
}) => {
  return (
    <div>
      <div className="Dbt-compo-list-title-container">
        <span className="Dbt-compo-list-title1">Daily Debtor Summary List</span>
        <span className="Dbt-compo-list-title2">
          Tracks today’s pending debts and unpaid balances from active sales.
        </span>
      </div>
      <div className="Dbt-compo-list-selection">
        <span>All Debts</span>
        <span>Paid</span>
        <span>Partalpaid</span>
      </div>
      <div className="Dbt-compo-list-container">
        {PersonDebt && PersonDebt.length > 0 ? (
          PersonDebt.map((item) => (
            <CardDiscription
              name={item.debtor_name}
              date={item.deadlinedate}
              amount={Number(item.total_revenue).toLocaleString()}
              title="Remmaing"
            />
          ))
        ) : (
          <span>No debt available</span>
        )}
      </div>
    </div>
  );
};
export const CardDiscription: React.FC<CardDiscriptionInterface> = ({
  name,
  date,
  amount,
  title,
  id,
}) => {
  const [openDispay, setDisplay] = useState<boolean>(true);
  return (
    <div className="crd-dsc-main-cont">
      <div className="crd-dsc-cont" key={id}>
        <div className="crd-dsc-icon-cont">
          <AiOutlineLoading3Quarters
            size={25}
            color="green"
            fontSize={28}
            fontWeight={700}
          />
        </div>
        <div className="crd-dsc-desc-info">
          <span className="crd-dcs-name">{name}</span>
          <span className="crd-dcs-amount">
            <span>{title}</span> {amount}Tsh
          </span>
        </div>
        <div className="crd-dcs-date-container">
          <span>{String(date).split("T")[0]}</span>
        </div>
      </div>
      {openDispay && (
        <div className="display-card-info-main-cont">
          <div className="display-card-info-cont">
            <Displayboard />
          </div>
        </div>
      )}
    </div>
  );
};

export const Displayboard = () => {
  return (
    <div className="Displayboard-main-container">
      <div className="Displayboard-info-cont">
        <div className="series-Displayboard-info-countdown">
          <div className="series-title-container">
            <span> Mama Kifitiri Payment Series</span>
            <span>Product name: Pallet starter</span>
          </div>
          <div className="time-Displayboard-info-countdown">
            <div className="list-paid-series-container">
              <div className="series-header">
                <span>Date</span>
                <span>Time</span>
                <span>Paid Amout</span>
              </div>
              <div className="series-list-payment-scroll">
                <div className="series-list-payment">
                  <span>12-12-2025</span>
                  <span>05:06</span>
                  <span>12,000</span>
                </div>
              </div>
            </div>
            <div className="Paid-reach-suppose">
              <div className="Paid-reach-suppose-cont">
                <span>Paiment Required</span>
                <span>40,000</span>
              </div>
              <div className="Paid-reach-suppose-cont">
                <span>Already Piad</span>
                <span>12,000.Tsh</span>
              </div>
              <div className="Paid-reach-suppose-cont">
                <span>Total remain</span>
                <span>28,000.Tsh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
