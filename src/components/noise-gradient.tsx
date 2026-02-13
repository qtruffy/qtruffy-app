'use client';

import { useEffect, useRef } from 'react';

interface NoiseGradientProps {
  /**
   * Contrôle l'intensité du dégradé
   * 0 = très doux et diffus
   * 1 = saturé et contrasté
   */
  intensity?: number;
}

export function NoiseGradient({ intensity = 0.7 }: NoiseGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noiseCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true, // Améliore les performances
    });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const referenceWidth = 1920;
    const referenceHeight = 1080;
    const referenceDiagonal = Math.sqrt(
      referenceWidth * referenceWidth + referenceHeight * referenceHeight
    );
    const baseRadius = referenceDiagonal * 0.8;

    // Ajuster les opacités en fonction de l'intensité
    const getOpacity = (baseOpacity: number) => baseOpacity * intensity;

    // Créer un canvas pour le bruit (une seule fois)
    const createNoiseCanvas = () => {
      const noiseCanvas = document.createElement('canvas');
      noiseCanvas.width = width;
      noiseCanvas.height = height;
      const noiseCtx = noiseCanvas.getContext('2d');
      if (!noiseCtx) return null;

      const imageData = noiseCtx.createImageData(width, height);
      const data = imageData.data;

      // Générer le bruit une seule fois
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 18;
        data[i] = 128 + noise;
        data[i + 1] = 128 + noise;
        data[i + 2] = 128 + noise;
        data[i + 3] = 255;
      }

      noiseCtx.putImageData(imageData, 0, 0);
      return noiseCanvas;
    };

    noiseCanvasRef.current = createNoiseCanvas();

    // Configuration des blobs
    const blobsConfig = [
      {
        baseX: 0.15,
        baseY: 0.85,
        radius: baseRadius * 0.8,
        moveRangeX: 0.03,
        moveRangeY: 0.02,
        speedX: 0.0003,
        speedY: 0.0004,
        colors: [
          { stop: 0, color: `rgba(99, 179, 237, ${getOpacity(0.9)})` },
          { stop: 0.4, color: `rgba(147, 197, 253, ${getOpacity(0.6)})` },
          { stop: 0.7, color: `rgba(191, 219, 254, ${getOpacity(0.3)})` },
          { stop: 1, color: 'rgba(191, 219, 254, 0)' },
        ],
      },
      {
        baseX: 0.4,
        baseY: 0.5,
        radius: baseRadius * 0.85,
        moveRangeX: 0.04,
        moveRangeY: 0.03,
        speedX: 0.0002,
        speedY: 0.0003,
        colors: [
          { stop: 0, color: `rgba(167, 139, 250, ${getOpacity(0.85)})` },
          { stop: 0.4, color: `rgba(196, 181, 253, ${getOpacity(0.6)})` },
          { stop: 0.7, color: `rgba(221, 214, 254, ${getOpacity(0.3)})` },
          { stop: 1, color: 'rgba(221, 214, 254, 0)' },
        ],
      },
      {
        baseX: 0.75,
        baseY: 0.25,
        radius: baseRadius * 0.75,
        moveRangeX: 0.025,
        moveRangeY: 0.035,
        speedX: 0.00035,
        speedY: 0.00025,
        colors: [
          { stop: 0, color: `rgba(244, 114, 182, ${getOpacity(0.75)})` },
          { stop: 0.4, color: `rgba(251, 207, 232, ${getOpacity(0.6)})` },
          { stop: 0.7, color: `rgba(252, 231, 243, ${getOpacity(0.3)})` },
          { stop: 1, color: 'rgba(252, 231, 243, 0)' },
        ],
      },
      {
        baseX: 0.85,
        baseY: 0.6,
        radius: baseRadius * 0.7,
        moveRangeX: 0.03,
        moveRangeY: 0.04,
        speedX: 0.00025,
        speedY: 0.0004,
        colors: [
          { stop: 0, color: `rgba(251, 207, 232, ${getOpacity(0.65)})` },
          { stop: 0.5, color: `rgba(254, 242, 242, ${getOpacity(0.35)})` },
          { stop: 1, color: 'rgba(254, 242, 242, 0)' },
        ],
      },
    ];

    // Configuration des splines
    const splinesConfig = [
      {
        basePoints: [
          { x: 0.2, y: 0.6 },
          { x: 0.35, y: 0.45 },
          { x: 0.55, y: 0.4 },
          { x: 0.7, y: 0.55 },
        ],
        controlPoints: [
          { x: 0.27, y: 0.5 },
          { x: 0.45, y: 0.35 },
          { x: 0.62, y: 0.45 },
        ],
        gradient: {
          start: { x: 0.35, y: 0.5 },
          end: { x: 0.6, y: 0.4 },
          colors: [
            { stop: 0, color: `rgba(196, 181, 253, ${getOpacity(0.6)})` },
            { stop: 0.5, color: `rgba(221, 214, 254, ${getOpacity(0.4)})` },
            { stop: 1, color: 'rgba(233, 213, 255, 0)' },
          ],
        },
        moveRange: 0.04,
        speed: 0.00025,
        lineWidth: 350,
        blur: 70,
      },
      {
        basePoints: [
          { x: 0.1, y: 0.1 },
          { x: 0.25, y: 0.15 },
          { x: 0.4, y: 0.2 },
          { x: 0.5, y: 0.1 },
        ],
        controlPoints: [
          { x: 0.17, y: 0.08 },
          { x: 0.32, y: 0.12 },
          { x: 0.45, y: 0.15 },
        ],
        gradient: {
          start: { x: 0.25, y: 0.15 },
          end: { x: 0.45, y: 0.25 },
          colors: [
            { stop: 0, color: `rgba(147, 197, 253, ${getOpacity(0.55)})` },
            { stop: 0.5, color: `rgba(191, 219, 254, ${getOpacity(0.35)})` },
            { stop: 1, color: 'rgba(224, 242, 254, 0)' },
          ],
        },
        moveRange: 0.04,
        speed: 0.00028,
        lineWidth: 300,
        blur: 60,
      },
      {
        basePoints: [
          { x: 0.5, y: 0.8 },
          { x: 0.65, y: 0.75 },
          { x: 0.8, y: 0.7 },
          { x: 0.95, y: 0.8 },
        ],
        controlPoints: [
          { x: 0.57, y: 0.72 },
          { x: 0.72, y: 0.68 },
          { x: 0.87, y: 0.75 },
        ],
        gradient: {
          start: { x: 0.6, y: 0.75 },
          end: { x: 0.85, y: 0.7 },
          colors: [
            { stop: 0, color: `rgba(244, 114, 182, ${getOpacity(0.5)})` },
            { stop: 0.5, color: `rgba(251, 207, 232, ${getOpacity(0.3)})` },
            { stop: 1, color: 'rgba(252, 231, 243, 0)' },
          ],
        },
        moveRange: 0.03,
        speed: 0.00032,
        lineWidth: 320,
        blur: 65,
      },
    ];

    const drawSpline = (
      points: Array<{ x: number; y: number }>,
      controlPoints: Array<{ x: number; y: number }>
    ) => {
      ctx.beginPath();
      ctx.moveTo(points[0].x * width, points[0].y * height);

      for (let i = 0; i < points.length - 1; i++) {
        const cp1 = controlPoints[i];
        const cp2 =
          i + 1 < controlPoints.length
            ? controlPoints[i + 1]
            : controlPoints[i];
        const end = points[i + 1];

        ctx.bezierCurveTo(
          cp1.x * width,
          cp1.y * height,
          cp2.x * width,
          cp2.y * height,
          end.x * width,
          end.y * height
        );
      }
    };

    const drawGradient = (time: number) => {
      // Limiter à 30 FPS pour économiser la batterie
      const fps = 30;
      const fpsInterval = 1000 / fps;
      const elapsed = time - lastTimeRef.current;

      if (elapsed < fpsInterval) {
        animationRef.current = requestAnimationFrame(drawGradient);
        return;
      }

      lastTimeRef.current = time - (elapsed % fpsInterval);

      // Base blanche/gris très clair
      ctx.fillStyle = '#FAFAFA';
      ctx.fillRect(0, 0, width, height);

      // Dessiner les blobs
      blobsConfig.forEach(config => {
        const offsetX = Math.sin(time * config.speedX) * config.moveRangeX;
        const offsetY = Math.cos(time * config.speedY) * config.moveRangeY;

        const x = width * (config.baseX + offsetX);
        const y = height * (config.baseY + offsetY);

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, config.radius);
        config.colors.forEach(({ stop, color }) => {
          gradient.addColorStop(stop, color);
        });
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      // Dessiner les splines
      splinesConfig.forEach((config, index) => {
        const animatedPoints = config.basePoints.map((p, i) => ({
          x: p.x + Math.sin(time * config.speed + i * 0.5) * config.moveRange,
          y: p.y + Math.cos(time * config.speed + i * 0.7) * config.moveRange,
        }));

        const animatedControlPoints = config.controlPoints.map((p, i) => ({
          x: p.x + Math.cos(time * config.speed + i * 0.6) * config.moveRange,
          y: p.y + Math.sin(time * config.speed + i * 0.8) * config.moveRange,
        }));

        const gradStartX =
          (config.gradient.start.x +
            Math.sin(time * config.speed) * config.moveRange * 0.5) *
          width;
        const gradStartY =
          (config.gradient.start.y +
            Math.cos(time * config.speed) * config.moveRange * 0.5) *
          height;
        const gradEndX =
          (config.gradient.end.x +
            Math.cos(time * config.speed) * config.moveRange * 0.5) *
          width;
        const gradEndY =
          (config.gradient.end.y +
            Math.sin(time * config.speed) * config.moveRange * 0.5) *
          height;

        const gradient = ctx.createLinearGradient(
          gradStartX,
          gradStartY,
          gradEndX,
          gradEndY
        );
        config.gradient.colors.forEach(({ stop, color }) => {
          gradient.addColorStop(stop, color);
        });

        // Première couche de spline
        drawSpline(animatedPoints, animatedControlPoints);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = config.lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.filter = `blur(${config.blur}px)`;
        ctx.stroke();
        ctx.filter = 'none';

        // Deuxième couche plus floue
        drawSpline(animatedPoints, animatedControlPoints);
        ctx.lineWidth = config.lineWidth * 1.5;
        ctx.filter = `blur(${config.blur * 1.5}px)`;
        ctx.globalAlpha = 0.4 * intensity;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.filter = 'none';
      });

      // Lumière diffuse centrale
      const lightRadius = referenceDiagonal * 0.5;
      const lightGradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        0,
        width * 0.5,
        height * 0.35,
        lightRadius
      );
      lightGradient.addColorStop(0, `rgba(255, 255, 255, ${getOpacity(0.5)})`);
      lightGradient.addColorStop(
        0.5,
        `rgba(255, 255, 255, ${getOpacity(0.2)})`
      );
      lightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = lightGradient;
      ctx.fillRect(0, 0, width, height);

      // Appliquer le bruit pré-généré avec blend mode
      if (noiseCanvasRef.current) {
        ctx.globalAlpha = 0.03; // Très subtil
        ctx.globalCompositeOperation = 'overlay';
        ctx.drawImage(noiseCanvasRef.current, 0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
      }

      animationRef.current = requestAnimationFrame(drawGradient);
    };

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Recréer le canvas de bruit
      noiseCanvasRef.current = createNoiseCanvas();
    };

    setCanvasSize();
    animationRef.current = requestAnimationFrame(drawGradient);

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setCanvasSize, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationRef.current);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ imageRendering: 'auto' }}
    />
  );
}
