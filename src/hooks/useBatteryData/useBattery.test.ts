import { renderHook, act } from '@testing-library/react';
import { useBattery } from './useBattery';
import { mockBattery } from '@/data/batteryMockData';

jest.useFakeTimers();

const mockGetBattery = jest.fn();
Object.defineProperty(global.navigator, 'getBattery', {
  value: mockGetBattery,
  configurable: true
});

describe('useBattery Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockGetBattery.mockResolvedValue({
      level: 0.75,
      charging: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    });
  });

  test('initialises with mock data and updates with real data', async () => {
    let hookResult: { current: ReturnType<typeof useBattery> };
    
    await act(async () => {
      const { result } = renderHook(() => useBattery());
      hookResult = result;
    });
    
    // Skip initial state check as it's immediately updated with the mock API values
    
    // Check the battery data has been updated with the mock API values
    expect(hookResult!.current.battery.chargeLevel).toBe(75);
    expect(hookResult!.current.battery.isCharging).toBe(true);
    expect(hookResult!.current.isLoading).toBe(false);
    
    // Check preserved fields
    expect(hookResult!.current.battery.id).toBe(mockBattery.id);
    expect(hookResult!.current.battery.name).toBe(mockBattery.name);
    expect(hookResult!.current.battery.capacity).toBe(mockBattery.capacity);
  });

  test('handles getBattery API not being available', async () => {
    Object.defineProperty(global.navigator, 'getBattery', {
      value: undefined,
      configurable: true
    });
    
    let hookResult: { current: ReturnType<typeof useBattery> };
    
    await act(async () => {
      const { result } = renderHook(() => useBattery());
      hookResult = result;
    });
    
    expect(hookResult!.current.error).toBe('Battery API not supported. Using mock data.');
    expect(hookResult!.current.isLoading).toBe(false);
    expect(hookResult!.current.battery.id).toBe(mockBattery.id);
  });

  test('handles errors when accessing battery API', async () => {
    mockGetBattery.mockRejectedValue(new Error('Battery API error'));
    
    let hookResult: { current: ReturnType<typeof useBattery> };
    
    await act(async () => {
      const { result } = renderHook(() => useBattery());
      hookResult = result;
    });
    
    expect(hookResult!.current.error).toBe('Battery API not supported. Using mock data.');
    expect(hookResult!.current.isLoading).toBe(false);
  });
});