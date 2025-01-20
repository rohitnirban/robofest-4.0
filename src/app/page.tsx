'use client'

import BarcodeLogs from "@/components/barcode-logs";
import CommandLine from "@/components/command-line";
import { CpuMemoryChart } from "@/components/cpu-memory-chart"
import { LoginsChart } from "@/components/login-chart"
import PathVisualization from "@/components/path-visualization";
import ThemeToggle from "@/components/theme-toggle";
import VideoFeed from "@/components/video-feed"
import dynamic from "next/dynamic";

const GyroscopeModel = dynamic(() => import("@/components/gyroscope-model"), { ssr: false });

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white select-none">
      <div className="fixed bottom-2 right-2 z-10 p-1 bg-gray-100 dark:bg-gray-900">
      <ThemeToggle/>
      </div>
      <div className="flex gap-1 p-1">
        <div className="flex-1">
          <div className="grid gap-1 grid-cols-2 mb-1">
            <div className="bg-gray-100 dark:bg-gray-900 p-2 rounded text-center">
              <h2 className="text-sm font-bold mb-1">Chart 1</h2>
              <CpuMemoryChart />
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 p-2 rounded text-center">
              <h2 className="text-sm font-bold mb-1">Chart 2</h2>
              <LoginsChart />
            </div>
          </div>
          <div className="grid gap-1 grid-cols-2">
            <div className="bg-gray-100 dark:bg-gray-900 p-2 rounded text-center">
              <h2 className="text-sm font-bold mb-1">Video Feed</h2>
              <VideoFeed />
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 p-2 rounded text-center">
              <h2 className="text-sm font-bold mb-1">3D Model</h2>
              <div className="mx-auto">
                <GyroscopeModel />
              </div>
            </div>
          </div>
        </div>
        <div className="w-64 flex flex-col gap-1">
          <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-2 rounded">
            <PathVisualization />
          </div>
          <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-2 rounded">
            <BarcodeLogs />
          </div>
        </div>
      </div>
      <div className="min-h-32 p-1">
        <CommandLine />
      </div>
    </div>
  );
}