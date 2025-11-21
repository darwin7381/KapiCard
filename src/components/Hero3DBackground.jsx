import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function SpinningBox() {
    const meshRef = useRef();
    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta;
        meshRef.current.rotation.y += delta;
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
}

const Hero3DBackground = () => {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <SpinningBox />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/50 to-background pointer-events-none" />
        </div>
    );
};

export default Hero3DBackground;
