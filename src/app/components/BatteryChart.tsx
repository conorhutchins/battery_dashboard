'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';
import { useBattery } from '../_hooks/useBattery';
import { BatteryChartProps, BatteryHistoryEntry } from '../types';

const BatteryChart: React.FC<BatteryChartProps> = ({ isVisible }) => {
  const { batteryHistory } = useBattery();
  
  if (!isVisible) return null;
  
  // Transform the data for the chart
  const chartData = batteryHistory.map((entry: BatteryHistoryEntry) => ({
    time: format(entry.timestamp, 'HH:mm'),
    level: entry.chargeLevel,
    charging: entry.isCharging ? 'Charging' : 'Not Charging'
  }));
  
  return (
    <div className="mt-6 pt-6 border-t border-gray-200 transition-all duration-500 ease-in-out">
      <h3 className="text-lg font-semibold mb-4">Battery History (Last 24h)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12 }} 
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fontSize: 12 }}
              label={{ value: 'Charge %', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
            />
            <Tooltip 
              formatter={(value, name) => [
                name === 'level' ? `${value}%` : value, 
                name === 'level' ? 'Charge Level' : 'Status'
              ]}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="level" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#1d4ed8', strokeWidth: 2 }}
              name="Charge Level"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BatteryChart; 