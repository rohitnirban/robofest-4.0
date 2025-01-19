"use client"

import { useEffect, useRef } from "react"

export function VideoFeed() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const currentVideoRef = videoRef.current;
    if (currentVideoRef) {
      // In a real application, you would connect to your actual video stream
      // This is just a simulation for demonstration
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (currentVideoRef) {
            currentVideoRef.srcObject = stream
          }
        })
        .catch((err) => {
          console.log("Unable to access camera: ", err)
        })
    }

    return () => {
      if (currentVideoRef?.srcObject) {
        const tracks = (currentVideoRef.srcObject as MediaStream).getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [])

  return (
    // <Card>
    //   <CardHeader>
    //     <CardTitle>Live Feed</CardTitle>
    //   </CardHeader>
    //   <CardContent>
        <div className="relative aspect-video rounded-lg overflow-hidden bg-black max-h-[350px] mx-auto w-[100%]">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
    //   </CardContent>
    // </Card>
  )
}

