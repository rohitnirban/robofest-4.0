import React from 'react'

const PathVisualization = () => {
    return (
        <div className="h-full">
            <h2 className="text-sm font-bold mb-2 text-center">Path</h2>
            <div className="relative w-full h-[calc(100%-2rem)] bg-gray-200/50 dark:bg-gray-800/50 rounded">
                <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full "
                    style={{ transform: 'scale(0.9)' }}
                >
                    {/* Polygon path */}
                    <polygon
                        points="50,120 80,40 150,60 130,140"
                        fill="none"
                        stroke="gray"
                        strokeWidth="2"
                    />

                    {/* Points with labels */}
                    <g className="text-xs">
                        {/* Point A */}
                        <circle cx="50" cy="120" r="3" className="fill-black dark:fill-white" />
                        <text x="40" y="135" className="fill-black dark:fill-white" fontSize="12">A</text>

                        {/* Point B */}
                        <circle cx="80" cy="40" r="3" className="fill-black dark:fill-white" />
                        <text x="85" y="35" className="fill-black dark:fill-white" fontSize="12">B</text>

                        {/* Point C */}
                        <circle cx="150" cy="60" r="3" className="fill-black dark:fill-white" />
                        <text x="155" y="55" className="fill-black dark:fill-white" fontSize="12">C</text>

                        {/* Point D */}
                        <circle cx="130" cy="140" r="3" className="fill-black dark:fill-white" />
                        <text x="135" y="155" className="fill-black dark:fill-white" fontSize="12">D</text>
                    </g>

                    {/* Scale indicator */}
                    {/* Scale bar with measurements */}
                    <g transform="translate(20, 215)">
                        {/* Main scale bar */}
                        <rect x="0" y="0" width="100" height="3" className="fill-black dark:fill-white" />

                        {/* Left section (darker) */}
                        <rect x="0" y="0" width="50" height="3" className="fill-black dark:fill-white" />

                        {/* Vertical end lines */}
                        <line x1="0" y1="-4" x2="0" y2="7" stroke="black dark:white" strokeWidth="2" />
                        <line x1="50" y1="-4" x2="50" y2="7" stroke="black dark:white" strokeWidth="2" />
                        <line x1="100" y1="-4" x2="100" y2="7" stroke="black dark:white" strokeWidth="2" />

                        {/* Distance labels */}
                        <text x="0" y="20" className="fill-black dark:fill-white" fontSize="10" textAnchor="start">0</text>
                        <text x="50" y="20" className="fill-black dark:fill-white" fontSize="10" textAnchor="middle">50m</text>
                        <text x="100" y="20" className="fill-black dark:fill-white" fontSize="10" textAnchor="end">100m</text>
                        <text x="0" y="-10" className="fill-black dark:fill-white" fontSize="12">Scale</text>
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default PathVisualization