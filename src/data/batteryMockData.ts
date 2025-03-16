import { BatteryCardProps, BatteryHistoryEntry, BatteryData } from '../types';

// Generate 24 hours of battery history data
const generateBatteryHistory = (): BatteryHistoryEntry[] => {
  const now = new Date();
  const data: BatteryHistoryEntry[] = [];
  
  for (let i = 24; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = timestamp.getHours();
    
    let chargeLevel;
    
    if (hour >= 23 || hour < 7) {
      chargeLevel = Math.min(100, 50 + Math.floor(Math.random() * 50));
    } else if (hour >= 9 && hour <= 17) {
      chargeLevel = Math.max(20, 80 - Math.floor(Math.random() * 40));
    } else {
      chargeLevel = Math.max(30, 70 - Math.floor(Math.random() * 30));
    }
    
    data.push({
      timestamp,
      chargeLevel,
      isCharging: hour >= 22 || hour <= 6
    });
  }
  
  return data;
};

export const batteryHistoryData: BatteryHistoryEntry[] = generateBatteryHistory();

export const mockBattery: BatteryCardProps = {
  id: '1',
  name: 'Device Battery',
  capacity: 5000,        
  chargeLevel: 80,     
  isCharging: true,      
  lastUpdated: new Date()
}; 

export function getMockBatteryData(): BatteryData {
  return {
    capacity: 5000,
    level: 0.8, // 80%
    charging: true,
    supported: true,
    isSimulated: true
  };
} 