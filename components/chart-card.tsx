"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  type: "line" | "area" | "bar" | "mixed";
  data: any[];
  loading?: boolean;
  height?: number;
  lines?: {
    key: string;
    color: string;
    name: string;
    chartType?: "line" | "bar";
  }[];
}

const CustomTooltip = ({ active, payload, label, type }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  
  const tooltipContent = () => {
    switch (type) {
      case "bar":
        return (
          <>
            <p className="text-sm font-medium">Block {label}</p>
            <p className="text-sm">
              USDT Volume: <span className="font-medium text-[#26A17B]">{data.y.toLocaleString()} USDT</span>
            </p>
          </>
        );
      case "line":
        return (
          <>
            <p className="text-sm font-medium">Block {label}</p>
            <p className="text-sm">
              Base Fee: <span className="font-medium text-[#4B5563]">{data.y} Gwei</span>
            </p>
          </>
        );
      case "mixed":
        return (
          <>
            <p className="text-sm font-medium">Block {label}</p>
            <p className="text-sm">
              Gas Usage: <span style={{ color: data.gasUsageIncrease ? '#22c55e' : '#ef4444' }}>{data.y}%</span>
            </p>
            <p className="text-sm">
              Base Fee: <span style={{ color: data.baseFeeIncrease ? '#22c55e' : '#ef4444' }}>{data.baseFeeGwei} Gwei</span>
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg">
      {tooltipContent()}
    </div>
  );
};

export function ChartCard({
  title,
  subtitle,
  icon,
  type,
  data,
  loading = false,
  height = 350,
}: ChartCardProps) {
  if (loading) {
    return (
      <Card className="backdrop-blur-sm bg-card/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {icon}
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Skeleton className="h-[350px] w-full" />
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  const renderChart = () => {
    switch (type) {
      case "mixed":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 70, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted/30" />
              <XAxis
                dataKey="x"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{
                  value: "Block Number",
                  position: "bottom",
                  offset: 40,
                  fontSize: 12,
                  fill: "hsl(var(--muted-foreground))"
                }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{
                  value: "Gas Usage (%)",
                  angle: -90,
                  position: "left",
                  offset: 50,
                  fontSize: 12,
                  fill: "hsl(var(--muted-foreground))"
                }}
              />
              <Tooltip content={(props) => <CustomTooltip {...props} type={type} />} />
              <Line
                type="linear"
                dataKey="y"
                stroke="#4B5563"
                strokeWidth={2}
                dot={{ stroke: '#4B5563', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 70, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted/30" />
              <XAxis
                dataKey="x"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{
                  value: "Block Number",
                  position: "bottom",
                  offset: 40,
                  fontSize: 12,
                  fill: "hsl(var(--muted-foreground))"
                }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{
                  value: "Gas Price (Gwei)",
                  angle: -90,
                  position: "left",
                  offset: 50,
                  fontSize: 12,
                  fill: "hsl(var(--muted-foreground))"
                }}
              />
              <Tooltip content={(props) => <CustomTooltip {...props} type={type} />} />
              <Line
                type="linear"
                dataKey="y"
                stroke="#4B5563"
                strokeWidth={2}
                dot={{ stroke: '#4B5563', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 70, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted/30" />
              <XAxis
                dataKey="x"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{
                  value: "Block Number",
                  position: "bottom",
                  offset: 40,
                  fontSize: 12,
                  fill: "hsl(var(--muted-foreground))"
                }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{
                  value: "USDT Volume",
                  angle: -90,
                  position: "left",
                  offset: 50,
                  fontSize: 12,
                  fill: "hsl(var(--muted-foreground))"
                }}
              />
              <Tooltip content={(props) => <CustomTooltip {...props} type={type} />} />
              <Bar dataKey="y" fill="#26A17B" radius={[4, 4, 0, 0]} barSize={30} />
            </ComposedChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="backdrop-blur-sm bg-card/50 hover:bg-card/60 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          {(type === "bar" || type === "line" || type === "mixed") && (
            <div className="w-8 h-8 relative">
              <Image
                src={type === "bar" 
                  ? "https://cryptologos.cc/logos/tether-usdt-logo.png"
                  : "https://cryptologos.cc/logos/ethereum-eth-logo.png"
                }
                alt={type === "bar" ? "USDT Logo" : "ETH Logo"}
                width={32}
                height={32}
              />
            </div>
          )}
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium leading-none">{title}</CardTitle>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={loading ? 'loading' : 'chart'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {renderChart()}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}