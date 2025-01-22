import React, { useEffect, useState } from 'react';

const BarcodeLogs = () => {
  interface Barcode {
    barcode_data: string;
    timestamp: string;
  }

  const [barcodes, setBarcodes] = useState<Barcode[]>([]);

  useEffect(() => {
    // Fetch barcodes from the JSON file
    const fetchBarcodes = async () => {
      try {
        const response = await fetch('/barcodes.json'); // Path to the JSON file in the public folder
        if (response.ok) {
          const data = await response.json();
          setBarcodes(data);
        } else {
          console.error('Failed to fetch barcodes:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching barcodes:', error);
      }
    };

    fetchBarcodes();

    // Refresh barcodes every 5 seconds
    const interval = setInterval(fetchBarcodes, 5000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="h-full">
      <h2 className="text-sm font-bold mb-2 text-center">Logs</h2>
      <div className="space-y-1 overflow-y-auto h-[calc(100%-2rem)]">
        {barcodes.length > 0 ? (
          barcodes.map((barcode, i) => (
            <div
              key={i}
              className="bg-gray-300 dark:bg-gray-800 p-2 rounded-sm text-xs"
            >
              <div className="flex justify-between items-center">
                <span>Barcode #{barcode.barcode_data}</span>
                <span className="text-white dark:text-gray-400">
                  {barcode.timestamp}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No barcodes found</p>
        )}
      </div>
    </div>
  );
};

export default BarcodeLogs;
