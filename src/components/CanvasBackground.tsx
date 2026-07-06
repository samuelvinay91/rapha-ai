import { useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  ox: number; // Original positions
  oy: number;
  oz: number;
  color: string;
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef({ y: 0, speed: 0, targetY: 0, easeY: 0 });
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, vx: 0, vy: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point3D[] = [];
    const maxPoints = 320; // High-density grid for rich visual detail

    // Fluid blobs for backlighting
    const lightBlobs = [
      { x: 0, y: 0, tx: 0, ty: 0, radius: 450, color: 'rgba(232, 67, 17, 0.08)', speed: 0.004 }, // Brand orange/peach
      { x: 0, y: 0, tx: 0, ty: 0, radius: 550, color: 'rgba(0, 229, 255, 0.06)', speed: 0.002 },  // Brand cyan
      { x: 0, y: 0, tx: 0, ty: 0, radius: 650, color: 'rgba(139, 92, 246, 0.04)', speed: 0.003 },  // Royal violet
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Re-initialize blobs targets based on screen boundaries
      lightBlobs.forEach((blob) => {
        blob.x = Math.random() * canvas.width;
        blob.y = Math.random() * canvas.height;
        blob.tx = Math.random() * canvas.width;
        blob.ty = Math.random() * canvas.height;
      });
    };

    // Generate coordinate vertices
    const initGeometry = () => {
      points = [];
      for (let i = 0; i < maxPoints; i++) {
        // Generate uniform random spherical shells or parametric lines
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        
        // Sphere coordinate shell
        const r = 180 + Math.random() * 30;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        points.push({
          x, y, z,
          ox: x, oy: y, oz: z,
          color: i % 2 === 0 ? 'rgba(0, 229, 255, 0.2)' : 'rgba(232, 67, 17, 0.2)',
        });
      }
    };

    resizeCanvas();
    initGeometry();

    window.addEventListener('resize', resizeCanvas);

    // Scroll physics tracker
    const handleScroll = () => {
      scrollRef.current.targetY = window.scrollY;
    };

    // Mouse movement inside window
    let lastMouseX = -1000;
    let lastMouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      
      if (lastMouseX !== -1000) {
        mouseRef.current.vx = e.clientX - lastMouseX;
        mouseRef.current.vy = e.clientY - lastMouseY;
      }
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Dynamic rotation variables
    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const time = Date.now() * 0.001;

      // Dark background fill
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, w, h);

      // Smooth scroll interpolation & speed
      const scroll = scrollRef.current;
      const oldEaseY = scroll.easeY;
      scroll.easeY += (scroll.targetY - scroll.easeY) * 0.08;
      scroll.speed = Math.abs(scroll.easeY - oldEaseY);

      // Scroll progress percentage (0 to 1)
      const maxScrollHeight = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollProgress = Math.min(1, Math.max(0, scroll.easeY / maxScrollHeight));

      // Mouse position easing
      const mouse = mouseRef.current;
      if (mouse.targetX !== -1000) {
        if (mouse.x === -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.06;
          mouse.y += (mouse.targetY - mouse.y) * 0.06;
        }
      } else {
        mouse.x += (-1000 - mouse.x) * 0.06;
        mouse.y += (-1000 - mouse.y) * 0.06;
      }
      mouse.vx *= 0.92;
      mouse.vy *= 0.92;

      // 1. Draw glowing immersive radial light spots (WebGL metaball effect)
      lightBlobs.forEach((blob) => {
        blob.x += (blob.tx - blob.x) * blob.speed;
        blob.y += (blob.ty - blob.y) * blob.speed;

        // Reset target if reached
        if (Math.hypot(blob.tx - blob.x, blob.ty - blob.y) < 100) {
          blob.tx = Math.random() * w;
          blob.ty = Math.random() * h;
        }

        // Dissolve into scroll coordinates
        let drawX = blob.x;
        let drawY = blob.y - scroll.easeY * 0.3; // Parallax background scrolling

        // Pull toward mouse slightly
        if (mouse.x !== -1000) {
          const dx = mouse.x - blob.x;
          const dy = mouse.y - blob.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 400) {
            const pull = (400 - dist) / 400 * 50;
            drawX += (dx / dist) * pull;
            drawY += (dy / dist) * pull;
          }
        }

        const gradient = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, blob.radius);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'rgba(10, 10, 10, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(drawX, drawY, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Camera perspective config
      const focalLength = 360;
      rotX += 0.002 + scroll.speed * 0.001;
      rotY += 0.0015 + scroll.speed * 0.0005;
      rotZ += 0.0005;

      const cosX = Math.cos(rotX + scrollProgress * Math.PI);
      const sinX = Math.sin(rotX + scrollProgress * Math.PI);
      const cosY = Math.cos(rotY + scrollProgress * Math.PI * 0.5);
      const sinY = Math.sin(rotY + scrollProgress * Math.PI * 0.5);
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);

      // Projected coordinates
      const projected: { x: number; y: number; z: number; depth: number; px: number; py: number; rawColor: string }[] = [];

      // Determine active morph geometry layout depending on scrollProgress
      // Hero (0.0 to 0.15) -> pulsating sphere
      // Philosophy (0.15 to 0.4) -> double helix DNA wave
      // Projects (0.4 to 0.7) -> landscape grid
      // Services/Capabilities (0.7 to 0.9) -> high-frequency torus/orbital ring
      // Reviews/Contact (0.9 to 1.0) -> exploding particles universe
      points.forEach((p, idx) => {
        let tx = p.ox;
        let ty = p.oy;
        let tz = p.oz;


        // Sphere pulsates in Hero
        if (scrollProgress < 0.2) {
          const factor = 1 + Math.sin(time * 2 + idx * 0.05) * 0.08;
          tx *= factor;
          ty *= factor;
          tz *= factor;
        } 
        // Helix DNA stream in Philosophy
        else if (scrollProgress >= 0.2 && scrollProgress < 0.45) {
          const progress = (scrollProgress - 0.2) / 0.25; // normalized
          const angle = (idx / maxPoints) * Math.PI * 8 + time;
          const heightRange = 400;
          const targetY = ((idx / maxPoints) - 0.5) * heightRange;
          const helixRadius = 80;

          // Double strand alternation
          const strand = idx % 2 === 0 ? 0 : Math.PI;
          const targetX = Math.cos(angle + strand) * helixRadius;
          const targetZ = Math.sin(angle + strand) * helixRadius;

          // Interpolate from sphere coordinates to helix coordinates
          tx = tx + (targetX - tx) * progress;
          ty = ty + (targetY - ty) * progress;
          tz = tz + (targetZ - tz) * progress;
        } 
        // Waving 3D Terrain Landscape in ProjectShowcase
        else if (scrollProgress >= 0.45 && scrollProgress < 0.75) {
          const progress = (scrollProgress - 0.45) / 0.3; // normalized
          
          // Generate a flat grid mathematically mapped from index
          const cols = 16;
          const rIdx = idx % cols;
          const cIdx = Math.floor(idx / cols);
          
          const gridWidth = 700;
          const gridHeight = 500;
          const targetX = (rIdx / (cols - 1) - 0.5) * gridWidth;
          const targetZ = (cIdx / (Math.ceil(maxPoints / cols) - 1) - 0.5) * gridHeight;
          
          // Organic sine terrain displacement waves
          const wave = Math.sin(targetX * 0.01 + time * 1.5) * Math.cos(targetZ * 0.01 + time * 1.5) * 45;
          const targetY = wave + 50;

          tx = tx + (targetX - tx) * progress;
          ty = ty + (targetY - ty) * progress;
          tz = tz + (targetZ - tz) * progress;
        } 
        // Torus Ring / Cyberspace Ring in Capabilities/Reviews
        else if (scrollProgress >= 0.75 && scrollProgress < 0.9) {
          const progress = (scrollProgress - 0.75) / 0.15; // normalized
          
          const uAngle = (idx / maxPoints) * Math.PI * 2;
          const vAngle = uAngle * 12 + time; // High frequency rotation around minor radius
          const majorR = 150;
          const minorR = 35;

          const targetX = (majorR + minorR * Math.cos(vAngle)) * Math.cos(uAngle);
          const targetY = minorR * Math.sin(vAngle);
          const targetZ = (majorR + minorR * Math.cos(vAngle)) * Math.sin(uAngle);

          tx = tx + (targetX - tx) * progress;
          ty = ty + (targetY - ty) * progress;
          tz = tz + (targetZ - tz) * progress;
        } 
        // Starfield Cosmos Explosion in Reviews/Contact Form
        else {
          const progress = (scrollProgress - 0.9) / 0.1;
          const angle = (idx / maxPoints) * Math.PI * 4;
          const speedFactor = 220 + 350 * progress;
          const targetX = Math.cos(angle) * speedFactor * Math.sin(idx) + Math.sin(time) * 30;
          const targetY = Math.sin(angle) * speedFactor * Math.cos(idx) + Math.cos(time) * 30;
          const targetZ = Math.cos(idx) * speedFactor + Math.sin(time) * 50;

          tx = tx + (targetX - tx) * progress;
          ty = ty + (targetY - ty) * progress;
          tz = tz + (targetZ - tz) * progress;
        }

        // Apply interactive cursor liquid distortion
        // Project cursor into canvas space coordinates (centered screen)
        if (mouse.x !== -1000) {
          const mx = mouse.x - cx;
          const my = (mouse.y + scroll.easeY * 0.1) - cy; // Scroll adjusted cursor delta
          
          const dx = tx - mx;
          const dy = ty - my;
          const distToCursor = Math.hypot(dx, dy);
          
          if (distToCursor < 180) {
            // Elastic repelling warp vector
            const force = (180 - distToCursor) / 180;
            const pushX = (dx / distToCursor) * force * (60 + Math.abs(mouse.vx) * 0.8);
            const pushY = (dy / distToCursor) * force * (60 + Math.abs(mouse.vy) * 0.8);
            
            tx += pushX;
            ty += pushY;
          }
        }

        // Apply 3D Rotations
        // Pitch (X Axis)
        let y1 = ty * cosX - tz * sinX;
        let z1 = ty * sinX + tz * cosX;

        // Yaw (Y Axis)
        let x2 = tx * cosY + z1 * sinY;
        let z2 = -tx * sinY + z1 * cosY;

        // Roll (Z Axis)
        let x3 = x2 * cosZ - y1 * sinZ;
        let y3 = x2 * sinZ + y1 * cosZ;

        // Perspective 3D calculation
        const zOffset = 380 + (scrollProgress * 80); // Camera zooms out slightly as page progresses
        const depth = z3OffsetCorrection(z2 + zOffset);
        const scale = focalLength / depth;

        const projX = x3 * scale + cx;
        const projY = y3 * scale + cy;

        projected.push({
          x: x3,
          y: y3,
          z: z2,
          depth,
          px: projX,
          py: projY,
          rawColor: p.color
        });
      });

      // Avoid division by zero
      function z3OffsetCorrection(val: number) {
        return val <= 0 ? 0.1 : val;
      }

      // Sort coordinates back-to-front for proper 3D rendering occlusion depth
      projected.sort((a, b) => b.depth - a.depth);

      // Connect coordinates using constellation grid vectors to render a complex digital shell
      const connectThreshold = scrollProgress >= 0.45 && scrollProgress < 0.75 ? 85 : 120; // grid distances

      ctx.lineWidth = 0.55;
      
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.px < 0 || p1.px > w || p1.py < 0 || p1.py > h) continue;

        // Core particle visual color shifting with scroll velocity (fusing colors)
        const alpha = Math.max(0.04, Math.min(0.35, 140 / p1.depth));
        const color = scroll.speed > 5 
          ? `rgba(232, 67, 11, ${alpha * 1.5})`  // Blazing Peach
          : p1.rawColor.replace('0.2', alpha.toString());

        // Connect closely clustered coordinates
        let connections = 0;
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          if (connections >= 4) break; // Limit wireframe bounds for elegant look

          const dProj = Math.hypot(p2.px - p1.px, p2.py - p1.py);
          if (dProj < connectThreshold) {
            connections++;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }

        // Draw node star core
        const rSize = (1.5 + Math.sin(idxOffsetWave(i) + time * 3) * 0.5) * (300 / p1.depth);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p1.px, p1.py, Math.max(0.4, rSize), 0, Math.PI * 2);
        ctx.fill();
      }

      function idxOffsetWave(idx: number) {
        return idx * 0.1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 select-none opacity-80"
    />
  );
}
