export interface BatteryData {
    capacity: number;
    level: number;
    charging: boolean;
    supported: boolean;
    isSimulated: boolean;
    error?: string;
  }

  declare global {
    interface Navigator {
        getBattery?: () => Promise<{
          charging: boolean;
          chargingTime: number;
          dischargingTime: number;
          level: number;
          addEventListener: (event: string, handler: () => void) => void;
          removeEventListener: (event: string, handler: () => void) => void;
        }>;
      } 
  }
  export interface BatteryCardProps {
    id: string;
    name: string;
    capacity: number;
    chargeLevel: number; 
    isCharging: boolean;
    lastUpdated?: Date;
    onCardClick?: (id: string) => void;
  }