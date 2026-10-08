"use client";

/**
 * Garrafa 3D de vidro verde, com os rótulos reais.
 * - Vidro: LatheGeometry (perfil Bordeaux ou Albeisa) + MeshPhysicalMaterial, iluminado por um ambiente
 *   procedural de "softboxes" (nenhum arquivo HDR externo).
 * - Rótulo: segmento de cilindro com a textura (rótulo + etiqueta, fundo transparente); contrarrótulo nas costas.
 * - Interação: arrastar gira a garrafa; ao trocar de vinho ela dá uma volta e o rótulo troca de costas.
 * - `variant` escolhe o visual (vidro/luz/formato). Veja VARIANTS e a página /garrafe.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Wine } from "@/content/site";

/** Estado do arrasto, lido a cada frame (fora do ciclo de render do React). */
export class BottleControl {
  dragging = false;
  private dx = 0;
  press() {
    this.dragging = true;
  }
  release() {
    this.dragging = false;
  }
  move(d: number) {
    this.dx += d;
  }
  /** devolve o deslocamento acumulado desde a última leitura */
  consume() {
    const d = this.dx;
    this.dx = 0;
    return d;
  }
}

const TAU = Math.PI * 2;
const LABEL_ASPECT = 1100 / 1400; // largura / altura das texturas em /public/labels
const LABEL_H = 12.6;
const LABEL_Y = 11.2; // centro do rótulo na garrafa (cm)
const BACK_ASPECT = 0.857; // contrarrótulo 60x70 mm
const BACK_H = 7.35;
const BACK_Y = 10.8;

/* ——— variantes visuais ——— */
export type BottleVariant = "classica" | "satinata" | "morbida" | "albeisa";

type Light = { i: number; c: string; p: [number, number, number]; s: [number, number, number] };
type Look = {
  shape: "bordeaux" | "albeisa";
  glass: {
    color: string;
    roughness: number;
    transmission: number;
    thickness: number;
    attenuationColor: string;
    attenuationDistance: number;
    clearcoat: number;
    clearcoatRoughness: number;
    envMapIntensity: number;
  };
  cap: { metalness: number; roughness: number; clearcoat: number; envMapIntensity: number };
  bg: string;
  lights: Light[];
  key: number;
  fill: number;
};

export const VARIANTS: Record<BottleVariant, Look> = {
  // a atual: vidro brilhante, reflexos fortes
  classica: {
    shape: "bordeaux",
    glass: { color: "#1c4d2c", roughness: 0.04, transmission: 0.82, thickness: 2.6, attenuationColor: "#0e5a2a", attenuationDistance: 2.2, clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 1.5 },
    cap: { metalness: 0.55, roughness: 0.28, clearcoat: 0.6, envMapIntensity: 1.2 },
    bg: "#241f1a",
    lights: [
      { i: 14, c: "#fff3e2", p: [-9, 5, 7], s: [2.4, 24, 1] },
      { i: 10, c: "#fff3e2", p: [10, 4, 6], s: [1.6, 24, 1] },
      { i: 3.2, c: "#ffffff", p: [0, 15, 3], s: [16, 7, 1] },
      { i: 1, c: "#ffd9b0", p: [0, -2, 11], s: [22, 3, 1] },
      { i: 5, c: "#fff6ea", p: [0, 4, -11], s: [18, 14, 1] },
    ],
    key: 1.5,
    fill: 0.45,
  },
  // vidro verde escuro fosco/acetinado: sem brilho forte, luz difusa
  satinata: {
    shape: "bordeaux",
    glass: { color: "#143019", roughness: 0.34, transmission: 0, thickness: 0, attenuationColor: "#0e5a2a", attenuationDistance: 2, clearcoat: 0.35, clearcoatRoughness: 0.4, envMapIntensity: 0.85 },
    cap: { metalness: 0.3, roughness: 0.5, clearcoat: 0.1, envMapIntensity: 0.8 },
    bg: "#2c2620",
    lights: [
      { i: 3.2, c: "#fff3e2", p: [-9, 5, 7], s: [8, 26, 1] },
      { i: 2.2, c: "#fff3e2", p: [10, 4, 6], s: [6, 26, 1] },
      { i: 2, c: "#ffffff", p: [0, 15, 3], s: [18, 9, 1] },
      { i: 0.6, c: "#ffd9b0", p: [0, -2, 11], s: [22, 3, 1] },
      { i: 2.5, c: "#fff6ea", p: [0, 4, -11], s: [18, 14, 1] },
    ],
    key: 1.1,
    fill: 0.5,
  },
  // vidro verde antigo translúcido, luz suave e ampla: dá para ver o vinho por dentro
  morbida: {
    shape: "bordeaux",
    glass: { color: "#9cc48a", roughness: 0.2, transmission: 0.93, thickness: 3.2, attenuationColor: "#3f7a2a", attenuationDistance: 2.4, clearcoat: 0.15, clearcoatRoughness: 0.35, envMapIntensity: 0.6 },
    cap: { metalness: 0.35, roughness: 0.42, clearcoat: 0.2, envMapIntensity: 0.9 },
    bg: "#3a332b",
    lights: [
      { i: 2.6, c: "#fff6ea", p: [-9, 6, 8], s: [10, 28, 1] },
      { i: 1.6, c: "#fff6ea", p: [10, 4, 6], s: [7, 26, 1] },
      { i: 2.2, c: "#ffffff", p: [0, 15, 3], s: [20, 10, 1] },
      { i: 0.8, c: "#ffd9b0", p: [0, -2, 11], s: [22, 3, 1] },
      { i: 4, c: "#fff6ea", p: [0, 4, -11], s: [22, 18, 1] },
    ],
    key: 1.1,
    fill: 0.5,
  },
  // formato "albeisa" (a garrafa tradicional do Piemonte): ombros em declive, vidro pesado, verde-oliva acetinado
  albeisa: {
    shape: "albeisa",
    glass: { color: "#1d3a20", roughness: 0.3, transmission: 0, thickness: 0, attenuationColor: "#1b4a1f", attenuationDistance: 2, clearcoat: 0.4, clearcoatRoughness: 0.35, envMapIntensity: 0.9 },
    cap: { metalness: 0.4, roughness: 0.38, clearcoat: 0.25, envMapIntensity: 0.9 },
    bg: "#2c2620",
    lights: [
      { i: 4.5, c: "#fff3e2", p: [-9, 5, 7], s: [6, 26, 1] },
      { i: 3, c: "#fff3e2", p: [10, 4, 6], s: [4, 26, 1] },
      { i: 2.4, c: "#ffffff", p: [0, 15, 3], s: [18, 8, 1] },
      { i: 0.7, c: "#ffd9b0", p: [0, -2, 11], s: [22, 3, 1] },
      { i: 3, c: "#fff6ea", p: [0, 4, -11], s: [18, 14, 1] },
    ],
    key: 1.2,
    fill: 0.5,
  },
};

