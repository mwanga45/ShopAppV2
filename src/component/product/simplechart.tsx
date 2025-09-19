import  { useState, useEffect } from "react";
import "./simple.css";

// Sample product data - you can replace with real data
const productData = [
  {
    id: 1,
    name: "Palet Starter",
    price: 29.99,
    monthlyRevenue: [1200, 1500, 1800, 2100, 2400, 2800, 3200, 3600, 4000, 4500, 5000, 5500],
    performance: 85,
    category: "Whole Performance"
  },
  {
    id: 2,
    name: "Premium Palet",
    price: 49.99,
    monthlyRevenue: [800, 1000, 1200, 1500, 1800, 2200, 2600, 3000, 3400, 3800, 4200, 4600],
    performance: 92,
    category: "Premium Tier"
  },
  {
    id: 3,
    name: "Basic Palet",
    price: 19.99,
    monthlyRevenue: [600, 750, 900, 1100, 1300, 1600, 1900, 2200, 2500, 2800, 3100, 3400],
    performance: 78,
    category: "Basic Tier"
  },
  {
    id: 4,
    name: "Enterprise Palet",
    price: 99.99,
    monthlyRevenue: [2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500],
    performance: 95,
    category: "Enterprise"
  }
];

export const SimpleChart = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentProductIndex((prevIndex) => 
          (prevIndex + 1) % productData.length
        );
        setIsTransitioning(false);
      }, 500); // Transition duration
    }, 10000); // 10 seconds per product

    return () => clearInterval(interval);
  }, []);

  const currentProduct = productData[currentProductIndex];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="chart-container">
      <div className={`simplechart-title ${isTransitioning ? 'slide-out' : ''}`}>
        <div className="product-header">
          <h2 className="product-name">{currentProduct.name}</h2>
          <p className="product-category">{currentProduct.category}</p>
        </div>
        
        <div className="product-stats">
          <div className="stat-item">
            <span className="stat-label">Price:</span>
            <span className="stat-value">${currentProduct.price}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Performance:</span>
            <span className="stat-value">{currentProduct.performance}%</span>
          </div>
        </div>

        <div className="chart-section">
          <h3>Monthly Revenue</h3>
          <div className="bar-chart">
            {currentProduct.monthlyRevenue.map((revenue, index) => (
              <div key={index} className="bar-container">
                <div 
                  className="bar" 
                  style={{ 
                    height: `${(revenue / Math.max(...currentProduct.monthlyRevenue)) * 180}px`,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <span className="bar-value">${revenue}</span>
                </div>
                <span className="bar-label">{months[index]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="slide-indicator">
          {productData.map((_, index) => (
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