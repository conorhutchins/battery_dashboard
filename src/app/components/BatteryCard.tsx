'use client';

import React, { useState } from 'react';
import { useBattery } from '../_hooks/useBattery';
import { formatLastUpdatedTime } from '../utils/batteryUtils';
import BatteryChart from './BatteryChart';

const BatteryCard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { 
    battery, 
    isLoading, 
    error, 
    isBatteryLow,
    getChargeColorClass,
    getChargingStatusText,
    getChargingStatusColorClass 
  } = useBattery();

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  if (isLoading) {
    return (
      <div className="rounded-lg shadow-lg p-6 bg-white max-w-md mx-auto animate-pulse">
        <div className="h-6 bg-slate-200 rounded mb-4"></div>
        <div className="h-24 bg-slate-200 rounded mb-4"></div>
        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-slate-200 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg shadow-lg p-6 bg-white max-w-md mx-auto border-l-4 border-red-500">
        <h2 className="text-xl font-bold mb-4">Battery Information</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto transition-all duration-300 ease-in-out">
      <div 
        className={`rounded-lg shadow-lg p-6 bg-white transition-all duration-300 ease-in-out cursor-pointer ${isExpanded ? 'rounded-b-none shadow-md' : ''}`}
        onClick={handleCardClick}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{battery.name}</h2>
          <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getChargingStatusColorClass()}`}>
            {getChargingStatusText()}
          </span>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Capacity</span>
            <span className="font-medium">{battery.capacity} mAh</span>
          </div>
          
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Charge Level</span>
            <span className={`font-medium ${isBatteryLow() ? 'text-red-500' : ''}`}>
              {battery.chargeLevel}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${getChargeColorClass()}`}
              style={{ width: `${battery.chargeLevel}%` }}
            ></div>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-right">
          Last updated: {formatLastUpdatedTime(battery.lastUpdated)}
        </div>
      </div>
      
      {/* Render the chart component in a separate container if expanded */}
      {isExpanded && (
        <div className="bg-white rounded-b-lg shadow-lg p-6 border-t border-gray-100">
          <BatteryChart isVisible={isExpanded} />
        </div>
      )}
    </div>
  );
};

export default BatteryCard;
