import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { UserActivity } from '../types/user';

interface UserActivityChartProps {
  data: UserActivity[];
  onMonthClick: (month: string) => void;
  selectedMonth?: string;
}

const UserActivityChart: React.FC<UserActivityChartProps> = ({ 
  data, 
  onMonthClick,
  selectedMonth 
}) => {
  const handleClick = (data: { activeLabel?: string }) => {
    if (data && data.activeLabel) {
      onMonthClick(data.activeLabel);
    }
  };

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number; dataKey: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold text-sm mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className={`text-sm ${
              entry.dataKey === 'activeUsers' ? 'text-green-600' : 'text-blue-600'
            }`}>
              {entry.dataKey === 'activeUsers' ? 'Active' : 'New'}: {entry.value} users
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">User Activity Trends</h3>
        <p className="text-sm text-gray-600">
          Click on a month to filter the user list
          {selectedMonth && (
            <span className="ml-2 text-blue-600 font-medium">
              (Showing: {selectedMonth})
            </span>
          )}
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={data} 
          onClick={handleClick}
          className="cursor-pointer"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
            iconType="rect"
          />
          <Bar 
            dataKey="activeUsers" 
            stackId="a"
            fill="#10b981" 
            name="Active Users"
            radius={[0, 0, 0, 0]}
            className="hover:opacity-80 transition-opacity"
          />
          <Bar 
            dataKey="newUsers" 
            stackId="a"
            fill="#3b82f6" 
            name="New Users"
            radius={[4, 4, 0, 0]}
            className="hover:opacity-80 transition-opacity"
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">
            {data[data.length - 1]?.activeUsers || 0}
          </p>
          <p className="text-sm text-gray-600">Current Active Users</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">
            {data[data.length - 1]?.newUsers || 0}
          </p>
          <p className="text-sm text-gray-600">New Users This Month</p>
        </div>
      </div>
    </div>
  );
};

export default UserActivityChart;