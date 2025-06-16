// src/components/MetricCard.tsx
import React from 'react';
import type { MetricCard as MetricCardType } from '../types';

const MetricCard: React.FC<MetricCardType> = ({ title, value, subtext, icon }) => {
  return (
    // Replaced 'metric-card' with Tailwind classes for background, padding, rounded corners, and shadow
    <div className="bg-white p-4 rounded-xl shadow-sm">
      {/* Replaced 'metric-header' with Tailwind flex, justify-between, and margin-bottom */}
      <div className="flex justify-between items-center mb-2">
        {/* Converted h3 to Tailwind text size, weight, and color */}
        <h3 className="text-base font-medium text-gray-600">{title}</h3>
        {/* Converted 'metric-icon' span to Tailwind text size and color */}
        {icon && <span className="text-xl text-gray-500">{icon}</span>}
      </div>
      {/* 'metric-content' container (no specific styling needed here, its children are styled directly) */}
      <div>
        {/* Converted 'metric-value' h2 to Tailwind font size and weight */}
        <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
        {/* Converted 'metric-subtext' p to Tailwind text size and color */}
        {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
      </div>
    </div>
  );
};

export default MetricCard;