/* ——— geometria (unidades em cm; garrafa com 30 cm) ——— */
function bodyRadius(shape: Look["shape"]) {
  return shape === "albeisa" ? 3.95 : 3.82;
}

function glassProfile(shape: Look["shape"]) {
  const v = (x: number, y: number) => new THREE.Vector2(x, y);
  const path = new THREE.CurvePath<THREE.Vector2>();
  if (shape === "albeisa") {
    path.add(new THREE.CubicBezierCurve(v(0, 2.2), v(1.4, 2.2), v(2.5, 1.4), v(3.2, 0.3))); // fundo, punt fundo
    path.add(new THREE.CubicBezierCurve(v(3.2, 0.3), v(3.4, 0.0), v(3.9, 0.0), v(3.95, 1.0))); // calcanhar
    path.add(new THREE.LineCurve(v(3.95, 1.0), v(3.95, 17.6))); // corpo
    path.add(new THREE.CubicBezierCurve(v(3.95, 17.6), v(3.95, 20.6), v(2.7, 22.0), v(1.95, 23.5))); // ombro em declive
    path.add(new THREE.CubicBezierCurve(v(1.95, 23.5), v(1.7, 24.2), v(1.5, 24.4), v(1.5, 25.2))); // pescoço
  } else {
    path.add(new THREE.CubicBezierCurve(v(0, 1.7), v(1.4, 1.7), v(2.4, 1.0), v(3.1, 0.2))); // fundo com "punt"
    path.add(new THREE.CubicBezierCurve(v(3.1, 0.2), v(3.3, 0.0), v(3.75, 0.0), v(3.82, 0.9))); // calcanhar
    path.add(new THREE.LineCurve(v(3.82, 0.9), v(3.82, 18.3))); // corpo
    path.add(new THREE.CubicBezierCurve(v(3.82, 18.3), v(3.82, 20.2), v(3.6, 21.2), v(2.9, 22.9))); // ombro
    path.add(new THREE.CubicBezierCurve(v(2.9, 22.9), v(2.48, 23.92), v(1.5, 24.1), v(1.5, 25.2))); // pescoço
  }
  path.add(new THREE.LineCurve(v(1.5, 25.2), v(1.46, 28.4)));
  path.add(new THREE.LineCurve(v(1.46, 28.4), v(1.7, 28.7))); // anel da boca
  path.add(new THREE.LineCurve(v(1.7, 28.7), v(1.7, 29.8)));
  path.add(new THREE.LineCurve(v(1.7, 29.8), v(1.45, 30.0)));
  return path.getPoints(56);
}

