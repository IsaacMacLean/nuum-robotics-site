(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const NS = "http://www.w3.org/2000/svg";
  const fanBlades = document.getElementById("fanBlades");
  const acoustic = document.getElementById("acousticLiner");
  const spiral = document.getElementById("spinnerSpiral");

  if (fanBlades) {
    const N = 36;
    const root = 60;
    const tip = 222;
    const sweep = 0.62;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      const span = (Math.PI * 2) / N;
      const aRootL = a - span * 0.32;
      const aRootR = a + span * 0.32;
      const aTipL = a - span * 0.08 + sweep;
      const aTipR = a + span * 0.42 + sweep;

      const rx = (r, ang) => Math.cos(ang) * r;
      const ry = (r, ang) => Math.sin(ang) * r;

      const p1x = rx(root, aRootL), p1y = ry(root, aRootL);
      const p2x = rx(root, aRootR), p2y = ry(root, aRootR);
      const p3x = rx(tip, aTipR), p3y = ry(tip, aTipR);
      const p4x = rx(tip, aTipL), p4y = ry(tip, aTipL);

      const midR = (root + tip) / 2;
      const c1x = rx(midR + 6, aRootR + sweep * 0.45);
      const c1y = ry(midR + 6, aRootR + sweep * 0.45);
      const c2x = rx(midR - 6, aRootL + sweep * 0.45);
      const c2y = ry(midR - 6, aRootL + sweep * 0.45);

      const d =
        `M ${p1x.toFixed(2)} ${p1y.toFixed(2)} ` +
        `L ${p2x.toFixed(2)} ${p2y.toFixed(2)} ` +
        `Q ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${p3x.toFixed(2)} ${p3y.toFixed(2)} ` +
        `L ${p4x.toFixed(2)} ${p4y.toFixed(2)} ` +
        `Q ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p1x.toFixed(2)} ${p1y.toFixed(2)} Z`;

      const blade = document.createElementNS(NS, "path");
      blade.setAttribute("d", d);
      fanBlades.appendChild(blade);
    }
  }

  if (acoustic) {
    const rings = [248, 268, 288, 308, 328];
    const N = 96;
    rings.forEach((r) => {
      for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2;
        const x1 = Math.cos(a) * r;
        const y1 = Math.sin(a) * r;
        const x2 = Math.cos(a) * (r + 4);
        const y2 = Math.sin(a) * (r + 4);
        const ln = document.createElementNS(NS, "line");
        ln.setAttribute("x1", x1.toFixed(2));
        ln.setAttribute("y1", y1.toFixed(2));
        ln.setAttribute("x2", x2.toFixed(2));
        ln.setAttribute("y2", y2.toFixed(2));
        acoustic.appendChild(ln);
      }
    });
  }

  // CFM56 signature spinner spiral — a thick white curl from edge to center
  if (spiral) {
    const turns = 1.15;
    const steps = 90;
    const rMax = 40;
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const r = rMax * (1 - t);
      const a = t * turns * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      d += (i === 0 ? "M " : "L ") + x.toFixed(2) + " " + y.toFixed(2) + " ";
    }
    spiral.setAttribute("d", d.trim());
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;

  let tx = window.innerWidth / 2;
  let ty = window.innerHeight / 2;
  let cx = tx;
  let cy = ty;
  let raf = 0;

  const tick = () => {
    cx += (tx - cx) * 0.15;
    cy += (ty - cy) * 0.15;
    root.style.setProperty("--mx", cx + "px");
    root.style.setProperty("--my", cy + "px");
    if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = 0;
    }
  };

  let activated = false;
  const onMove = (x, y) => {
    tx = x;
    ty = y;
    if (!activated) {
      activated = true;
      document.body.classList.add("cursor-active");
    }
    if (!raf) raf = requestAnimationFrame(tick);
  };

  window.addEventListener("mousemove", (e) => onMove(e.clientX, e.clientY), { passive: true });
  window.addEventListener("touchmove", (e) => {
    const t = e.touches[0];
    if (t) onMove(t.clientX, t.clientY);
  }, { passive: true });

  root.style.setProperty("--mx", tx + "px");
  root.style.setProperty("--my", ty + "px");

  if (!reduceMotion) {
    const engine = document.querySelector(".engine");
    if (engine) {
      const start = performance.now();
      const spin = (now) => {
        const t = (now - start) / 1000;
        engine.style.transform = `translate(-50%, -50%) rotate(${(t * 2.2).toFixed(3)}deg)`;
        requestAnimationFrame(spin);
      };
      requestAnimationFrame(spin);
    }
  }
})();
