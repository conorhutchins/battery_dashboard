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