"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function FloatingElement({ position, rotation, scale, color, geometryType }: any) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.001;
            meshRef.current.rotation.y += 0.002;
        }
    });

    let Geometry: any = 'icosahedronGeometry';
    let args: any[] = [1, 0];

    switch (geometryType) {
        case 'cube':
            Geometry = 'boxGeometry';
            args = [1.5, 1.5, 1.5];
            break;
        case 'sphere':
            Geometry = 'sphereGeometry';
            args = [1, 32, 32];
            break;
        case 'torus':
            Geometry = 'torusGeometry';
            args = [1, 0.3, 16, 100];
            break;
        case 'octahedron':
            Geometry = 'octahedronGeometry';
            args = [1.2, 0];
            break;
    }

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
            <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
                {/* @ts-ignore */}
                <Geometry args={args} />
                {/* @ts-ignore */}
                <Geometry args={args} />
                <meshPhysicalMaterial
                    color={color}
                    metalness={0.9}
                    roughness={0.1}
                    transparent
                    opacity={0.6}
                    clearcoat={1.0}
                    clearcoatRoughness={0.1}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </Float>
    );
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <Suspense fallback={null}>
                    <FloatingElement
                        position={[-4, 2, -5]}
                        rotation={[0, 0, 0]}
                        scale={1.2}
                        color="#333333" // Dark Gray
                        geometryType="torus"
                    />
                    <FloatingElement
                        position={[4, -2, -3]}
                        rotation={[0.5, 0.5, 0]}
                        scale={1.5}
                        color="#666666" // Mid Gray
                        geometryType="octahedron"
                    />
                    <FloatingElement
                        position={[3, 3, -6]}
                        rotation={[0, 0.2, 0]}
                        scale={1}
                        color="#888888" // Light Gray
                        geometryType="sphere"
                    />
                    <FloatingElement
                        position={[-3, -3, -4]}
                        rotation={[0.2, 0, 0.2]}
                        scale={1.3}
                        color="#444444" // Charcoal
                        geometryType="cube"
                    />
                    <FloatingElement
                        position={[0, 0, -8]}
                        rotation={[0.1, 0.1, 0.1]}
                        scale={2}
                        color="#222222" // Almost Black
                        geometryType="icosahedron"
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