function liquidProfile(glass: THREE.Vector2[]) {
  const pts = glass.filter((p) => p.y <= 24.3).map((p) => new THREE.Vector2(Math.max(0, p.x - 0.34), p.y + 0.02));
  const last = pts[pts.length - 1];
  pts.push(new THREE.Vector2(0, last.y));
  return pts;
}

const CAPSULE = [
  [0, 30.1], [1.3, 30.1], [1.64, 29.95], [1.72, 29.6], [1.7, 29.0], [1.62, 28.6],
  [1.6, 27.8], [1.6, 25.7], [1.64, 25.2], [1.67, 24.95],
].map(([x, y]) => new THREE.Vector2(x, y));

/* ——— sombra de contato (disco com gradiente radial) ——— */
function useShadowTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(30,26,22,0.55)");
    grad.addColorStop(0.45, "rgba(30,26,22,0.22)");
    grad.addColorStop(1, "rgba(30,26,22,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function Bottle({ wines, index, ctl, look }: { wines: Wine[]; index: number; ctl: BottleControl; look: Look }) {
  const textures = useTexture([...wines.map((w) => w.label), ...wines.map((w) => w.back)], (t) => {
    (Array.isArray(t) ? t : [t]).forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
    });
  });

  const [shown, setShown] = useState(index);
  const target = useRef(index);
  useEffect(() => {
    target.current = index;
  }, [index]);

  const group = useRef<THREE.Group>(null);
  const capMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const liqMat = useRef<THREE.MeshStandardMaterial>(null);
  const run = useRef({
    angle: 0,
    vel: 0,
    idleFrom: 0,
    shown: index,
    spin: null as null | { t0: number; dir: number; to: number; swapped: boolean },
  });

  const { glassGeo, liquidGeo, capsuleGeo, labelGeo, backGeo } = useMemo(() => {
    const prof = glassProfile(look.shape);
    const R = bodyRadius(look.shape) + 0.015; // o rótulo assenta sobre o corpo
    const arc = (LABEL_H * LABEL_ASPECT) / R;
    const backArc = (BACK_H * BACK_ASPECT) / R;
    return {
      glassGeo: new THREE.LatheGeometry(prof, 128),
      liquidGeo: new THREE.LatheGeometry(liquidProfile(prof), 96),
      capsuleGeo: new THREE.LatheGeometry(CAPSULE, 96),
      labelGeo: new THREE.CylinderGeometry(R, R, LABEL_H, 96, 1, true, -arc / 2, arc),
      backGeo: new THREE.CylinderGeometry(R, R, BACK_H, 64, 1, true, Math.PI - backArc / 2, backArc),
    };
  }, [look.shape]);

  const colors = useMemo(
    () => wines.map((w) => ({ cap: new THREE.Color(w.capsule), liq: new THREE.Color(w.liquid) })),
    [wines],
  );
  const shadowTex = useShadowTexture();

  useFrame((state, dt) => {
    const r = run.current;
    const t = state.clock.elapsedTime;
    dt = Math.min(dt, 0.05);

    // troca de vinho: uma volta completa; o rótulo muda na metade, quando está de costas
    if (target.current !== r.shown && !r.spin) {
      r.spin = { t0: t, dir: target.current > r.shown ? 1 : -1, to: target.current, swapped: false };
    }
    let spinAngle = 0;
    if (r.spin) {
      const p = Math.min(1, (t - r.spin.t0) / 1.25);
      spinAngle = r.spin.dir * ease(p) * TAU;
      if (p >= 0.5 && !r.spin.swapped) {
        r.spin.swapped = true;
        setShown(r.spin.to);
      }
      if (p >= 1) {
        r.shown = r.spin.to;
        r.spin = null;
      }
    }

    // arrastar + inércia; depois de um tempo parado volta suavemente para a frente
    if (ctl.dragging) {
      const d = ctl.consume() * 0.012;
      r.angle += d;
      r.vel = d / Math.max(dt, 1e-3);
      r.idleFrom = t;
    } else {
      r.angle += r.vel * dt;
      r.vel *= Math.pow(0.04, dt);
      if (t - r.idleFrom > 2.2) {
        const rest = Math.round(r.angle / TAU) * TAU;
        r.angle += (rest - r.angle) * (1 - Math.exp(-2.4 * dt));
      }
    }
    const idle = Math.min(1, Math.max(0, (t - r.idleFrom - 1) / 2));
    const sway = Math.sin(t * 0.7) * 0.1 * idle;
    if (group.current) group.current.rotation.y = r.angle + spinAngle + sway;

    // cor da cápsula e do vinho
    const k = 1 - Math.exp(-8 * dt);
    const col = colors[shown];
    capMat.current?.color.lerp(col.cap, k);
    liqMat.current?.color.lerp(col.liq, k);
  });

  return (
    <>
      <group ref={group}>
        {/* vinho */}
        <mesh geometry={liquidGeo}>
          <meshStandardMaterial ref={liqMat} color={colors[0].liq} roughness={0.25} side={THREE.DoubleSide} />
        </mesh>

        {/* vidro */}
        <mesh geometry={glassGeo}>
          <meshPhysicalMaterial
            color={look.glass.color}
            roughness={look.glass.roughness}
            metalness={0}
            transmission={look.glass.transmission}
            thickness={look.glass.thickness}
            ior={1.5}
            attenuationColor={look.glass.attenuationColor}
            attenuationDistance={look.glass.attenuationDistance}
            clearcoat={look.glass.clearcoat}
            clearcoatRoughness={look.glass.clearcoatRoughness}
            envMapIntensity={look.glass.envMapIntensity}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* cápsula */}
        <mesh geometry={capsuleGeo}>
          <meshPhysicalMaterial
            ref={capMat}
            color={colors[0].cap}
            metalness={look.cap.metalness}
            roughness={look.cap.roughness}
            clearcoat={look.cap.clearcoat}
            clearcoatRoughness={0.2}
            envMapIntensity={look.cap.envMapIntensity}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* rótulo */}
        <mesh geometry={labelGeo} position={[0, LABEL_Y, 0]}>
          <meshStandardMaterial
            map={textures[shown]}
            roughness={0.78}
            metalness={0.05}
            envMapIntensity={0.7}
            emissive="#ffffff"
            emissiveMap={textures[shown]}
            emissiveIntensity={0.18}
            alphaTest={0.5}
            alphaToCoverage
          />
        </mesh>

        {/* contrarrótulo (nas costas) */}
        <mesh geometry={backGeo} position={[0, BACK_Y, 0]}>
          <meshStandardMaterial
            map={textures[wines.length + shown]}
            roughness={0.8}
            metalness={0.02}
            envMapIntensity={0.6}
            emissive="#ffffff"
            emissiveMap={textures[wines.length + shown]}
            emissiveIntensity={0.18}
          />
        </mesh>
      </group>

      {/* sombra no chão */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 0]}>
        <circleGeometry args={[10.5, 48]} />
        <meshBasicMaterial map={shadowTex} transparent depthWrite={false} toneMapped={false} />
      </mesh>
    </>
  );
}

