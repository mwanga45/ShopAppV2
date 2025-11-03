// AnimatedCard.tsx

import React, { useEffect, useMemo, useState } from "react";
import './AnimatedCard.css';

export interface AnimatedCardProps {

  icon: React.ElementType;

  details: string;

  money: number | string | undefined;

  currency?: string;

  className?: string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  icon: Icon,
  details,
  money,
  currency = '',
  className = ''
}) => {

  const targetValue = useMemo(() => {
    return typeof money === 'number' ? money : Number(String(money).replace(/[^0-9.-]+/g, '')) || 0;
  }, [money]);

  const [displayValue, setDisplayValue] = useState<string>(() => {
    return typeof money === 'number' ? '0' : String(money);
  });

  useEffect(() => {

    if (typeof money === 'number') {
      let start: number | null = null;
      const duration = 900; 
      const startValue = 0;
      const endValue = targetValue;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
   
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = startValue + (endValue - startValue) * eased;
        setDisplayValue(Number(current.toFixed(0)).toLocaleString());
        if (progress < 1) requestAnimationFrame(step);
      };

      const raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    } else {
  
      setDisplayValue(String(money));
    }
  }, [money, targetValue]);

  return (
    <div className={`animated-card ${className}`} role="group" aria-label={details}>
      <div className="card-top">
        <div className="icon-wrapper" aria-hidden>
          <Icon className="card-icon" />
        </div>
      </div>

      <div className="card-body">
        <div className="money-row">
          <span className="money-value">{displayValue}.Tsh</span>
          {currency ? <span className="money-currency">{currency}</span> : null}
        </div>
        <div className="card-details">{details}</div>
      </div>
    </div>
  );
};

export default AnimatedCard;

/*
Usage example (copy into a parent component):

import { FaWallet } from 'react-icons/fa';
import AnimatedCard from './AnimatedCard';

<AnimatedCard
  icon={FaWallet}
  details="Net Worth"
  money={25300}
  currency="$"
/>

*/


// AnimatedCard.css

/* Basic reset for the card */

