import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  z: number;
  ox: number; // Original coordinates for morph animations
  oy: number;
  oz: number;
}

export default function ScrollInteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollYRef = useRef(0);
  const scrollSpeedRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point[] = [];
    const numLatitudes = 24;
    const numLongitudes = 24;
    const radius = 90;

    const resizeCanvas = () => {
      // Set fixed size for the portal
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    // Generate vertices for a 3D sphere that can be morphed
    const initPoints = () => {
      points = [];
      for (let i = 0; i < numLatitudes; i++) {
        const lat = (Math.PI * i) / (numLatitudes - 1) - Math.PI / 2;
        for (let j = 0; j < numLongitudes; j++) {
          const lon = (2 * Math.PI * j) / numLongitudes;

          // Spherical to Cartesian coordinate mapping
          const x = radius * Math.cos(lat) * Math.cos(lon);
          const y = radius * Math.sin(lat);
          const z = radius * Math.cos(lat) * Math.sin(lon);

          points.push({ x, y, z, ox: x, oy: y, oz: z });
        }
      }
    };

    resizeCanvas();
    initPoints();

    // Resize listener
    window.addEventListener('resize', resizeCanvas);

    // Dynamic scroll tracking with speed coefficients
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
      const currentScroll = window.scrollY;
      const diff = Math.abs(currentScroll - lastScrollYRef.current);
      
      // Calculate scroll velocity
      scrollSpeedRef.current += (diff - scrollSpeedRef.current) * 0.15;
      lastScrollYRef.current = currentScroll;
    };

    // Mouse movement inside the portal to warp the shape
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let angleX = 0;
    let angleY = 0;

    // Animation Render Loop
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      ctx.clearRect(0, 0, rect.width, rect.height);

      // Decelerate scroll speed impact gradually (fluid friction)
      scrollSpeedRef.current *= 0.95;

      // Update interactive mouse coordinates with elastic inertia
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Scroll influences: rotate coordinates and morph points
      const scrollRatio = scrollYRef.current / (document.documentElement.scrollHeight - window.innerHeight || 1);
      const speedModifier = 0.005 + (scrollSpeedRef.current * 0.004);

      angleX += speedModifier;
      angleY += speedModifier * 0.7;

      // Interactive focal length (3D perspective)
      const focalLength = 300;

      // Map transformed 3D projection to 2D Screen
      const projected: { x: number; y: number; depth: number }[] = [];

      points.forEach((p) => {
        // Rotations
        let x1 = p.ox;
        let y1 = p.oy;
        let z1 = p.oz;

        // Dynamic Wave Distortion based on scroll position + speed + mouse coordinates
        const distanceToCenter = Math.hypot(x1, y1, z1);
        const waveOffset = Math.sin(distanceToCenter * 0.05 - angleX * 5) * (10 + scrollSpeedRef.current * 0.8);
        
        // Morph sphere to wavy torus shape using scroll position
        const morphFactor = scrollRatio * 1.5;
        x1 += Math.cos(angleY + p.oy * 0.02) * waveOffset * morphFactor;
        y1 += Math.sin(angleX + p.ox * 0.02) * waveOffset * morphFactor;
        z1 += Math.cos(angleX + p.oz * 0.02) * waveOffset;

        // Apply cursor warping gravity force
        const dx = x1 - mouse.x;
        const dy = y1 - mouse.y;
        const distToCursor = Math.hypot(dx, dy);
        if (distToCursor < 120) {
          const force = (120 - distToCursor) / 120;
          x1 += (dx / distToCursor) * force * 25;
          y1 += (dy / distToCursor) * force * 25;
        }

        // Rotate on Y axis
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        let xRotation = x1 * cosY - z1 * sinY;
        let zRotation = x1 * sinY + z1 * cosY;

        // Rotate on X axis
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        let yRotation = y1 * cosX - zRotation * sinX;
        zRotation = y1 * sinX + zRotation * cosX;

        // 3D Perspective Projection
        const depth = zRotation + 300; // Shift z offset to be in front of camera
        const scale = focalLength / depth;
        const projX = xRotation * scale + cx;
        const projY = yRotation * scale + cy;

        projected.push({ x: projX, y: projY, depth });
      });

      // Render connected dynamic contour vector lines
      for (let i = 0; i < numLatitudes; i++) {
        for (let j = 0; j < numLongitudes; j++) {
          const p1Idx = i * numLongitudes + j;
          const p2Idx = i * numLongitudes + ((j + 1) % numLongitudes); // connect to neighbor horizontally
          const p3Idx = ((i + 1) % numLatitudes) * numLongitudes + j; // connect vertically

          const p1 = projected[p1Idx];
          const p2 = projected[p2Idx];
          const p3 = projected[p3Idx];

          // Dynamic styling based on scroll speed (shift from cool cyan to fiery brand orange)
          const scrollSpeedValue = Math.min(scrollSpeedRef.current, 50);
          const r = Math.floor(10 + (scrollSpeedValue / 50) * 222); // red shifts up
          const g = Math.floor(229 - (scrollSpeedValue / 50) * 162); // green shifts down
          const b = Math.floor(255 - (scrollSpeedValue / 50) * 238); // blue shifts down

          const alpha = Math.max(0.04, Math.min(0.25, 100 / p1.depth)); // depth-based opacity

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.lineWidth = 0.5 + (scrollSpeedRef.current * 0.05);

          // Horizontal grid vector
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

          // Vertical grid vector
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.stroke();
        }
      }

      // Draw subtle core glowing center orbital sphere
      const gradient = ctx.createRadialGradient(cx, cy, 5, cx, cy, radius * 1.5);
      gradient.addColorStop(0, 'rgba(232, 67, 17, 0.12)'); // Peach neon glow center
      gradient.addColorStop(0.5, 'rgba(0, 229, 255, 0.04)'); // Cyan blend
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <canvas 
        ref={canvasRef} 
        className="w-72 h-72 md:w-[440px] md:h-[440px] max-w-full aspect-square filter drop-shadow-[0_0_50px_rgba(232,67,17,0.15)] transition-all duration-300"
      />
    </div>
  );
}
