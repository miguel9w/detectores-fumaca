import { useRef, useEffect, useState, useCallback } from "react";
import Matter from "matter-js";

export const ParticleSimulation2D = () => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const animRef = useRef(null);
  const dimensionsRef = useRef({ width: 400, height: 400 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;

    const W = container.clientWidth || 400;
    const H = container.clientHeight || 400;
    dimensionsRef.current = { width: W, height: H };
    canvas.width = W;
    canvas.height = H;

    const cx = W / 2;
    const cy = H / 2;

    const engine = Matter.Engine.create({
      render: { visible: false, element: null },
    });

    const protonBody = Matter.Bodies.circle(cx - 50, cy, 12, {
      label: "proton",
      mass: 1,
      isStatic: true,
      collisionFilter: { category: 1, mask: 1 },
    });

    const electronBody = Matter.Bodies.circle(cx + 50, cy, 6, {
      label: "electron",
      mass: 0.001,
      collisionFilter: { category: 1, mask: 1 },
    });

    const neutronBody = Matter.Bodies.circle(cx, cy - 40, 10, {
      label: "neutron",
      mass: 1,
      isStatic: true,
      collisionFilter: { category: 1, mask: 1 },
    });

    Matter.World.add(engine.world, [protonBody, electronBody, neutronBody]);
    Matter.Engine.run(engine);
    engineRef.current = engine;

    let running = true;
    let resizeHandler = null;

    const draw = () => {
      if (!running) return;
      Matter.Engine.update(engine, 1000 / 60);

      const { width: w, height: h } = dimensionsRef.current;
      const currentCanvas = canvasRef.current;
      if (!currentCanvas || !ctx) return;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fafafa";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "#e0e0e0";
      ctx.lineWidth = 1;
      for (let i = 0; i < w; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
      }
      for (let i = 0; i < h; i += 40) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#333";
      ctx.fill();

      const bodies = engine.world.bodies;
      bodies.forEach((body) => {
        if (body.label === "neutron") {
          ctx.beginPath();
          ctx.arc(body.position.x, body.position.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = "#e0e0e0";
          ctx.fill();
          ctx.strokeStyle = "#333";
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (body.label === "proton") {
          ctx.beginPath();
          ctx.arc(body.position.x, body.position.y, 12, 0, Math.PI * 2);
          ctx.fillStyle = "#ffd700";
          ctx.fill();
          ctx.strokeStyle = "#333";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = "#333";
          ctx.font = "bold 10px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("p", body.position.x, body.position.y);
        } else if (body.label === "electron") {
          ctx.beginPath();
          ctx.arc(body.position.x, body.position.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = "#4fc3f7";
          ctx.fill();
          ctx.strokeStyle = "#333";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = "#333";
          ctx.font = "bold 8px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("e", body.position.x, body.position.y);
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    resizeHandler = () => {
      if (container) {
        const nw = container.clientWidth || 400;
        const nh = container.clientHeight || 400;
        dimensionsRef.current = { width: nw, height: nh };
        canvas.width = nw;
        canvas.height = nh;
      }
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      running = false;
      window.removeEventListener("resize", resizeHandler);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (engineRef.current) Matter.Engine.stop(engineRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
};