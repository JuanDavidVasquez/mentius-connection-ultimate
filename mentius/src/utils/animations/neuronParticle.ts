export default class NeuronParticles {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private particlesArray: Particle[] = [];
    private numberOfParticles: number;
    private maxDistance: number;
  
    constructor(canvas: HTMLCanvasElement, numberOfParticles = 100, maxDistance = 100) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d")!;
      this.numberOfParticles = numberOfParticles;
      this.maxDistance = maxDistance;
  
      this.resizeCanvas();
      window.addEventListener("resize", () => this.resizeCanvas());
      this.initParticles();
      this.animate();
    }
  
    // Función para ajustar el tamaño del canvas al tamaño de la ventana
    private resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  
    // Inicializa las partículas
    private initParticles() {
      this.particlesArray = [];
      for (let i = 0; i < this.numberOfParticles; i++) {
        const radius = Math.random() * 3 + 1;
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;
        const dx = (Math.random() - 0.5) * 2;
        const dy = (Math.random() - 0.5) * 2;
  
        this.particlesArray.push(new Particle(x, y, dx, dy, radius));
      }
    }
  
    // Función para dibujar las conexiones entre partículas
    private connectParticles() {
      for (let i = 0; i < this.particlesArray.length; i++) {
        for (let j = i + 1; j < this.particlesArray.length; j++) {
          const dx = this.particlesArray[i].x - this.particlesArray[j].x;
          const dy = this.particlesArray[i].y - this.particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          if (distance < this.maxDistance) {
            const opacity = 1 - distance / this.maxDistance;
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`; // Conexión de color blanco
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(this.particlesArray[i].x, this.particlesArray[i].y);
            this.ctx.lineTo(this.particlesArray[j].x, this.particlesArray[j].y);
            this.ctx.stroke();
          }
        }
      }
    }
  
    // Función para actualizar y dibujar las partículas
    private animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let particle of this.particlesArray) {
        particle.update(this.canvas);
        particle.draw(this.ctx);
      }
      this.connectParticles();
      requestAnimationFrame(() => this.animate());
    }
  }
  
  // Clase para definir cada partícula
  class Particle {
    public x: number;
    public y: number;
    private dx: number;
    private dy: number;
    private radius: number;
  
    constructor(x: number, y: number, dx: number, dy: number, radius: number) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
    }
  
    // Dibujar la partícula
    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; // Color blanco con opacidad
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
    }
  
    // Actualizar la posición de la partícula y rebotar en los bordes
    update(canvas: HTMLCanvasElement) {
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;
    }
  }
  