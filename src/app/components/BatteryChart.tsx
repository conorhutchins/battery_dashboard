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
    <div className="mt-6 pt-6 border-t border-border transition-all duration-500 ease-in-out">
      <h3 className="text-lg font-semibold mb-4 text-card-foreground">Battery History (Last 24h)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12, fill: 'var(--card-foreground)' }} 
              interval="preserveStartEnd"
              stroke="var(--border)"
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fontSize: 12, fill: 'var(--card-foreground)' }}
              stroke="var(--border)"
              label={{ 
                value: 'Charge %', 
                angle: -90, 
                position: 'insideLeft', 
                style: { textAnchor: 'middle', fill: 'var(--card-foreground)' } 
              }}
            />
            <Tooltip 
              formatter={(value, name) => [
                name === 'level' ? `${value}%` : value, 
                name === 'level' ? 'Charge Level' : 'Status'
              ]}
              labelFormatter={(label) => `Time: ${label}`}
              contentStyle={{ 
                backgroundColor: 'var(--card)', 
                color: 'var(--card-foreground)',
                border: '1px solid var(--border)' 
              }}
            />
            <Legend 
              wrapperStyle={{ color: 'var(--card-foreground)' }}
            />
            <Line 
              type="monotone" 
              dataKey="level" 
              stroke="var(--primary)" 
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4, fill: 'var(--card)', stroke: 'var(--primary)' }}
              activeDot={{ r: 6, fill: 'var(--card)', stroke: 'var(--primary)', strokeWidth: 2 }}
              name="Charge Level"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BatteryChart; 