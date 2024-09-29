import { useEffect, useRef } from "react";
import MentiusParticles from './mentiusParticles'; 

export const MentiusAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            new MentiusParticles(canvasRef.current);
        }
    }, []);

    return (
        <div className="mentius-animation">
            <canvas ref={canvasRef} className="particleCanvas"></canvas>
        </div>
    );
};
