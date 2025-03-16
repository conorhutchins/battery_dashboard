'use client';

import { useState, useEffect } from 'react';
import { mockBattery, batteryHistoryData } from '../data/batteryMockData';
import { BatteryCardProps } from '../types';
import { isBatteryLow, getChargeColorClass, getChargingStatusText, getChargingStatusColorClass } from '../utils/batteryUtils';

export const useBattery = () => {
  const [battery, setBattery] = useState<BatteryCardProps>(mockBattery);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch battery data on mount
  useEffect(() => {
    const fetchBatteryData = async () => {
      try {
        setIsLoading(true);
        
        // Check if the Battery API is available
        if (!navigator.getBattery) {
          setError('Battery API not supported. Using mock data.');
          setIsLoading(false);
          return;
        }

        const batteryManager = await navigator.getBattery();
        
        if (batteryManager) {
          // update certain fields of the mock
          setBattery(prev => ({
            ...prev,
            chargeLevel: Math.round(batteryManager.level * 100),
            isCharging: batteryManager.charging,
            lastUpdated: new Date()
          }));
          
          // Set up event listeners
          batteryManager.addEventListener('chargingchange', () => {
            setBattery(prev => ({
              ...prev,
              isCharging: batteryManager.charging,
              lastUpdated: new Date()
            }));
          });
          
          batteryManager.addEventListener('levelchange', () => {
            setBattery(prev => ({
              ...prev,
              chargeLevel: Math.round(batteryManager.level * 100),
              lastUpdated: new Date()
            }));
          });
        }
        
        setError(null);
      } catch (err) {
        console.error('Error accessing battery:', err);
        setError('Error accessing battery. Using mock data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBatteryData();
  }, []);

  return {
    battery,
    batteryHistory: batteryHistoryData,
    isLoading,
    error,
    isBatteryLow: () => isBatteryLow(battery.chargeLevel),
    getChargeColorClass: () => getChargeColorClass(battery.chargeLevel),
    getChargingStatusText: () => getChargingStatusText(battery.isCharging),
    getChargingStatusColorClass: () => getChargingStatusColorClass(battery.isCharging)
  };
}; 