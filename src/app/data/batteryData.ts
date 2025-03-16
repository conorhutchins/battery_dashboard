import { BatteryData } from '@/app/types/index';

export const getMockBatteryData = (): BatteryData => ({
  capacity: 5000,
  level: 0.75,
  charging: true,
  supported: false,
  isSimulated: true,
  error: 'Using simulated battery data'
});