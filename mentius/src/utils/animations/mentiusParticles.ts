// MentiusParticles.ts
export default class MentiusParticles {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private particles: Particle[];
    private connections: Connection[];
    private currentConnectionIndex: number; // Índice para la conexión actual

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.particles = [];
        this.connections = [];
        this.currentConnectionIndex = 0; // Inicializa el índice de conexión
        this.init();
        this.animate();
    }

    private init() {
        const word = "Mentius";
        const letters = word.split("");

        letters.forEach((letter, index) => {
            const x = (index + 1) * (this.canvas.width / (letters.length + 1));
            const y = this.canvas.height / 2;
            const particle = new Particle(x, y, letter);
            this.particles.push(particle);

            // Crear conexiones entre partículas
            if (index > 0) {
                this.connections.push(new Connection(this.particles[index - 1], particle));
            }
        });
    }

    private animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar conexiones
        this.connections.forEach((connection, index) => {
            const isActive = index === this.currentConnectionIndex; // Verifica si la conexión es la actual
            connection.draw(this.ctx, isActive);
        });

        // Dibujar partículas
        this.particles.forEach((particle) => {
            particle.draw(this.ctx);
        });

        // Actualiza el índice de la conexión actual
        if (this.currentConnectionIndex < this.connections.length - 1) {
            this.currentConnectionIndex++;
        } else {
            this.currentConnectionIndex = 0; // Reinicia cuando llega al final
        }
    }
}

class Particle {
    public x: number;
    public y: number;
    public letter: string;
    public radius: number;

    constructor(x: number, y: number, letter: string) {
        this.x = x;
        this.y = y;
        this.letter = letter;
        this.radius = 5; // Tamaño de la letra
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "#49ADBC"; // Color de las partículas
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillText(this.letter, this.x - this.radius / 2, this.y + this.radius / 2);
    }
}

class Connection {
    private particleA: Particle;
    private particleB: Particle;
    private pulse: number; // Controla la animación de pulso

    constructor(particleA: Particle, particleB: Particle) {
        this.particleA = particleA;
        this.particleB = particleB;
        this.pulse = 0; // Inicializa el pulso
    }

    public draw(ctx: CanvasRenderingContext2D, isActive: boolean) {
        // Calcula la distancia y el centro de la conexión
        const midX = (this.particleA.x + this.particleB.x) / 2;
        const midY = (this.particleA.y + this.particleB.y) / 2;

        // Cambia la opacidad y el tamaño de la línea cuando está activa
        const alpha = isActive ? Math.sin(this.pulse) * 0.5 + 0.5 : 0; // Cambia la opacidad
        const lineWidth = isActive ? 4 : 2; // Cambia el grosor de la línea cuando está activa

        ctx.strokeStyle = `rgba(73, 173, 188, ${alpha})`; // Color de la línea con opacidad
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(this.particleA.x, this.particleA.y);
        ctx.lineTo(this.particleB.x, this.particleB.y);
        ctx.stroke();

        if (isActive) {
            this.pulse += 0.2; // Aumenta el pulso para la animación
        }
    }
}
