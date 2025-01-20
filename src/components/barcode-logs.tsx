import React from 'react'

const BarcodeLogs = () => {
  return (
    <div className="h-full">
      <h2 className="text-sm font-bold mb-2 text-center">Logs</h2>
      <div className="space-y-1 overflow-y-auto h-[calc(100%-2rem)]">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-gray-300 dark:bg-gray-800 p-2 rounded-sm text-xs">
            <div className="flex justify-between items-center">
              <span>Barcode #{123456 + i}</span>
              <span className="text-white dark:text-gray-400">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BarcodeLogs