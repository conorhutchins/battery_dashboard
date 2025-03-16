import { render, screen } from '../../test-utils/test-utils';
import BatteryChart from './BatteryChart';
import { mockBatteryAPI } from '../../test-utils/test-utils';

// Create a mock for batteryHistoryData
const mockBatteryHistory = [
  { timestamp: new Date(), chargeLevel: 80, isCharging: true },
  { timestamp: new Date(Date.now() - 3600000), chargeLevel: 75, isCharging: true },
  { timestamp: new Date(Date.now() - 7200000), chargeLevel: 70, isCharging: false }
];

jest.mock('../../hooks/useBatteryData/useBattery', () => ({
  useBattery: () => ({
    batteryHistory: mockBatteryHistory
  })
}));

jest.mock('recharts', () => {
  return {
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    LineChart: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="line-chart">{children}</div>
    ),
    Line: () => <div data-testid="line" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Legend: () => <div data-testid="legend" />
  };
});

describe('BatteryChart', () => {
  beforeEach(() => {
    mockBatteryAPI();
  });

  test('renders nothing when not visible', () => {
    const { container } = render(<BatteryChart isVisible={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders chart when visible', () => {
    render(<BatteryChart isVisible={true} />);
    
    expect(screen.getByText('Battery History (Last 24h)')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    expect(screen.getByTestId('line')).toBeInTheDocument();
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
    expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('legend')).toBeInTheDocument();
  });
});