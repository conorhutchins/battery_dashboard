export const isBatteryLow = (chargeLevel: number): boolean => 
  chargeLevel <= 20;

export const getChargeColorClass = (chargeLevel: number): string => {
  if (chargeLevel <= 20) return 'bg-red-500';
  if (chargeLevel <= 50) return 'bg-yellow-500';
  return 'bg-green-500';
};

export const getChargingStatusText = (isCharging: boolean): string => 
  isCharging ? 'Charging' : 'Not Charging';

export const getChargingStatusColorClass = (isCharging: boolean): string => 
  isCharging ? 'bg-blue-500' : 'bg-gray-400';

export const formatLastUpdatedTime = (date?: Date): string => {
  return date
    ? new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(date)
    : 'Unknown';
}; 