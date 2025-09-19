import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { format } from 'date-fns';

interface ProgressData {
  date: string;
  progress: number;
  sessions: number;
  rating?: number;
}

interface ProgressChartProps {
  data: ProgressData[];
  type?: 'line' | 'area';
  height?: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ 
  data, 
  type = 'area', 
  height = 300 
}) => {
  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), 'MMM dd');
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{formatDate(label)}</p>
          <p className="text-green-600">
            Progress: {payload[0].value}%
          </p>
          {payload[1] && (
            <p className="text-blue-600">
              Sessions: {payload[1].value}
            </p>
          )}
          {payload[2] && (
            <p className="text-purple-600">
              Rating: {payload[2].value}/5
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (type === 'area') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke="#666"
            fontSize={12}
          />
          <YAxis 
            stroke="#666"
            fontSize={12}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="progress"
            stroke="#22c55e"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#progressGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="date" 
          tickFormatter={formatDate}
          stroke="#666"
          fontSize={12}
        />
        <YAxis 
          stroke="#666"
          fontSize={12}
          domain={[0, 100]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="progress"
          stroke="#22c55e"
          strokeWidth={3}
          dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="sessions"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
        />
        {data.some(d => d.rating) && (
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;