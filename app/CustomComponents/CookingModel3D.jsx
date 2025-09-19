"use client"
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';

function CookingModel({ modelPath }) {
    const { scene } = useGLTF(modelPath);
    const modelRef = useRef();

    useFrame((state, delta) => {
        if (modelRef.current) {
            modelRef.current.rotation.y += delta * 0.5; // Rotate around Y axis
        }
    });

    return (
        <primitive 
            ref={modelRef} 
            object={scene} 
            scale={[2, 2, 2]} 
            position={[0, -1, 0]}
        />
    );
}

function Scene({ modelPath }) {
    return (
        <>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />
            <CookingModel modelPath={modelPath} />
            <Environment preset="sunset" />
        </>
    );
}

const CookingModel3D = ({ modelPath = "/three_d_models/3december_2021_day_9_cooking.glb" }) => {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                style={{ width: '100%', height: '100%' }}
            >
                <Scene modelPath={modelPath} />
                <OrbitControls 
                    enableZoom={false} 
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
};

export default CookingModel3D;
