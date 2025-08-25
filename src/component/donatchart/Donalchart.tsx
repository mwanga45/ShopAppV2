import React, { useRef, useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './donalchart.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

// Sample product stock data - you can replace with real data
const productStockData = [
  {
    id: 1,
    name: "Palet Starter",
    stockRemaining: 85,
    totalStock: 1000,
    currentStock: 850,
    category: "Basic Product"
  },
  {
    id: 2,
    name: "Premium Palet",
    stockRemaining: 45,
    totalStock: 500,
    currentStock: 225,
    category: "Premium Tier"
  },
  {
    id: 3,
    name: "Basic Palet",
    stockRemaining: 92,
    totalStock: 800,
    currentStock: 736,
    category: "Standard"
  },
  {
    id: 4,
    name: "Enterprise Palet",
    stockRemaining: 18,
    totalStock: 200,
    currentStock: 36,
    category: "Enterprise"
  },
  {
    id: 5,
    name: "Deluxe Palet",
    stockRemaining: 67,
    totalStock: 600,
    currentStock: 402,
    category: "Deluxe"
  }
];

export const DonalChart: React.FC = () => {
  const chartRef = useRef<ChartJS<'doughnut'>>(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const currentProduct = productStockData[currentProductIndex];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentProductIndex((prevIndex) => 
          (prevIndex + 1) % productStockData.length
        );
        setIsTransitioning(false);
      }, 500); // Transition duration
    }, 15000); // 15 seconds per product

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: ['Stock Remaining', 'Stock Used'],
    datasets: [
      {
        data: [currentProduct.stockRemaining, 100 - currentProduct.stockRemaining],
        backgroundColor: [
          currentProduct.stockRemaining > 50 ? '#28a745' : currentProduct.stockRemaining > 25 ? '#ffc107' : '#dc3545',
          '#e9ecef'
        ],
        borderColor: [
          currentProduct.stockRemaining > 50 ? '#28a745' : currentProduct.stockRemaining > 25 ? '#ffc107' : '#dc3545',
          '#dee2e6'
        ],
        borderWidth: 2,
        cutout: '70%',
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
      mode: 'nearest' as const,
    },
  };

  return (
    <div className="donut-chart-container">
      <div className="chart-header">
        <h4 className="chart-title">Stock Status</h4>
        <div className="product-info">
          <h5 className="product-name">{currentProduct.name}</h5>
          <p className="product-category">{currentProduct.category}</p>
        </div>
        <div className="stock-info">
          <span className="stock-percentage">{currentProduct.stockRemaining}%</span>
          <span className="stock-label">Remaining</span>
        </div>
      </div>
      
      <div className="chart-wrapper">
        <Doughnut ref={chartRef} data={data} options={options} />
        
        <div className="chart-center">
          <div className="center-content">
            <span className="center-percentage">{currentProduct.stockRemaining}%</span>
            <span className="center-label">Stock</span>
          </div>
        </div>
      </div>
      
      <div className="chart-footer">
        <div className="stock-details">
          <div className="detail-item">
            <span className="detail-label">Current:</span>
            <span className="detail-value">{currentProduct.currentStock}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Total:</span>
            <span className="detail-value">{currentProduct.totalStock}</span>
          </div>
        </div>
        
        <div className="product-indicator">
          {productStockData.map((_, index) => (
            <div 
              key={index} 
              className={`indicator-dot ${index === currentProductIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};