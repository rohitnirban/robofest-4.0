'use client'

import { CpuMemoryChart } from "@/components/cpu-memory-chart"
import { LoginsChart } from "@/components/login-chart"
import { VideoFeed } from "@/components/video-feed"
import dynamic from "next/dynamic";

const GyroscopeModel = dynamic(() => import("@/components/gyroscope-model"), { ssr: false });

const PathVisualization = () => {
  return (
    <div className="h-full">
      <h2 className="text-sm font-bold mb-2 text-center">Path</h2>
      <div className="relative w-full h-[calc(100%-2rem)] bg-gray-800/50 rounded">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          style={{ transform: 'scale(0.9)' }}
        >
          {/* Polygon path */}
          <polygon
            points="50,120 80,40 150,60 130,140"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />

          {/* Points with labels */}
          <g className="text-xs">
            {/* Point A */}
            <circle cx="50" cy="120" r="3" fill="white" />
            <text x="40" y="135" fill="white" fontSize="12">A</text>

            {/* Point B */}
            <circle cx="80" cy="40" r="3" fill="white" />
            <text x="85" y="35" fill="white" fontSize="12">B</text>

            {/* Point C */}
            <circle cx="150" cy="60" r="3" fill="white" />
            <text x="155" y="55" fill="white" fontSize="12">C</text>

            {/* Point D */}
            <circle cx="130" cy="140" r="3" fill="white" />
            <text x="135" y="155" fill="white" fontSize="12">D</text>
          </g>

          {/* Scale indicator */}
          {/* Scale bar with measurements */}
          <g transform="translate(20, 215)">
            {/* Main scale bar */}
            <rect x="0" y="0" width="100" height="3" fill="white" />

            {/* Left section (darker) */}
            <rect x="0" y="0" width="50" height="3" fill="white" />

            {/* Vertical end lines */}
            <line x1="0" y1="-4" x2="0" y2="7" stroke="white" strokeWidth="2" />
            <line x1="50" y1="-4" x2="50" y2="7" stroke="white" strokeWidth="2" />
            <line x1="100" y1="-4" x2="100" y2="7" stroke="white" strokeWidth="2" />

            {/* Distance labels */}
            <text x="0" y="20" fill="white" fontSize="10" textAnchor="start">0</text>
            <text x="50" y="20" fill="white" fontSize="10" textAnchor="middle">50m</text>
            <text x="100" y="20" fill="white" fontSize="10" textAnchor="end">100m</text>
            <text x="0" y="-10" fill="white" fontSize="12">Scale</text>
          </g>
        </svg>
      </div>
    </div>
  );
};

const LogsPanel = () => {
  return (
    <div className="h-full">
      <h2 className="text-sm font-bold mb-2 text-center">Logs</h2>
      <div className="space-y-1 overflow-y-auto h-[calc(100%-2rem)]">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-gray-800 p-2 rounded-sm text-xs">
            <div className="flex justify-between items-center">
              <span>Barcode #{123456 + i}</span>
              <span className="text-gray-400">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex gap-1 p-1">
        <div className="flex-1">
          <div className="grid gap-1 grid-cols-2 mb-1">
            <div className="bg-gray-900 p-2 rounded text-center">
              <h2 className="text-sm font-bold mb-1">Chart 1</h2>
              <CpuMemoryChart />
            </div>
            <div className="bg-gray-900 p-2 rounded text-center">
              <h2 className="text-sm font-bold mb-1">Chart 2</h2>
              <LoginsChart />
            </div>
          </div>
          <div className="grid gap-1 grid-cols-2">
            <div className="bg-gray-900 p-2 rounded text-center">
              <h2 className="text-sm font-bold mb-1">Video Feed</h2>
              <VideoFeed />
            </div>
            <div className="bg-gray-900 p-2 rounded text-center">
              <h2 className="text-sm font-bold mb-1">3D Model</h2>
              <div className="mx-auto">
              <GyroscopeModel />
              </div>
            </div>
          </div>
        </div>
        <div className="w-64 flex flex-col gap-1">
          <div className="flex-1 bg-gray-900 p-2 rounded">
            <PathVisualization />
          </div>
          <div className="flex-1 bg-gray-900 p-2 rounded">
            <LogsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}