import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './simpledonutchart.css'; // Import the new CSS file

ChartJS.register(ArcElement, Tooltip, Legend);

interface SimpleDonutChartProps {
  percentage: number;
}

export const SimpleDonutChart: React.FC<SimpleDonutChartProps> = ({ percentage }) => {
  const data = {
    labels: ['Remaining', 'Used'],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [
          percentage > 50 ? '#28a745' : percentage > 25 ? '#ffc107' : '#dc3545',
          '#e9ecef',
        ],
        borderColor: [
          percentage > 50 ? '#28a745' : percentage > 25 ? '#ffc107' : '#dc3545',
          '#dee2e6',
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
        enabled: false,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  return (
    <div className="simple-donut-chart-container">
      <Doughnut data={data} options={options} />
      <div className="simple-donut-chart-percentage">
        {percentage}%
      </div>
    </div>
  );
};
