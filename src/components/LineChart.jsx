import React from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const LineChart = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={chartData}>
        <defs>
          <linearGradient id="updateGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="alertGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#374151" opacity={0.2} />
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          stroke="#6B7280"
          fontSize={12}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          stroke="#6B7280"
          fontSize={12}
          domain={[0, 120]}
          ticks={[30, 45, 60, 75, 90, 105, 120]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
          }}
        />
        <Area
          type="monotone"
          dataKey="updates"
          stroke="#10B981"
          fill="url(#updateGradient)"
          strokeWidth={2}
          dot={false}
          name="Updates"
        />
        <Area
          type="monotone"
          dataKey="alerts"
          stroke="#3B82F6"
          fill="url(#alertGradient)"
          strokeWidth={2}
          dot={false}
          name="Alerts"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
