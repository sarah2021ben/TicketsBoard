"use client";
import { Card } from "@radix-ui/themes";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import React from "react";
interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const TicketsChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { name: "Open", value: open },
    { name: "In Progress", value: inProgress },
    { name: "Closed", value: closed },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            style={{ fill: "var(--accent-6)" }}
            barSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TicketsChart;
