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

export const Services = [
  {
    category: "Finance",
    icons: [
      { name: "Tax", icon: <FaChartPie key="tax" />, color: "text-red-400" },
      { name: "Bank", icon: <FaUniversity key="bank" />, color: "text-purple-400" },
      { name: "Withdraw", icon: <FaArrowCircleDown key="withdraw" />, color: "text-cyan-400" },
    ],
  },
  {
    category: "Utilities",
    icons: [
      { name: "Electricity", icon: <FaBolt key="electricity" />, color: "text-yellow-400" },
      { name: "Others", icon: <FaEllipsisH key="others" />, color: "text-gray-400" },
    ],
  },
  {
    category: "Income & Personal",
    icons: [
      { name: "Salary", icon: <FaUserTie key="salary" />, color: "text-blue-400" },
      { name: "Pocket", icon: <FaWallet key="pocket" />, color: "text-green-400" },
    ],
  },
  {
    category: "Expenses",
    icons: [
      { name: "Debt", icon: <FaHandHoldingUsd key="debt" />, color: "text-pink-400" },
      { name: "Food", icon: <FaUtensils key="food" />, color: "text-orange-400" },
    ],
  },
];
