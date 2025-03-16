export const isBatteryLow = (chargeLevel: number): boolean => 
  chargeLevel <= 20;

export const getChargeColorClass = (chargeLevel: number): string => {
  if (chargeLevel <= 20) return 'bg-danger';
  if (chargeLevel <= 50) return 'bg-warning';
  return 'bg-success';
};

export const getChargingStatusText = (isCharging: boolean): string => 
  isCharging ? 'Charging' : 'Not Charging';

export const getChargingStatusColorClass = (isCharging: boolean): string => 
  isCharging ? 'bg-primary' : 'bg-muted-foreground';

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