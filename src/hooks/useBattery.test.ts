import { renderHook, act } from '@testing-library/react';
import { useBattery } from './useBattery';
import { mockBattery } from '@/app/data/batteryMockData';

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
    const { result } = renderHook(() => useBattery());
    
    // Check initial state
    expect(result.current.battery).toEqual(mockBattery);
    expect(result.current.isLoading).toBe(true);
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Check updated state
    expect(result.current.isLoading).toBe(false);
    
    // Check updated fields
    expect(result.current.battery.chargeLevel).toBe(75);
    expect(result.current.battery.isCharging).toBe(true);
    expect(result.current.battery.lastUpdated).not.toBe(mockBattery.lastUpdated);
    
    // Check preserved fields
    expect(result.current.battery.id).toBe(mockBattery.id);
    expect(result.current.battery.name).toBe(mockBattery.name);
    expect(result.current.battery.capacity).toBe(mockBattery.capacity);
  });

  test('handles getBattery API not being available', async () => {
    Object.defineProperty(global.navigator, 'getBattery', {
      value: undefined,
      configurable: true
    });
    
    const { result } = renderHook(() => useBattery());
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.error).toBe('Battery API not supported. Using mock data.');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.battery).toEqual(mockBattery);
  });

  test('handles errors when accessing battery API', async () => {
    mockGetBattery.mockRejectedValue(new Error('Battery API error'));
    
    const { result } = renderHook(() => useBattery());
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.error).toBe('Battery API not supported. Using mock data.');
    expect(result.current.isLoading).toBe(false);
  });
  
});