import { renderHook, act } from '@testing-library/react';
import { useBatteryData } from './useBatteryData';
import { getMockBatteryData } from '@/app/data/batteryData';

// Mock the dependencies
jest.mock('@/app/data/batteryData', () => ({
  getMockBatteryData: jest.fn(),
}));

describe('useBatteryData', () => {
  // Setup mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    
    // Mock the getMockBatteryData function
    (getMockBatteryData as jest.Mock).mockReturnValue({
      capacity: 5000,
      level: 0.75,
      charging: true,
      supported: false,
      isSimulated: true,
    });
    
    // Mock the navigator.getBattery API
    Object.defineProperty(window.navigator, 'getBattery', {
      value: jest.fn(),
      configurable: true,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should return mock data when Battery API is not supported', () => {
    // Remove getBattery from navigator to replicate unsupported browser
    Object.defineProperty(window.navigator, 'getBattery', {
      value: undefined,
      configurable: true,
    });

    const { result } = renderHook(() => useBatteryData());
    
    // Run any pending timers
    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.supported).toBe(false);
    expect(result.current.isSimulated).toBe(true);
    expect(result.current.error).toBe('Error accessing battery information');
  });

  test('should return real battery data when Battery API is supported', async () => {
    // Quick mock of successful battery API response
    const mockBattery = {
      charging: false,
      level: 0.45,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    
    (window.navigator.getBattery as jest.Mock).mockResolvedValue(mockBattery);

    const { result } = renderHook(() => useBatteryData());
    
    // Initially it should use mock data
    expect(result.current.isSimulated).toBe(true);
    
    // Run any pending promises and timers
    await act(async () => {
      await Promise.resolve();
      jest.runAllTimers();
    });
    
    // After the API call, it should use real data
    expect(result.current.supported).toBe(true);
    expect(result.current.isSimulated).toBe(false);
    expect(result.current.charging).toBe(false);
    expect(result.current.level).toBe(0.45);
    expect(result.current.capacity).toBe(5000); 
  });

  test('should handle errors from Battery API', async () => {
    // Mock failed battery API
    (window.navigator.getBattery as jest.Mock).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useBatteryData());
    
    expect(result.current.isSimulated).toBe(true);
    
    // Run any pending promises and timers
    await act(async () => {
      await Promise.resolve();
      jest.runAllTimers();
    });
    
    // After the API error, it should still use mock data with error flag
    expect(result.current.supported).toBe(false);
    expect(result.current.isSimulated).toBe(true);
    expect(result.current.error).toBe('Error accessing battery information');
  });
}); 