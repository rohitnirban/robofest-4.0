"use client";

import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as cocoSSD from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-webgl";
import { renderPredictions } from "@/utils/render-predictions";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

let detectInterval: NodeJS.Timeout;

const VideoFeed = () => {
  const [isLoading, setIsLoading] = useState(true);

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  async function runCoco() {
    setIsLoading(true); // Set loading state to true when model loading starts
    const net = await cocoSSD.load();
    setIsLoading(false); // Set loading state to false when model loading completes

    detectInterval = setInterval(() => {
      runObjectDetection(net); // will build this next
    }, 10);
  }

  async function runObjectDetection(net: cocoSSD.ObjectDetection) {
    if (
      canvasRef.current &&
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // find detected objects
      const detectedObjects = await net.detect(
        webcamRef.current.video,
        undefined,
        0.6
      );

      const context = canvasRef.current.getContext("2d");
      if (context) {
        renderPredictions(detectedObjects, context);
      }
    }
  }

  useEffect(() => {
    runCoco();
    return () => clearInterval(detectInterval); // Clear interval on component unmount
  }, []);

  return (
    <>
    <Dialog>
     <DialogTrigger>
      <div
        className="relative aspect-video rounded-lg overflow-hidden bg-black max-h-[350px] mx-auto w-[100%]"
      >
        {isLoading ? (
          <div className="gradient-text">Loading AI Model...</div>
        ) : (
          <div className="relative flex justify-center items-center rounded-md">
            {/* webcam */}
            <Webcam
              ref={webcamRef}
              className="rounded-md object-cover"
              muted
              videoConstraints={{
                facingMode: "user",
              }}
            />
            {/* canvas */}
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 z-99999 w-full h-full"
            />
          </div>
        )}
      </div>
      </DialogTrigger>
      <DialogContent className="h-[50vh] w-[50vw] p-0 m-0">
        <div className="relative w-full"></div>
          {isLoading ? (
            <div className="gradient-text">Loading AI Model...</div>
          ) : (
            <div className="relative w-full">
              {/* webcam */}
              <Webcam
                ref={webcamRef}
                className="w-full h-full object-cover"
                muted
                videoConstraints={{
                  facingMode: "user",
                }}
              />
              {/* canvas */}
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoFeed;