function Ready({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, [onReady]);
  return null;
}

/** Se o WebGL falhar, mostra o conteúdo alternativo em vez de quebrar a página. */
class Guard extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function Bottle3D({
  wines,
  index,
  active,
  fallback,
  variant = "classica",
}: {
  wines: Wine[];
  index: number;
  active: boolean;
  fallback: ReactNode;
  variant?: BottleVariant;
}) {
  const look = VARIANTS[variant];
  const [ctl] = useState(() => new BottleControl());
  const lastX = useRef(0);
  const [ready, setReady] = useState(false);

  return (
    <Guard fallback={fallback}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          cursor: "grab",
          touchAction: "pan-y",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.8s",
        }}
        onPointerDown={(e) => {
          ctl.press();
          lastX.current = e.clientX;
          e.currentTarget.setPointerCapture(e.pointerId);
          e.currentTarget.style.cursor = "grabbing";
        }}
        onPointerMove={(e) => {
          if (!ctl.dragging) return;
          ctl.move(e.clientX - lastX.current);
          lastX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          ctl.release();
          e.currentTarget.style.cursor = "grab";
        }}
        onPointerCancel={() => {
          ctl.release();
        }}
      >
        <Canvas
          aria-hidden
          dpr={[1, 2]}
          frameloop={active ? "always" : "never"}
          camera={{ fov: 27, position: [0, 17, 70], near: 10, far: 200 }}
          gl={{ alpha: true, antialias: true, toneMapping: THREE.NeutralToneMapping }}
          onCreated={({ camera }) => camera.lookAt(0, 14.6, 0)}
        >
          <Suspense fallback={null}>
            <Environment key={`env-${variant}`} resolution={256} frames={1}>
              <color attach="background" args={[look.bg]} />
              {look.lights.map((l, i) => (
                <Lightformer key={i} form="rect" intensity={l.i} color={l.c} position={l.p} scale={l.s} />
              ))}
            </Environment>
            <directionalLight position={[-14, 22, 36]} intensity={look.key} color="#fff2e0" />
            <directionalLight position={[16, 8, 30]} intensity={look.fill} color="#ffe9d0" />
            <Bottle key={`bottle-${variant}`} wines={wines} index={index} ctl={ctl} look={look} />
            <Ready onReady={() => setReady(true)} />
          </Suspense>
        </Canvas>
      </div>
    </Guard>
  );
}
