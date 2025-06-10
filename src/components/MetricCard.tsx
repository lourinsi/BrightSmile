import React from 'react';
import type { MetricCard as MetricCardType } from '../types';

const MetricCard: React.FC<MetricCardType> = ({ title, value, subtext, icon }) => {
  return (
    <div className="metric-card">
      <div className="metric-header">
        <h3>{title}</h3>
        {icon && <span className="metric-icon">{icon}</span>}
      </div>
      <div className="metric-content">
        <h2 className="metric-value">{value}</h2>
        {subtext && <p className="metric-subtext">{subtext}</p>}
      </div>
    </div>
  );
};

export default MetricCard;