// Stylised 3D training mannequin: muscle groups light up, and a "day" value (0..1)
// widens lats/delts and shrinks the belly. Illustration only, not a prediction.
import * as THREE from '../vendor/three.module.min.js';

const GROUPS = ['chest', 'back', 'delts', 'arms', 'legs', 'core', 'belly', 'base'];

export function createBody(canvas, opts = {}) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch (e) {
    canvas.dispatchEvent(new CustomEvent('nogl'));
    return null;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(opts.fov || 28, 1, 0.1, 50);
  camera.position.set(0, 1.05, opts.dist || 4.1);
  camera.lookAt(0, 0.98, 0);

  // Lights: cool sky, warm key, cobalt rim
  scene.add(new THREE.HemisphereLight(0xdfe7ff, 0x1a1d22, 0.9));
  const key = new THREE.DirectionalLight(0xfff1e6, 2.2); key.position.set(2.2, 3.2, 2.6); scene.add(key);
  const rim = new THREE.DirectionalLight(0x5b86ff, 2.4); rim.position.set(-2.5, 2.2, -2.8); scene.add(rim);
  const fill = new THREE.DirectionalLight(0xff7a3d, 0.5); fill.position.set(2.5, 0.6, -1.5); scene.add(fill);

  const clay = new THREE.Color(0xb9c0c9);
  const hot = new THREE.Color(opts.accent || 0xff6a2b);
  const fat = new THREE.Color(0xc9b8a8);

  const fig = new THREE.Group();
  scene.add(fig);
  const parts = Object.fromEntries(GROUPS.map(g => [g, []]));

  function mat(group) {
    return new THREE.MeshStandardMaterial({
      color: group === 'belly' ? fat.clone() : clay.clone(),
      roughness: 0.48, metalness: 0.05,
      emissive: hot.clone(), emissiveIntensity: 0,
    });
  }
  const sphere = new THREE.SphereGeometry(1, 40, 28);
  function blob(group, pos, scale, rot = [0, 0, 0]) {
    const m = new THREE.Mesh(sphere, mat(group));
    m.position.set(...pos); m.scale.set(...scale); m.rotation.set(...rot);
    m.userData.base = m.scale.clone();
    fig.add(m); parts[group].push(m); return m;
  }
  function cap(group, pos, r, len, rot = [0, 0, 0]) {
    const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 10, 24), mat(group));
    m.position.set(...pos); m.rotation.set(...rot);
    m.userData.base = m.scale.clone();
    fig.add(m); parts[group].push(m); return m;
  }
  function cyl(group, pos, rt, rb, h, sz = 1) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, 40, 1), mat(group));
    m.position.set(...pos); m.scale.set(1, 1, sz);
    m.userData.base = m.scale.clone();
    fig.add(m); parts[group].push(m); return m;
  }

  // Head & neck
  blob('base', [0, 1.72, 0], [0.098, 0.118, 0.108]);
  cyl('base', [0, 1.585, 0], 0.052, 0.06, 0.13);
  // Torso
  blob('back', [0, 1.5, -0.035], [0.2, 0.075, 0.11]);               // traps
  blob('base', [0, 1.3, 0], [0.235, 0.25, 0.145]);                   // ribcage
  const chestL = blob('chest', [0.098, 1.375, 0.092], [0.118, 0.082, 0.062], [0, 0.18, -0.12]);
  const chestR = blob('chest', [-0.098, 1.375, 0.092], [0.118, 0.082, 0.062], [0, -0.18, 0.12]);
  const latL = blob('back', [0.185, 1.24, -0.045], [0.085, 0.19, 0.095], [0, 0, 0.32]);
  const latR = blob('back', [-0.185, 1.24, -0.045], [0.085, 0.19, 0.095], [0, 0, -0.32]);
  blob('back', [0, 1.3, -0.095], [0.18, 0.17, 0.07]);                // mid back
  const waist = cyl('base', [0, 1.05, 0], 0.185, 0.17, 0.3, 0.72);
  blob('core', [0, 1.1, 0.07], [0.12, 0.17, 0.065]);                 // abs
  const belly = blob('belly', [0, 1.0, 0.075], [0.15, 0.12, 0.1]);   // the part we want gone
  blob('base', [0, 0.89, 0], [0.2, 0.12, 0.135]);                     // pelvis
  blob('legs', [0.083, 0.86, -0.07], [0.098, 0.105, 0.085]);
  blob('legs', [-0.083, 0.86, -0.07], [0.098, 0.105, 0.085]);
  // Shoulders & arms
  const deltL = blob('delts', [0.285, 1.445, 0], [0.083, 0.088, 0.088]);
  const deltR = blob('delts', [-0.285, 1.445, 0], [0.083, 0.088, 0.088]);
  cap('arms', [0.315, 1.25, 0], 0.052, 0.2, [0, 0, 0.09]);
  cap('arms', [-0.315, 1.25, 0], 0.052, 0.2, [0, 0, -0.09]);
  cap('base', [0.338, 0.99, 0.02], 0.041, 0.21, [0, 0, 0.04]);
  cap('base', [-0.338, 0.99, 0.02], 0.041, 0.21, [0, 0, -0.04]);
  blob('base', [0.345, 0.835, 0.03], [0.036, 0.05, 0.026]);
  blob('base', [-0.345, 0.835, 0.03], [0.036, 0.05, 0.026]);
  // Legs
  cap('legs', [0.1, 0.6, 0], 0.088, 0.28);
  cap('legs', [-0.1, 0.6, 0], 0.088, 0.28);
  cap('legs', [0.1, 0.24, -0.012], 0.058, 0.26);
  cap('legs', [-0.1, 0.24, -0.012], 0.058, 0.26);
  blob('base', [0.1, 0.035, 0.045], [0.045, 0.03, 0.105]);
  blob('base', [-0.1, 0.035, 0.045], [0.045, 0.03, 0.105]);

  // Plinth: a rubber weight plate with an orange collar ring
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.06, 64),
    new THREE.MeshStandardMaterial({ color: 0x1c2026, roughness: 0.9 }));
  plate.position.y = -0.03; scene.add(plate);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.012, 12, 96),
    new THREE.MeshStandardMaterial({ color: hot, emissive: hot, emissiveIntensity: 0.6 }));
  ring.rotation.x = Math.PI / 2; ring.position.y = 0.002; scene.add(ring);
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.07, 32),
    new THREE.MeshStandardMaterial({ color: 0x8f98a3, metalness: 0.8, roughness: 0.3 }));
  hub.position.y = -0.025; scene.add(hub);

  // State
  let target = new Set(opts.highlight || []);
  let day = opts.day ?? 0;
  let rotY = -0.35, vel = 0, dragging = false, lastX = 0;
  let auto = !reduce && opts.autoRotate !== false;
  let visible = true, raf = 0;

  function applyMorph(t) {
    const s = (m, x, y, z) => m.scale.set(m.userData.base.x * x, m.userData.base.y * y, m.userData.base.z * z);
    [latL, latR].forEach(m => s(m, 1 + 0.32 * t, 1 + 0.06 * t, 1 + 0.18 * t));
    [deltL, deltR].forEach(m => s(m, 1 + 0.14 * t, 1 + 0.1 * t, 1 + 0.12 * t));
    [chestL, chestR].forEach(m => s(m, 1 + 0.06 * t, 1 + 0.08 * t, 1 + 0.2 * t));
    s(waist, 1 - 0.08 * t, 1, 1 - 0.08 * t);
    const b = 1 - 0.8 * t; s(belly, Math.max(b, 0.2), Math.max(b, 0.2), Math.max(b, 0.05));
  }

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  function frame() {
    raf = 0;
    if (!dragging) {
      if (auto) rotY += 0.0045;
      rotY += vel; vel *= 0.92;
    }
    fig.rotation.y = rotY;
    for (const g of GROUPS) {
      const on = target.has(g);
      for (const m of parts[g]) {
        const k = m.material.emissiveIntensity;
        m.material.emissiveIntensity = k + ((on ? 0.85 : 0) - k) * 0.12;
        m.material.color.lerp(on ? hot : (g === 'belly' ? fat : clay), 0.1);
      }
    }
    applyMorph(day);
    renderer.render(scene, camera);
    if (visible) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf && visible) raf = requestAnimationFrame(frame); }

  new IntersectionObserver(([e]) => { visible = e.isIntersecting && !document.hidden; kick(); }).observe(canvas);
  document.addEventListener('visibilitychange', () => { visible = !document.hidden; kick(); });

  canvas.addEventListener('pointerdown', e => { dragging = true; lastX = e.clientX; vel = 0; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = (e.clientX - lastX) / 120; lastX = e.clientX;
    rotY += dx; vel = dx * 0.6;
  });
  const end = () => { dragging = false; };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);

  kick();
  return {
    highlight(list) { target = new Set(list); kick(); },
    setDay(t) { day = Math.max(0, Math.min(1, t)); kick(); },
    face(side) { rotY = side === 'back' ? Math.PI : 0; vel = 0; kick(); },
    setAuto(v) { auto = v && !reduce; kick(); },
  };
}
