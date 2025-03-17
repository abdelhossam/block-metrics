"use client";

import { useEffect, useState } from "react";
import { ParticlesBackground } from "@/components/particles-background";
import { getChart1, getChart2AndChart3 } from "@/lib/blockchain";
import { Header } from "@/components/header";
import { Body } from "@/components/body";
import { Footer } from "@/components/footer";

interface ChartData {
  x: number;
  y: number;
}

interface Chart3Data extends ChartData {
  baseFeeGwei: number;
  baseFeeIncrease: boolean;
  gasUsageIncrease: boolean;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [chart1Data, setChart1Data] = useState<ChartData[]>([]);
  const [chart2Data, setChart2Data] = useState<ChartData[]>([]);
  const [chart3Data, setChart3Data] = useState<Chart3Data[]>([]);
  const [nextUpdate, setNextUpdate] = useState(12);

  async function fetchData() {
    try {
      setRefreshing(true);
      const [chart1Result, otherCharts] = await Promise.all([
        getChart1(),
        getChart2AndChart3(),
      ]);

      // Ensure we have valid data before updating state
      if (Array.isArray(chart1Result)) {
        setChart1Data(chart1Result);
      }
      
      if (otherCharts && otherCharts.chart2 && otherCharts.chart3) {
        setChart2Data(otherCharts.chart2);
        setChart3Data(otherCharts.chart3);
      }

      setNextUpdate(12);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Set empty arrays as fallback
      setChart1Data([]);
      setChart2Data([]);
      setChart3Data([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLastUpdate(new Date());
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 12000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNextUpdate((prev) => (prev > 0 ? prev - 1 : 12));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <ParticlesBackground />
      <div className="flex-1 flex flex-col">
        <Header
          nextUpdate={nextUpdate}
          isMounted={isMounted}
          onRefresh={fetchData}
          refreshing={refreshing}
        />
        <main className="flex-1 relative z-10">
          <div className="mx-auto max-w-6xl p-6">
            <Body
              chart1Data={chart1Data}
              chart2Data={chart2Data}
              chart3Data={chart3Data}
              loading={loading}
            />
          </div>
        </main>
      </div>
      <div className="sticky bottom-0 z-10">
        <Footer />
      </div>
    </div>
  );
}