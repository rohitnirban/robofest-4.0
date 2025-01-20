"use client"

import { useState, useEffect } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const initialData = [
  { time: "19:00", logins: 10, loginsPrevHour: 20 },
  { time: "19:05", logins: 25, loginsPrevHour: 35 },
  { time: "19:10", logins: 30, loginsPrevHour: 45 },
  { time: "19:15", logins: 25, loginsPrevHour: 40 },
]

function generateRandomData(prevData: typeof initialData) {
  return prevData.map((entry) => ({
    ...entry,
    logins: entry.logins + Math.floor(Math.random() * 5 - 2), // small fluctuation
  }))
}

export function LoginsChart() {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => generateRandomData(prevData))
    }, 5000) // update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    // <Card>
    //   <CardHeader className="flex flex-row items-center justify-between">
    //     <CardTitle>Pressure Sensor</CardTitle>
    //   </CardHeader>
    //   <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="logins"
              stroke="#2196f3"
              fill="#2196f3"
              fillOpacity={0.3}
              name="Logins"
            />
          </AreaChart>
        </ResponsiveContainer>
    //   </CardContent>
    // </Card>
  )
}
