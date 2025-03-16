import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '../components/ThemeProvider';
import '@testing-library/jest-dom';

// Mock matchMedia for tests
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return <ThemeProvider>{children}</ThemeProvider>;
  };

  return render(ui, { wrapper: AllProviders, ...options });
};

export const mockBatteryAPI = (charging = true, level = 0.75) => {
  jest.useFakeTimers();
  
  const mockGetBattery = jest.fn();
  const eventListeners: Record<string, Array<() => void>> = {
    chargingchange: [],
    levelchange: []
  };

  const batteryManager = {
    level,
    charging,
    addEventListener: jest.fn((event: string, handler: () => void) => {
      if (!eventListeners[event]) {
        eventListeners[event] = [];
      }
      eventListeners[event].push(handler);
    }),
    removeEventListener: jest.fn((event: string, handler: () => void) => {
      if (eventListeners[event]) {
        const index = eventListeners[event].indexOf(handler);
        if (index > -1) {
          eventListeners[event].splice(index, 1);
        }
      }
    }),
    _triggerEvent: (event: 'chargingchange' | 'levelchange') => {
      if (eventListeners[event]) {
        eventListeners[event].forEach(handler => handler());
      }
    },
    _updateLevel: (newLevel: number) => {
      batteryManager.level = newLevel;
      batteryManager._triggerEvent('levelchange');
    },
    _updateCharging: (newCharging: boolean) => {
      batteryManager.charging = newCharging;
      batteryManager._triggerEvent('chargingchange');
    }
  };

  mockGetBattery.mockResolvedValue(batteryManager);
  
  Object.defineProperty(global.navigator, 'getBattery', {
    value: mockGetBattery,
    configurable: true
  });

  return {
    mockGetBattery,
    batteryManager
  };
};

export * from '@testing-library/react';
export { customRender as render };