import { BatteryCardProps } from '../types';

export const mockBattery: BatteryCardProps = {
  id: '1',
  name: 'Device Battery',
  capacity: 5000,        
  chargeLevel: 80,     
  isCharging: true,      
  lastUpdated: new Date()
}; 