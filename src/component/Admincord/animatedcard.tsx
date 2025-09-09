// AnimatedCard.tsx

import React, { useEffect, useMemo, useState } from "react";
import './AnimatedCard.css';

export interface AnimatedCardProps {
  /** A React component (like an icon from react-icons) */
  icon: React.ElementType;
  /** Small descriptive details under the money value */
  details: string;
  /** Money value. Can be number or preformatted string */
  money: number | string;
  /** Optional currency symbol to display after the value (default: none) */
  currency?: string;
  /** Optional className to style from parent */
  className?: string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  icon: Icon,
  details,
  money,
  currency = '',
  className = ''
}) => {
  // Normalize numeric value if money is a number (for animation)
  const targetValue = useMemo(() => {
    return typeof money === 'number' ? money : Number(String(money).replace(/[^0-9.-]+/g, '')) || 0;
  }, [money]);

  const [displayValue, setDisplayValue] = useState<string>(() => {
    return typeof money === 'number' ? '0' : String(money);
  });

  useEffect(() => {
    // If money is numeric, animate from 0 -> targetValue
    if (typeof money === 'number') {
      let start: number | null = null;
      const duration = 900; // ms
      const startValue = 0;
      const endValue = targetValue;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = startValue + (endValue - startValue) * eased;
        setDisplayValue(Number(current.toFixed(0)).toLocaleString());
        if (progress < 1) requestAnimationFrame(step);
      };

      const raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    } else {
      // If it's not numeric, show as-is
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
          <span className="money-value">{displayValue}</span>
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

