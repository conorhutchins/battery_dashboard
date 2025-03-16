import { 
  isBatteryLow, 
  getChargeColorClass, 
  getChargingStatusText, 
  getChargingStatusColorClass,
  formatLastUpdatedTime 
} from './batteryUtils';

describe('Battery Utilities', () => {
  describe('isBatteryLow', () => {
    test('returns true when charge level is 20% or below', () => {
      expect(isBatteryLow(20)).toBe(true);
      expect(isBatteryLow(15)).toBe(true);
      expect(isBatteryLow(5)).toBe(true);
      expect(isBatteryLow(0)).toBe(true);
    });

    test('returns false when charge level is above 20%', () => {
      expect(isBatteryLow(21)).toBe(false);
      expect(isBatteryLow(50)).toBe(false);
      expect(isBatteryLow(100)).toBe(false);
    });
  });

  describe('getChargeColorClass', () => {
    test('returns danger class for low battery', () => {
      expect(getChargeColorClass(20)).toBe('bg-danger');
      expect(getChargeColorClass(10)).toBe('bg-danger');
      expect(getChargeColorClass(0)).toBe('bg-danger');
    });

    test('returns warning class for medium battery', () => {
      expect(getChargeColorClass(21)).toBe('bg-warning');
      expect(getChargeColorClass(35)).toBe('bg-warning');
      expect(getChargeColorClass(50)).toBe('bg-warning');
    });

    test('returns success class for high battery', () => {
      expect(getChargeColorClass(51)).toBe('bg-success');
      expect(getChargeColorClass(75)).toBe('bg-success');
      expect(getChargeColorClass(100)).toBe('bg-success');
    });
  });

  describe('getChargingStatusText', () => {
    test('returns "Charging" when charging', () => {
      expect(getChargingStatusText(true)).toBe('Charging');
    });

    test('returns "Not Charging" when not charging', () => {
      expect(getChargingStatusText(false)).toBe('Not Charging');
    });
  });

  describe('getChargingStatusColorClass', () => {
    test('returns primary class when charging', () => {
      expect(getChargingStatusColorClass(true)).toBe('bg-primary');
    });

    test('returns muted class when not charging', () => {
      expect(getChargingStatusColorClass(false)).toBe('bg-muted-foreground');
    });
  });

  describe('formatLastUpdatedTime', () => {
    test('formats date correctly', () => {
      const testDate = new Date('2025-03-15T14:30:00');
      const formatted = formatLastUpdatedTime(testDate);
      
      expect(formatted).toMatch(/15\/03\/2025/);
      expect(formatted).toMatch(/14:30/);
    });

    test('returns "Unknown" for undefined date', () => {
      expect(formatLastUpdatedTime(undefined)).toBe('Unknown');
    });
  });
});