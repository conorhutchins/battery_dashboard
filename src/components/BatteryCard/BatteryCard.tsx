'use client';

import React, { useState } from 'react';
import { useBattery } from '../../hooks/useBattery';
import { formatLastUpdatedTime } from '../../utils/batteryUtils';
import BatteryChart from '../BatteryChart/BatteryChart';

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
      <div className="w-full max-w-md mx-auto animate-float" data-testid="loading-skeleton">
        <div className="rounded-lg shadow-md p-6 bg-card max-w-md mx-auto border border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" 
            style={{ backgroundSize: '200% 100%' }}></div>
            
          <div className="flex justify-between items-center mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-muted/50"></div>
              <div className="h-7 bg-muted/50 rounded w-40"></div>
            </div>
            <div className="h-6 w-24 bg-muted/50 rounded-full"></div>
          </div>
          
          <div className="mb-6 space-y-4 relative z-10">
            <div className="flex justify-between mb-2">
              <div className="h-4 bg-muted/50 rounded w-24"></div>
              <div className="h-4 bg-muted/50 rounded w-16"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 bg-muted/50 rounded w-28"></div>
              <div className="flex items-center">
                <div className="h-4 bg-muted/50 rounded w-10 mr-1"></div>
                <div className="h-5 w-5 bg-muted/50 rounded"></div>
              </div>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-3 shadow-inner overflow-hidden">
              <div className="w-4/5 h-full bg-muted/50 rounded-full"></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center relative z-10">
            <div className="h-4 bg-muted/50 rounded w-40"></div>
            <div className="h-4 bg-muted/50 rounded w-32"></div>
          </div>
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
    <div className="w-full max-w-md mx-auto transition-all duration-300 ease-in-out animate-float">
      <div 
        className={`rounded-lg shadow-md p-6 bg-card text-card-foreground transition-all duration-150 ease-out cursor-pointer hover:shadow-xl hover:translate-y-[-2px] active:scale-98 border border-border ${isExpanded ? 'rounded-b-none border-b-0' : ''}`}
        onClick={handleCardClick}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className={`relative ${getChargeColorClass()} rounded p-0.5`}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-white">
                <rect x="1" y="6" width="18" height="12" rx="2" />
                <line x1="23" y1="13" x2="23" y2="11" />
              </svg>
              {battery.isCharging && (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white animate-pulse"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              )}
            </div>
            <h2 className="text-xl font-bold">{battery.name}</h2>
          </div>
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
            <span className={`font-medium flex items-center gap-1 ${isBatteryLow() ? 'text-danger' : ''}`}>
              {battery.chargeLevel}%
              <svg 
                viewBox="0 0 24 24" 
                width="16" 
                height="16" 
                className={`inline-block ${getChargeColorClass()}`}
                style={{ transform: 'rotate(90deg)' }}
              >
                <rect
                  x="2"
                  y="4"
                  width="20"
                  height="16"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <rect
                  x="4"
                  y="6"
                  width={16 * battery.chargeLevel / 100}
                  height="12"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="23"
                  y="10"
                  width="2"
                  height="4"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-3 shadow-inner overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ease-out relative`}
              style={{ 
                width: `${battery.chargeLevel}%`,
                background: `linear-gradient(90deg, ${battery.chargeLevel < 20 ? 'var(--danger)' : battery.chargeLevel < 50 ? 'var(--warning)' : 'var(--success)'}, ${battery.chargeLevel < 20 ? 'var(--danger)' : battery.chargeLevel < 50 ? 'var(--warning)' : 'var(--primary)'})`
              }}
            >
              <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
                <div className="absolute top-0 right-0 bottom-0 left-0" 
                  style={{ 
                    backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.13) 50%, rgba(255,255,255,0) 100%)',
                    animation: battery.isCharging ? 'shimmer 2s infinite' : 'none'
                  }}>
                </div>
              </div>
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
        className={`glass bg-card/90 rounded-b-lg shadow-md border border-t-0 border-border overflow-hidden transition-all duration-300 ease-out ${
          isExpanded 
            ? 'max-h-[500px] opacity-100 p-6 transform-none' 
            : 'max-h-0 opacity-0 p-0 scale-98 -translate-y-4'
        }`}
        aria-hidden={!isExpanded}
        aria-expanded={isExpanded}
      >
        <div className={`transition-opacity duration-300 ease-out ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
          <BatteryChart isVisible={isExpanded} />
        </div>
      </div>
    </div>
  );
};

export default BatteryCard;