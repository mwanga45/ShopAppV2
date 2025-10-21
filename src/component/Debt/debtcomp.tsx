import "./debtcomp.css";
import "./CardDiscript.css";
import type {
  CardDiscriptionInterface,
  DebtRecord,
  DebtResponse,
  // TrackRecord,\
  DebtorOtherinfoProps,
} from "../../type.interface";
import { FcDebt } from "react-icons/fc";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import React, { useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { FcProcess } from "react-icons/fc";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa";
import { FaPhone, FaS } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import {SmsPopup} from '../sms-compo/sms-popup'

import { FiUser } from "react-icons/fi";
export const Debtcompo: React.FC<DebtResponse> = ({
  PersonDebt,
  PersonOverallDebtRec,
}) => {
  const [selectedDebt, setSelectedDebt] = useState<DebtRecord | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  const handleOpenDetail = (record: any) => {
    setSelectedDebt({
      debt_id: record.debt_id,
      debtor_name: record.debtor_name,
      deadlinedate: record.deadlinedate,
      phone_number: record.phone_number,
      latest_paid_amount: record.latest_paid_amount,
      createdat: record.createdat,
      total_revenue: record.total_revenue,
      total_quantity: record.total_quantity,
      product_name: record.product_name,
      tracks: record.tracks || [],
    });
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedDebt(null);
  };

  return (
    <div className="Debtcompo-main-comp-comb">
      <div className="Dbt-compo-list-main-container">
        <div className="Dbt-compo-list-title-container">
          <span className="Dbt-compo-list-title1">
            Daily Debtor Summary List
          </span>
          <span className="Dbt-compo-list-title2">
            Tracks today’s pending debts and unpaid balances from active sales.
          </span>
        </div>
        <div className="Dbt-compo-list-selection">
          <span>All Debts</span>
          <span>Paid</span>
          <span>debts</span>
        </div>
        <div className="Dbt-compo-list-container">
          {PersonDebt && PersonDebt.length > 0 ? (
            PersonDebt.map((item) => (
              <div key={item.debt_id} onClick={() => handleOpenDetail(item)}>
                <CardDiscription
                  id={item.debt_id}
                  name={item.debtor_name}
                  date={item.deadlinedate}
                  amount={Number(item.total_revenue).toLocaleString()}
                  title="Remaining"
                  Icon={
                    item.payment_status === "paid"
                      ? FaCheckCircle
                      : FaHourglassHalf
                  }
                />
              </div>
            ))
          ) : (
            <span>No debt available</span>
          )}
        </div>
        {isDetailOpen && selectedDebt && (
          <div className="debt-overlay">
            <div className="debt-modal">
              <div className="AdminsalesAnalysis-container-arrange-close-btn">
                <div className="icon" onClick={handleCloseDetail}>
                  <RiCloseFill color="black" size={30} fontWeight={500} />
                </div>
              </div>
              <div className="dt-sispay-conatiner">
                <Displayboard
                  debt_id={selectedDebt.debt_id}
                  debtor_name={selectedDebt.debtor_name}
                  deadlinedate={selectedDebt.deadlinedate}
                  phone_number={selectedDebt.phone_number}
                  latest_paid_amount={selectedDebt.latest_paid_amount}
                  createdat={selectedDebt.createdat}
                  total_revenue={selectedDebt.total_revenue}
                  total_quantity={selectedDebt.total_quantity}
                  product_name={selectedDebt.product_name}
                  tracks={selectedDebt.tracks}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <DebtorOtherinfo
        Debtor_name={PersonOverallDebtRec?.customer_name ?? ""}
        Location={PersonOverallDebtRec?.Location?.Location ?? ""}
        Phone_number={PersonOverallDebtRec?.Location?.Phone_number ?? ""}
        Debtnumber={PersonOverallDebtRec?.Debtnumber ?? 0}
        countUnpaid={PersonOverallDebtRec?.countUnpaid ?? 0}
        CountPaidMoney={PersonOverallDebtRec?.CountPaidMoney ?? 0}
        total_revenue={PersonOverallDebtRec?.total_revenue ?? 0}
        PaidOutDate={PersonOverallDebtRec?.PaidOutDate ?? 0}
        countUnpaidMoney={PersonOverallDebtRec?.countUnpaidMoney}
      />
    </div>
  );
};
export const CardDiscription: React.FC<CardDiscriptionInterface> = ({
  name,
  date,
  amount,
  title,
  id,
  Icon: Icon,
}) => {
  return (
    <div className="crd-dsc-main-cont">
      <div className="crd-dsc-cont" key={id}>
        <div className="crd-dsc-icon-cont">
          <FcDebt size={25} color="green" fontSize={28} fontWeight={700} />
        </div>
        <div className="crd-dsc-desc-info">
          <span className="crd-dcs-name">{name}</span>
          <span className="crd-dcs-amount">
            <span>{title}</span> {amount}Tsh
          </span>
        </div>
        <div className="crd-dcs-date-container">
          <span>{String(date).split("T")[0]}</span>
          <span>{Icon && <Icon />}</span>
        </div>
      </div>
    </div>
  );
};

export const Displayboard: React.FC<DebtRecord & DebtResponse> = ({
  debt_id,
  debtor_name,
  deadlinedate,
  phone_number,
  latest_paid_amount,
  createdat,
  total_revenue,
  total_quantity,
  product_name,
  tracks,
}) => {
    const [smspayload, setsmspayload] = useState({
    sms: "",
    Phone_number: "",
  });
  const [opensms , setopensms] = useState<boolean>(false)
  const totalRevenueNum = Number(total_revenue ?? 0);
  const alreadyPaid = Number(latest_paid_amount ?? 0);
  const remain = Math.max(totalRevenueNum - alreadyPaid, 0);
  const handleOpensms = () =>{
    setopensms(!opensms)
  }
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const time = new Date(deadlinedate ?? "").getTime();

    setInterval(() => {
      const timer = new Date().getTime();
      const different = time - timer;

      if (different <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(different / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (different % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mins = Math.floor((different % (1000 * 60 * 60)) / (1000 * 60));
      const sec = Math.floor((different % (1000 * 60)) / 1000);
      setTimeLeft({
        days: days,
        minutes: mins,
        hours: hours,
        seconds: sec,
      });
    }, 1000);
  }, [deadlinedate]);
  const handleOnchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setsmspayload((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="Displayboard-main-container" key={debt_id}>
      <div className="Displayboard-info-cont">
        <div className="series-Displayboard-info-countdown">
          <div className="series-title-container">
            <span> {debtor_name} Payment Series</span>
            <span>Product name: {product_name}</span>
          </div>
          <div className="time-Displayboard-info-countdown">
            <div className="list-paid-series-container">
              <div className="series-header">
                <span>Date</span>
                <span>Time</span>
                <span>Paid Amout</span>
              </div>
              <div className="series-list-payment-scroll">
                {tracks && tracks.length > 0 ? (
                  tracks.map((t, idx) => (
                    <div className="series-list-payment" key={idx}>
                      <span>{String(t.updated_at).split("T")[0]}</span>
                      <span>
                        {String(t.updated_at).split("T")[1]?.substring(0, 5)}
                      </span>
                      <span>{Number(t.paidmoney).toLocaleString()}.Tsh</span>
                    </div>
                  ))
                ) : (
                  <div className="series-list-payment">
                    <span>-</span>
                    <span>-</span>
                    <span>0</span>
                  </div>
                )}
              </div>
            </div>
            <div className="Paid-reach-suppose">
              <div className="Paid-reach-suppose-cont">
                <span>Paiment Required</span>
                <span>{totalRevenueNum.toLocaleString()}.Tsh</span>
              </div>
              <div className="Paid-reach-suppose-cont">
                <span>Already Paid</span>
                <span>{alreadyPaid.toLocaleString()}.Tsh</span>
              </div>
              <div className="Paid-reach-suppose-cont">
                <span>Total remain</span>
                <span>{remain.toLocaleString()}.Tsh</span>
              </div>
              <span>Other details</span>
              <div className="Paid-reach-suppose-cont">
                <span>total Quantity</span>
                <span>{Number(total_quantity ?? 0)}pc</span>
              </div>
              <div className="Paid-reach-suppose-cont">
                <span>latest paid amount</span>
                <span>{alreadyPaid.toLocaleString()}.Tsh</span>
              </div>
              <div className="Paid-reach-suppose-cont">
                <span>Debtor-Phone</span>
                <span>{phone_number}</span>
              </div>
            </div>
          </div>
          <div className="Action-container">
            <button className="action-btn-debt">Update</button>
            <button className="action-btn-debt">Add</button>
            <button className="action-btn-debt" onClick={handleOpensms}>Send Message</button>
          </div>
        </div>
        <div className="display-info-time">
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span>Time countdown && Date</span>
              <LiaBusinessTimeSolid size={50} color="white" />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "25px" }}>CountDown</span>
            <span>
              {timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:
              {timeLeft.seconds}
            </span>
          </div>
          <div>
            <span>CreatedAt:{String(createdat).split("T")[0]}</span>
            <span>Deadline Date:{String(deadlinedate).split("T")[0]}</span>
          </div>
        </div>
        {opensms &&

          <div className="sms-container">
            <SmsPopup isOpen={handleOpensms}  onClose={handleOpensms} Debtor_name={debtor_name ?? ''}/>
          </div>

        }
      </div>
    </div>
  );
};
export const DebtorOtherinfo: React.FC<DebtorOtherinfoProps> = ({
  Location,
  CountPaidMoney,
  countUnpaidMoney,
  countUnpaid,
  total_revenue,
  Debtnumber,
  Debtor_name,
  Phone_number,
  PaidOutDate,
}) => {
  return (
    <div className="DebtorOtherinf-main-container">
      <div>
        <span className="Dbt-compo-list-title1">Debt record overall</span>
      </div>
      <div className="DebtorOtherinf-main-info">
        <div className="DebtorOtherinf-main-detail-comp">
          <div>
            <span>
              <FiUser color="green" size={25} />
            </span>
            <div className="icon-name-container">
              <span>Name</span>
              <span>{Debtor_name}</span>
            </div>
          </div>
          <div>
            <span>
              <CiLocationOn color="blue" size={25} />
            </span>
            <div className="icon-name-container">
              <span>Location</span>
              <span>{Location}</span>
            </div>
          </div>
        </div>
        <div>
          <span>
            <FcProcess color="red" size={25} />
          </span>
          <div className="icon-name-container">
            <span>Debt Number</span>
            <span>{Debtnumber}</span>
          </div>
        </div>
        <div>
          <span>
            <FaExclamationTriangle color="#FCB045" size={25} />
          </span>
          <div className="icon-name-container">
            <span>Paid out of Date </span>
            <span>{PaidOutDate}</span>
          </div>
        </div>
        <div>
          <span>
            <FaHourglassHalf color="#FCB045" size={25} />
          </span>
          <div className="icon-name-container">
            <span>On ongoing debt</span>
            <span>{countUnpaid}</span>
          </div>
        </div>
        <div>
          <span>
            <FaPhone size={25} />
          </span>
          <div className="icon-name-container">
            <span>Phone number</span>
            <span>+{Phone_number}</span>
          </div>
        </div>
        <div>
          <div className="icon-name-container">
            <span>Unpaid total</span>
            <span>{Number(countUnpaidMoney).toLocaleString()}.Tsh</span>
          </div>
          <div className="icon-name-container">
            <span>Already Paid</span>
            <span>{Number(CountPaidMoney).toLocaleString()}.Tsh</span>
          </div>
        </div>
      </div>
    </div>
  );
};
