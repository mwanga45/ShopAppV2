import React, { useRef, useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./donalchart.css";
import { StockCardResult } from "../../stock/stockservice";
import type { Stockprops } from "../../stock/Stock";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);



export const DonalChart: React.FC = () => {
  const chartRef = useRef<ChartJS<"doughnut">>(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [ProductStockInfo, setProductStockInfo] = useState<Stockprops[]>([])
  const [_, setIsTransitioning] = useState(false);

  
  const currentProduct = ProductStockInfo[currentProductIndex];
  useEffect(() => {
    const handlestockResult = async () => {
      try {
        const response = await StockCardResult();
        if(!response.data.success){
          alert(response.data.message)
          return
        }
        const nomalizedata:Stockprops[] = response.data.data.map((item:any)=>(
          {
            ...item,
            last_add_stock: parseFloat(item.last_add_stock),
            last_stock: parseFloat(item.last_stock),
            percentageRemain: Number(item.percentageRemain).toFixed(0) ?? 0,
          }
        ))
        setProductStockInfo(nomalizedata)
      } catch (error) {
        alert("something went wrong");
        console.error(error);
        return;
      }
    };
    handlestockResult()
  }, []);

  useEffect(()=> {
     const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentProductIndex(
          (prevIndex) => (prevIndex + 1) % ProductStockInfo.length
        );
        setIsTransitioning(false);
      }, 500); 
    }, 1500);

    return () => clearInterval(interval);
  }, [ProductStockInfo])

    if (!currentProduct) {
    return (
      <div className="donut-chart-container">
        <p>Loading stock data...</p>
      </div>
    );
  }
  const data = {
    labels: ["Stock Remaining", "Stock Used"],
    datasets: [
  {
    data: [
      currentProduct.last_stock,
      Math.max(currentProduct.last_add_stock - currentProduct.last_stock, 0),
    ],
    backgroundColor: [
      currentProduct.percentageRemain > 50
        ? "#28a745" 
        : currentProduct.percentageRemain > 25
        ? "#ffc107" 
        : "#dc3545", 
      "#e9ecef",
    ],
    borderColor: [
      currentProduct.percentageRemain > 50
        ? "#28a745"
        : currentProduct.percentageRemain > 25
        ? "#ffc107"
        : "#dc3545",
      "#dee2e6",
    ],
    borderWidth: 2,
    cutout: "70%",
    hoverOffset: 4,
  },
],

  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false, // Disable tooltips to prevent data export
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    interaction: {
      intersect: false,
      mode: "nearest" as const,
    },
  };

  return (
    <div className="donut-chart-container">
      <div className="chart-header">
        <h4 className="chart-title">Stock Status</h4>
        <div className="product-info">
          <h5 className="product-name">{currentProduct.product_name}</h5>
          <p className="product-category">{currentProduct.product_category}</p>
        </div>
        <div className="stock-info">
          <span className="stock-percentage">
            {currentProduct.percentageRemain}%
          </span>
          <span className="stock-label">Remaining</span>
        </div>
      </div>

      <div className="chart-wrapper">
        <Doughnut ref={chartRef} data={data} options={options} />

        <div className="chart-center">
          <div className="center-content">
            <span className="center-percentage">
              {currentProduct.percentageRemain}%
            </span>
            <span className="center-label">Stock</span>
          </div>
        </div>
      </div>

      <div className="chart-footer">
        <div className="stock-details">
          <div className="detail-item">
            <span className="detail-label">Current:</span>
            <span className="detail-value">{currentProduct.last_stock}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Total:</span>
            <span className="detail-value">{currentProduct.last_add_stock}</span>
          </div>
        </div>

        <div className="product-indicator">
          {ProductStockInfo.map((_, index) => (
            <div
              key={index}
              className={`indicator-dot ${
                index === currentProductIndex ? "active" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
