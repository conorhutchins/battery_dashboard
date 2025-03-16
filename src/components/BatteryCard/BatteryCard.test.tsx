import { render, screen, fireEvent, act } from '../../test-utils/test-utils';
import BatteryCard from './BatteryCard';
import { mockBattery } from '../../data/batteryMockData';
import { useBattery } from '../../hooks/useBattery';

jest.mock('../BatteryChart/BatteryChart', () => ({
  __esModule: true,
  default: ({ isVisible }: { isVisible: boolean }) => (
    isVisible ? <div data-testid="battery-chart">Chart Component</div> : null
  )
}));

jest.mock('../../hooks/useBattery', () => ({
  useBattery: jest.fn()
}));

describe('BatteryCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    (useBattery as jest.Mock).mockReturnValue({
      battery: mockBattery,
      isLoading: true,
      error: null,
      isBatteryLow: () => false,
      getChargeColorClass: () => 'bg-success',
      getChargingStatusText: () => 'Charging',
      getChargingStatusColorClass: () => 'bg-primary'
    });
    
    render(<BatteryCard />);
    
    // Check for loading skeleton elements instead of text
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  test('renders error state', () => {
    const errorMessage = 'Battery API not supported';
    (useBattery as jest.Mock).mockReturnValue({
      battery: mockBattery,
      isLoading: false,
      error: errorMessage,
      isBatteryLow: () => false,
      getChargeColorClass: () => 'bg-success',
      getChargingStatusText: () => 'Charging',
      getChargingStatusColorClass: () => 'bg-primary'
    });
    
    render(<BatteryCard />);
    
    expect(screen.getByText('Battery Information')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders normal state and toggles expanded view when clicked', () => {
    (useBattery as jest.Mock).mockReturnValue({
      battery: {
        ...mockBattery,
        chargeLevel: 75,
        isCharging: true
      },
      isLoading: false,
      error: null,
      batteryHistory: [],
      isBatteryLow: () => false,
      getChargeColorClass: () => 'bg-success',
      getChargingStatusText: () => 'Charging',
      getChargingStatusColorClass: () => 'bg-primary'
    });
    
    render(<BatteryCard />);
    
    expect(screen.getByText('Device Battery')).toBeInTheDocument();
    expect(screen.getByText('Capacity')).toBeInTheDocument();
    expect(screen.getByText('Charge Level')).toBeInTheDocument();
    expect(screen.getByText('5000 mAh')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('Charging')).toBeInTheDocument();
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
    expect(screen.getByText('Click to view charge history')).toBeInTheDocument();
    
    const card = screen.getByText('Device Battery').closest('div[class*="cursor-pointer"]');
    
    act(() => {
      fireEvent.click(card!);
    });
    
    expect(screen.getByText('Click to hide history')).toBeInTheDocument();
    expect(screen.getByTestId('battery-chart')).toBeInTheDocument();
    
    act(() => {
      fireEvent.click(card!);
    });
    
    expect(screen.getByText('Click to view charge history')).toBeInTheDocument();
  });

  test('shows status based on charge level', () => {
    (useBattery as jest.Mock).mockReturnValue({
      battery: {
        ...mockBattery,
        chargeLevel: 15,
        isCharging: false
      },
      isLoading: false,
      error: null,
      batteryHistory: [],
      isBatteryLow: () => true,
      getChargeColorClass: () => 'bg-danger',
      getChargingStatusText: () => 'Not Charging',
      getChargingStatusColorClass: () => 'bg-muted-foreground'
    });
    
    render(<BatteryCard />);
    
    expect(screen.getByText('15%')).toBeInTheDocument();
    expect(screen.getByText('Not Charging')).toBeInTheDocument();
  });
});