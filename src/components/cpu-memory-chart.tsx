"use client"

import { useState, useEffect } from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const initialData = [
  { time: "18:20", cpu: 4, memory: 2 },
  { time: "18:30", cpu: 6, memory: 8 },
  { time: "18:40", cpu: 5, memory: 3 },
  { time: "18:50", cpu: 3, memory: 1 },
  { time: "19:00", cpu: 6.1, memory: 2 },
  { time: "19:10", cpu: 2, memory: 1 },
]

export function CpuMemoryChart() {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newTime = new Date().toLocaleTimeString().slice(0, 5)
        const newCpu =  Math.floor(Math.random() * 5 - 2)
        const newMemory =  Math.floor(Math.random() * 5 - 2)
        const newData = [...prevData, { time: newTime, cpu: newCpu, memory: newMemory }]
        return newData.slice(-10) // Keep only the last 10 data points
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    // <Card>
    //   <CardHeader>
    //     <CardTitle>Chart 1</CardTitle>
    //   </CardHeader>
    //   <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#888" />
            <YAxis
              stroke="#888"
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="cpu"
              stroke="#ff4444"
              name="CPU"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="memory"
              stroke="#2196f3"
              name="Memory"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
    //   </CardContent>
    // </Card>
  )
}
