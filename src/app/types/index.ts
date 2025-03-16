export interface BatteryData {
    capacity: number;
    level: number;
    charging: boolean;
    supported: boolean;
    isSimulated: boolean;
    error?: string;
  }