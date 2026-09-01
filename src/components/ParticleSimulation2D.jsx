import { useRef, useEffect, useState, useCallback } from "react";
import Matter from "matter-js";

export const ParticleSimulation2D = () => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const animRef = useRef(null);
  const mouseConstraintRef = useRef(null);
  const dimensionsRef = useRef({ width: 400, height: 400 });
  const bodiesToRemoveRef = useRef([]);
  const [current, setCurrent] = useState(85);
  const [alphaOn, setAlphaOn] = useState(true);
  const spawnCountRef = useRef(0);

  const MAX_BODIES = 30;
  const currentRef = useRef(current);
  useEffect(() => { currentRef.current = current; }, [current]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const container = canvas.parentElement;
    if (!container) return;

    const W = container.clientWidth || 520;
    const H = container.clientHeight || 380;
    dimensionsRef.current = { width: W, height: H };
    canvas.width = W;
    canvas.height = H;

    const engine = Matter.Engine.create({
      enableSleeping: false,
      gravity: { x: 0, y: 0 },
      render: { visible: false, element: null },
    });
    engineRef.current = engine;
    const world = engine.world;

    // Chamber bounds (inset)
    const pad = 16;
    const chamberLeft = pad + 40;
    const chamberRight = W - pad - 40;
    const chamberTop = pad + 42;
    const chamberBottom = H - pad - 18;
    const chamberW = chamberRight - chamberLeft;
    const chamberH = chamberBottom - chamberTop;
    const wallThickness = 8;

    const walls = [
      Matter.Bodies.rectangle(W / 2, chamberTop - wallThickness / 2, chamberW + wallThickness * 2, wallThickness, { isStatic: true, label: "wall", render: { visible: false } }),
      Matter.Bodies.rectangle(W / 2, chamberBottom + wallThickness / 2, chamberW + wallThickness * 2, wallThickness, { isStatic: true, label: "wall", render: { visible: false } }),
      Matter.Bodies.rectangle(chamberLeft - wallThickness / 2, (chamberTop + chamberBottom) / 2, wallThickness, chamberH, { isStatic: true, label: "wall", render: { visible: false } }),
      Matter.Bodies.rectangle(chamberRight + wallThickness / 2, (chamberTop + chamberBottom) / 2, wallThickness, chamberH, { isStatic: true, label: "wall", render: { visible: false } }),
    ];

    // Electrodes (static visual bodies)
    const cathode = Matter.Bodies.rectangle(chamberLeft + 18, (chamberTop + chamberBottom) / 2, 12, chamberH - 24, {
      isStatic: true,
      label: "cathode",
      collisionFilter: { category: 2, mask: 0 },
    });
    const anode = Matter.Bodies.rectangle(chamberRight - 18, (chamberTop + chamberBottom) / 2, 12, chamberH - 24, {
      isStatic: true,
      label: "anode",
      collisionFilter: { category: 2, mask: 0 },
    });

    // Alpha source 241Am (static emitter)
    const source = Matter.Bodies.circle(chamberLeft + 46, (chamberTop + chamberBottom) / 2, 10, {
      isStatic: true,
      label: "source",
      collisionFilter: { category: 2, mask: 0 },
    });

    Matter.World.add(world, [...walls, cathode, anode, source]);

    // Ions and electrons pool
    const ions = [];
    const electrons = [];
    const smokes = [];

    const spawnIonPair = () => {
      if (!alphaOn) return;
      if (world.bodies.length > MAX_BODIES + 10) return;
      const x = chamberLeft + 60 + Math.random() * (chamberW - 120);
      const y = chamberTop + 20 + Math.random() * (chamberH - 40);
      const ion = Matter.Bodies.circle(x, y, 5, {
        label: "ion",
        mass: 0.2,
        frictionAir: 0.03,
        restitution: 0.6,
      });
      const electron = Matter.Bodies.circle(x + 8, y, 3, {
        label: "electron2d",
        mass: 0.001,
        frictionAir: 0.05,
        restitution: 0.9,
      });
      // drift toward electrodes
      Matter.Body.setVelocity(ion, { x: -0.6 - Math.random() * 0.6, y: (Math.random() - 0.5) * 0.8 });
      Matter.Body.setVelocity(electron, { x: 0.8 + Math.random() * 0.8, y: (Math.random() - 0.5) * 1.2 });
      Matter.World.add(world, [ion, electron]);
      ions.push(ion);
      electrons.push(electron);
    };

    const spawnAlpha = () => {
      if (!alphaOn) return;
      const alpha = Matter.Bodies.circle(source.position.x + 14, source.position.y + (Math.random() - 0.5) * 10, 4, {
        label: "alpha",
        mass: 0.5,
        frictionAir: 0.01,
        restitution: 0.8,
      });
      Matter.Body.setVelocity(alpha, { x: 1.5 + Math.random() * 1.2, y: (Math.random() - 0.5) * 0.6 });
      Matter.World.add(world, alpha);
    };

    // initial population
    for (let i = 0; i < 6; i++) spawnIonPair();
    for (let i = 0; i < 2; i++) spawnAlpha();

    const ionInterval = setInterval(spawnIonPair, 900);
    const alphaInterval = setInterval(spawnAlpha, 1400);

    // Mouse interaction
    const mouse = Matter.Mouse.create(canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Matter.World.add(world, mouseConstraint);
    mouseConstraintRef.current = mouseConstraint;

    let running = true;
    let lastCurrentUpdate = 0;

    const draw = (now) => {
      if (!running) return;
      Matter.Engine.update(engine, 1000 / 60);

      // smoke captures ions: proximity check throttled
      if (now - lastCurrentUpdate > 500) {
        lastCurrentUpdate = now;
        const ionCount = world.bodies.filter((b) => b.label === "ion").length;
        const smokeCount = world.bodies.filter((b) => b.label === "smoke").length;
        // current drops with smoke (captures ions)
        const base = 85;
        const drop = Math.min(70, smokeCount * 9 + Math.max(0, (6 - ionCount) * 4));
        const next = Math.max(4, base - drop + (Math.random() * 4 - 2));
        setCurrent(Math.round(next));
      }

      // remove bodies that drifted out or smoke-ion capture
      // smoke captures nearby ions
      const smokesBodies = world.bodies.filter((b) => b.label === "smoke");
      const ionsBodies = world.bodies.filter((b) => b.label === "ion");
      for (const s of smokesBodies) {
        for (const ion of ionsBodies) {
          const dx = s.position.x - ion.position.x;
          const dy = s.position.y - ion.position.y;
          if (Math.hypot(dx, dy) < 14) {
            bodiesToRemoveRef.current.push(ion);
          }
        }
      }
      if (bodiesToRemoveRef.current.length) {
        Matter.World.remove(world, bodiesToRemoveRef.current);
        bodiesToRemoveRef.current = [];
      }

      const { width: w, height: h } = dimensionsRef.current;
      const currentCanvas = canvasRef.current;
      if (!currentCanvas || !ctx) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fefcf8";
      ctx.fillRect(0, 0, w, h);

      // grid subtle
      ctx.strokeStyle = "rgba(14,74,122,0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i < w; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
      }
      for (let i = 0; i < h; i += 40) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
      }

      // chamber outline
      ctx.strokeStyle = "#c9a227";
      ctx.lineWidth = 2;
      ctx.strokeRect(chamberLeft, chamberTop, chamberW, chamberH);
      ctx.fillStyle = "rgba(201,162,39,0.04)";
      ctx.fillRect(chamberLeft, chamberTop, chamberW, chamberH);

      // chamber label
      ctx.fillStyle = "#0e4a7a";
      ctx.font = "600 10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("CÂMARA DE IONIZAÇÃO", W / 2, chamberTop - 12);
      ctx.font = "400 8px Inter, sans-serif";
      ctx.fillStyle = "rgba(26,42,58,0.6)";
      ctx.fillText("Fonte α (²⁴¹Am)            Cátodo (−)            Ânodo (+)", W / 2, chamberTop - 24);

      // draw bodies
      world.bodies.forEach((body) => {
        const { x, y } = body.position;
        if (body.label === "wall") return;
        if (body.label === "cathode") {
          ctx.fillStyle = "#0e4a7a";
          ctx.fillRect(x - 6, y - (chamberH - 24) / 2, 12, chamberH - 24);
          ctx.fillStyle = "white";
          ctx.font = "700 8px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("−", x, y);
        } else if (body.label === "anode") {
          ctx.fillStyle = "#c9a227";
          ctx.fillRect(x - 6, y - (chamberH - 24) / 2, 12, chamberH - 24);
          ctx.fillStyle = "#0e4a7a";
          ctx.font = "700 8px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("+", x, y);
        } else if (body.label === "source") {
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, Math.PI * 2);
          ctx.fillStyle = "#ef4444";
          ctx.fill();
          ctx.strokeStyle = "#7f1d1d";
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.fillStyle = "white";
          ctx.font = "700 7px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("α", x, y);
        } else if (body.label === "ion") {
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = "#c9a227";
          ctx.fill();
          ctx.strokeStyle = "#7c5a0a";
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (body.label === "electron2d") {
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = "#0e4a7a";
          ctx.fill();
        } else if (body.label === "alpha") {
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#ef4444";
          ctx.fill();
          ctx.strokeStyle = "#991b1b";
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (body.label === "smoke") {
          ctx.beginPath();
          ctx.arc(x, y, 9, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(156,163,175,0.85)";
          ctx.fill();
          ctx.strokeStyle = "rgba(107,114,128,0.5)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    let resizeTimeout = null;
    const resizeHandler = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!container) return;
        const nw = container.clientWidth || 520;
        const nh = container.clientHeight || 380;
        dimensionsRef.current = { width: nw, height: nh };
        canvas.width = nw;
        canvas.height = nh;
      }, 150);
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      running = false;
      clearInterval(ionInterval);
      clearInterval(alphaInterval);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", resizeHandler);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
    };
  }, [alphaOn]);

  const spawnSmoke = useCallback((n = 12) => {
    const engine = engineRef.current;
    if (!engine) return;
    if (engine.world.bodies.filter((b) => b.label === "smoke").length >= MAX_BODIES) return;
    const canvas = canvasRef.current;
    const w = canvas?.width || 520;
    const h = canvas?.height || 380;
    const chamberLeft = 56;
    const chamberRight = w - 56;
    const chamberTop = 58;
    const chamberBottom = h - 34;
    const toAdd = [];
    for (let i = 0; i < n; i++) {
      if (engine.world.bodies.length > MAX_BODIES + 15) break;
      const x = chamberLeft + 40 + Math.random() * (chamberRight - chamberLeft - 80);
      const y = chamberTop + 20 + Math.random() * (chamberBottom - chamberTop - 40);
      const body = Matter.Bodies.circle(x, y, 9, {
        label: "smoke",
        mass: 0.08,
        frictionAir: 0.02,
        restitution: 0.4,
      });
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 0.8, y: (Math.random() - 0.5) * 0.8 });
      toAdd.push(body);
    }
    Matter.World.add(engine.world, toAdd);
    spawnCountRef.current += toAdd.length;
  }, []);

  const handleReset = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;
    const toRemove = engine.world.bodies.filter((b) => ["smoke", "alpha", "ion", "electron2d"].includes(b.label));
    Matter.World.remove(engine.world, toRemove);
    setCurrent(85);
    spawnCountRef.current = 0;
    // respawn ions
    for (let i = 0; i < 6; i++) {
      const w = canvasRef.current?.width || 520;
      const h = canvasRef.current?.height || 380;
      const x = 80 + Math.random() * (w - 160);
      const y = 70 + Math.random() * (h - 100);
      const ion = Matter.Bodies.circle(x, y, 5, { label: "ion", mass: 0.2, frictionAir: 0.03 });
      const el = Matter.Bodies.circle(x + 8, y, 3, { label: "electron2d", mass: 0.001, frictionAir: 0.05 });
      Matter.Body.setVelocity(ion, { x: -0.6 - Math.random() * 0.6, y: (Math.random() - 0.5) * 0.8 });
      Matter.Body.setVelocity(el, { x: 0.8 + Math.random() * 0.8, y: (Math.random() - 0.5) * 1.2 });
      Matter.World.add(engine.world, [ion, el]);
    }
  }, []);

  const alarmOn = current < 35;
  const gaugePct = Math.max(0, Math.min(100, current));

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 border-b border-[#c9a227]/10 bg-[#fefcf8] shrink-0">
        <button
          onClick={() => spawnSmoke(12)}
          className="rounded-full bg-[#0e4a7a] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#0e4a7a]/90 transition"
        >
          Inserir Fumaça
        </button>
        <button
          onClick={handleReset}
          className="rounded-full border border-[#c9a227]/30 bg-white px-4 py-1.5 text-xs font-semibold text-[#0e4a7a] hover:bg-[#fefcf8] transition"
        >
          Reset
        </button>
        <button
          onClick={() => setAlphaOn((v) => !v)}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${alphaOn ? "bg-[#c9a227] text-[#0e4a7a]" : "bg-white border border-[#c9a227]/30 text-[#1a2a3a]/60"}`}
        >
          Alfa {alphaOn ? "ON" : "OFF"}
        </button>
        <div className="ml-auto flex items-center gap-2 text-xs">
          <span className="text-[#1a2a3a]/60 font-medium">Corrente:</span>
          <span className={`font-bold ${alarmOn ? "text-[#ef4444]" : "text-[#0e4a7a]"}`}>{current} µA</span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-widest ${alarmOn ? "bg-[#ef4444] text-white animate-pulse" : "bg-emerald-100 text-emerald-700"}`}>
            Alarme: {alarmOn ? "ON" : "OFF"}
          </span>
        </div>
      </div>
      <div className="relative flex-1 min-h-[260px]">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Simulação 2D da câmara de ionização — interativa"
          className="w-full h-full block"
          style={{ width: "100%", height: "100%" }}
        />
        <div className="absolute bottom-2 left-2 right-2">
          <div className="h-1.5 rounded-full bg-[#1a2a3a]/10 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${alarmOn ? "bg-[#ef4444]" : "bg-[#0e4a7a]"}`}
              style={{ width: `${gaugePct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticleSimulation2D;
