"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera, useGLTF, Html } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";

// Model component to load the 3D object (BNO085 model)
import { forwardRef } from "react";

const BNO085Model = forwardRef((props, ref) => {
  const gltf = useGLTF("/scene.glb"); // Load the GLB file from the public folder
  return <primitive object={gltf.scene} scale={[0.1, 0.1, 0.1]} ref={ref} />;
});

export default function GyroscopeModel() {
  const [gyroData, setGyroData] = useState<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });
  const modelRef = useRef<any>(null);

  useEffect(() => {
    // Function to fetch gyro data from the /gyro_data.json file
    const fetchGyroData = async () => {
      try {
        const response = await fetch("/gyro_data.json");
        if (response.ok) {
          const data = await response.json();
          setGyroData(data);
        } else {
          console.error("Failed to fetch gyro data");
        }
      } catch (error) {
        console.error("Error fetching gyro data:", error);
      }
    };

    // Update gyro data every 100ms
    const interval = setInterval(() => {
      fetchGyroData();
    }, 100);

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  useEffect(() => {
    if (modelRef.current) {
      // Rotate the model based on the fetched gyro data
      modelRef.current.rotation.set(
        (gyroData.x * Math.PI) / 180, // Convert degrees to radians
        (gyroData.y * Math.PI) / 180, // Convert degrees to radians
        (gyroData.z * Math.PI) / 180  // Convert degrees to radians
      );
    }
  }, [gyroData]);

  return (
    // <Card>
    //   <CardHeader>
    //     <CardTitle>BNO085 Gyroscope</CardTitle>
    //   </CardHeader>
    //   <CardContent>
        <div className="h-[350px] w-[100%] rounded-lg overflow-hidden bg-black/80 mx-auto">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, -50, 0]} rotation={[Math.PI, 0, 0]} />
            <OrbitControls />
            <Environment preset="studio" />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-5, -5, -5]} intensity={1} />
            <Suspense
              fallback={
                <Html center>
                  <div style={{ color: "white" }}>Loading...</div>
                </Html>
              }
            >
              <BNO085Model ref={modelRef} />
            </Suspense>
          </Canvas>
        </div>
    //   </CardContent>
    // </Card>
  );
}
