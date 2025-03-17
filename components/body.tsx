"use client";

import { ChartCard } from "@/components/chart-card";
import { Activity, BarChart3, LineChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

interface BodyProps {
  chart1Data: any[];
  chart2Data: any[];
  chart3Data: any[];
  loading: boolean;
}

export function Body({ chart1Data, chart2Data, chart3Data, loading }: BodyProps) {
  return (
    <Tabs defaultValue="volume" className="space-y-8">
      <div className="flex justify-center">
        <TabsList className="max-w-xl">
          <TabsTrigger value="volume" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            USDT Volume
          </TabsTrigger>
          <TabsTrigger value="base-fee" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Base Fee
          </TabsTrigger>
          <TabsTrigger value="gas-usage" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Gas Usage
          </TabsTrigger>
        </TabsList>
      </div>

      <AnimatePresence mode="wait">
        {/* Volume Tab */}
        <TabsContent key="volume-tab" value="volume" asChild>
          <motion.div
            key="volume-motion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ChartCard
              title="USDT Transfer Volume"
              subtitle="Total USDT transferred per block"
              type="bar"
              data={chart1Data}
              loading={loading}
              height={400}
              lines={[
                {
                  key: "y",
                  color: "#26A17B",
                  name: "Volume (USDT)",
                },
              ]}
            />
          </motion.div>
        </TabsContent>

        {/* Base Fee Tab */}
        <TabsContent key="base-fee-tab" value="base-fee" asChild>
          <motion.div
            key="base-fee-motion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ChartCard
              title="Base Fee per Block"
              subtitle="Gas price in Gwei"
              type="line"
              data={chart2Data}
              loading={loading}
              height={400}
              lines={[
                {
                  key: "y",
                  color: "#627EEA",
                  name: "Base Fee (Gwei)",
                },
              ]}
            />
          </motion.div>
        </TabsContent>

        {/* Gas Usage Tab */}
        <TabsContent key="gas-usage-tab" value="gas-usage" asChild>
          <motion.div
            key="gas-usage-motion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ChartCard
              title="Gas Usage"
              subtitle="Block utilization percentage"
              type="mixed"
              data={chart3Data}
              loading={loading}
              height={400}
              lines={[
                {
                  key: "y",
                  color: "#22c55e",
                  name: "Gas Usage (%)",
                  chartType: "line"
                }
              ]}
            />
          </motion.div>
        </TabsContent>
      </AnimatePresence>
    </Tabs>
  );
}