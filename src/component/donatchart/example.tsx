import React from 'react';
import { DonalChart } from './Donalchart';

// Example usage of the DonalChart component
export const DonutChartExample = () => {
  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '20px' }}>
      {/* The DonalChart component now manages its own data internally */}
      {/* It cycles through 5 different products every 15 seconds */}
      <DonalChart />
      
      {/* You can add multiple instances if needed */}
      <DonalChart />
      
      {/* Each instance will show different products automatically */}
      <DonalChart />
    </div>
  );
};
