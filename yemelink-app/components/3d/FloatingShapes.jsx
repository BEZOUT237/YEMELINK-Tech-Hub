import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, shape = 'sphere', color = '#00bcd4' }) {
  const meshRef = useRef();
  const speedRef = useRef(Math.random() * 0.01 + 0.005);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speedRef.current;
      meshRef.current.rotation.y += speedRef.current * 0.5;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speedRef.current * 50) * 0.001;
    }
  });

  const ShapeComponent = shape === 'box' ? Box : shape === 'torus' ? Torus : Sphere;
  const shapeProps = shape === 'torus' ? { args: [0.5, 0.2, 16, 32] } : { args: [0.5, 32, 32] };

  return (
    <ShapeComponent ref={meshRef} position={position} {...shapeProps}>
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.2}
        wireframe
      />
    </ShapeComponent>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <FloatingShape position={[-2, 0, -3]} shape="sphere" color="#00bcd4" />
      <FloatingShape position={[3, -1, -4]} shape="box" color="#3b82f6" />
      <FloatingShape position={[0, 2, -5]} shape="torus" color="#8b5cf6" />
      <FloatingShape position={[-3, -2, -3]} shape="sphere" color="#06b6d4" />
    </>
  );
}

export default function FloatingShapes({ className = '' }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
}