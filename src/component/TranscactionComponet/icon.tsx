import {
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
      { name: "Tax", icon: <FaChartPie key="tax" />, color: "text-red-400", iconName:'FaChartPie'},
      { name: "Bank", icon: <FaUniversity key="bank" />, color: "text-purple-400",iconName:'FaUniversity' },
      { name: "Withdraw", icon: <FaArrowCircleDown key="withdraw" />, color: "text-cyan-400",iconName:'FaArrowCircleDown' },
    ],
  },
  {
    category: "Utilities",
    icons: [
      { name: "Electricity", icon: <FaBolt key="electricity" />, color: "text-yellow-400", iconName:'FaBolt' },
      { name: "Others", icon: <FaEllipsisH key="others" />, color: "text-gray-400" , iconName:'FaEllipsisH'},
    ],
  },
  {
    category: "Income & Personal",
    icons: [
      { name: "Salary", icon: <FaUserTie key="salary" />, color: "text-blue-400", iconName:'FaUserTie' },
      { name: "Pocket", icon: <FaWallet key="pocket" />, color: "text-green-400", iconName:'FaWallet' },
    ],
  },
  {
    category: "Expenses",
    icons: [
      { name: "Debt", icon: <FaHandHoldingUsd key="debt" />, color: "text-pink-400", iconName:'FaHandHoldingUsd' },
      { name: "Food", icon: <FaUtensils key="food" />, color: "text-orange-400", iconName:'FaUtensils' },
    ],
  },
];
