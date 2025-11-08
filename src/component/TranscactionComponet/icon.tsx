import React from "react";
import {
  FaMoneyBillWave,
  FaBolt,
  FaUserTie,
  FaWallet,
  FaUniversity,
  FaHandHoldingUsd,
  FaUtensils,
  FaArrowCircleDown,
  FaEllipsisH,
  FaChartPie,
} from "react-icons/fa";

export const  FinanceServiceList=()=> {
  const services = [
    { name: "Tax", icon: <FaChartPie />, color: "text-red-400" },
    { name: "Electricity", icon: <FaBolt />, color: "text-yellow-400" },
    { name: "Salary", icon: <FaUserTie />, color: "text-blue-400" },
    { name: "Pocket", icon: <FaWallet />, color: "text-green-400" },
    { name: "Bank", icon: <FaUniversity />, color: "text-purple-400" },
    { name: "Debt", icon: <FaHandHoldingUsd />, color: "text-pink-400" },
    { name: "Food", icon: <FaUtensils />, color: "text-orange-400" },
    { name: "Withdraw", icon: <FaArrowCircleDown />, color: "text-cyan-400" },
    { name: "Others", icon: <FaEllipsisH />, color: "text-gray-400" },
  ];

  return (
    <div className="p-6 bg-gray-900 text-white rounded-2xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
        Finance & Expense Services
      </h2>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {services.map((service, index) => (
          <li
            key={index}
            className="flex flex-col items-center p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all cursor-pointer"
          >
            <span className={`text-3xl mb-2 ${service.color}`}>
              {service.icon}
            </span>
            <span className="text-sm font-medium">{service.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
