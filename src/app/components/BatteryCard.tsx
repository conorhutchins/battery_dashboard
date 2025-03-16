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
      <div className="rounded-lg shadow-lg p-6 bg-card max-w-md mx-auto border border-border">
        <div className="flex justify-between items-center mb-4">
          <div className="h-7 bg-muted rounded w-40 animate-pulse"></div>
          <div className="h-6 w-24 bg-muted rounded-full animate-pulse"></div>
        </div>
        <div className="mb-6 space-y-4">
          <div className="flex justify-between mb-2">
            <div className="h-4 bg-muted rounded w-24 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-16 animate-pulse"></div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="h-4 bg-muted rounded w-28 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-10 animate-pulse"></div>
          </div>
          <div className="w-full bg-muted rounded-full h-3 shadow-inner overflow-hidden animate-pulse"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-muted rounded w-40 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-32 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg shadow-lg p-6 bg-card max-w-md mx-auto border border-border border-l-4 border-l-danger">
        <div className="flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-danger">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h2 className="text-xl font-bold text-card-foreground">Battery Information</h2>
        </div>
        <p className="text-danger p-2 bg-danger/10 rounded">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto transition-all duration-300 ease-in-out">
      <div 
        className={`rounded-lg shadow-md p-6 bg-card text-card-foreground transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl hover:translate-y-[-2px] border border-border ${isExpanded ? 'rounded-b-none border-b-0' : ''}`}
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
            <span className="text-muted-foreground">Capacity</span>
            <span className="font-medium">{battery.capacity} mAh</span>
          </div>
          
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Charge Level</span>
            <span className={`font-medium ${isBatteryLow() ? 'text-danger' : ''}`}>
              {battery.chargeLevel}%
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-3 shadow-inner overflow-hidden">
            <div 
              className={`h-full rounded-full ${getChargeColorClass()} transition-all duration-500 ease-out`}
              style={{ width: `${battery.chargeLevel}%` }}
            >
              {battery.isCharging && (
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-70"></div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs text-primary flex items-center">
            {isExpanded ? (
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
                Click to hide history
              </span>
            ) : (
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
                Click to view charge history
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            Last updated: {formatLastUpdatedTime(battery.lastUpdated)}
          </div>
        </div>
      </div>
      
      {/* Render the chart component in a separate container if expanded */}
      <div 
        className={`bg-card rounded-b-lg shadow-md p-6 border border-t-0 border-border overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 p-0'
        }`}
        aria-hidden={!isExpanded}
        aria-expanded={isExpanded}
      >
        <BatteryChart isVisible={isExpanded} />
      </div>
    </div>
  );
};

export default BatteryCard;
