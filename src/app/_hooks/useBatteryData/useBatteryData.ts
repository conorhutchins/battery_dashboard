import { useState, useEffect } from 'react';
import { BatteryData } from '@/app/types';
import { getMockBatteryData } from '@/app/data/batteryData';

export function useBatteryData(): BatteryData {
  // start with mock data
  const [batteryData, setBatteryData] = useState<BatteryData>(getMockBatteryData());

  useEffect(() => {
    // check if the Battery API is supported
    if (!('getBattery' in navigator)) {
      setBatteryData(prev => ({
        ...prev,
        supported: false,
        isSimulated: true,
        error: 'Battery API is not supported in this browser'
      }));
      return;
    }

    // attempt to get Browser API data
    const getBatteryData = async () => {
      try {
        // @ts-expect-error - TypeScript doesn't have types for the Battery API
        const battery = await navigator.getBattery();
        
        // Only update if we successfully got battery data
        if (battery) {
          setBatteryData({
            capacity: 5000, // browser not giving capacity so create a fake one
            charging: battery.charging,
            level: battery.level,
            supported: true,
            isSimulated: false
          });
        }
      } catch {
        // use mock data if theres an error
        setBatteryData(prev => ({
          ...prev,
          supported: false,
          isSimulated: true,
          error: 'Error accessing battery information'
        }));
      }
    };
  
    getBatteryData();
  }, []);
  
  return batteryData;
}