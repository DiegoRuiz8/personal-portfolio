import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  BoxGeometry,
  Color,
  CylinderGeometry,
  ExtrudeGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
  TextureLoader,
  WebGLRenderer,
  type BufferGeometry,
  type Material,
  type Texture,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export type HeroState = { rot: number; progress: number; opacity: [number, number, number] };

type PhoneSceneProps = {
  screens: string[];
  state: HeroState;
  subscribe: (listener: () => void) => () => void;
  fallback: React.ReactNode;
};

const BODY_W = 71.5;
const BODY_H = 148.6;
const BODY_R = 11.5;
const BEVEL = 1.2;
const BODY_DEPTH = 5.4;
const FACE_Z = BODY_DEPTH / 2 + BEVEL;
const SCREEN_W = 66.1;
const SCREEN_H = SCREEN_W / 0.4616;

const roundedRect = (w: number, h: number, r: number) => {
  const s = new Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r);
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h);
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
};

const plate = (w: number, h: number, r: number) => {
  const geo = new ShapeGeometry(roundedRect(w, h, r), 40);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + h / 2) / h);
  return geo;
};

const buildPhone = (textures: Texture[], screenMaterials: MeshBasicMaterial[], disposables: Array<BufferGeometry | Material>) => {
  const phone = new Group();
  const track = <T extends BufferGeometry | Material>(item: T) => {
    disposables.push(item);
    return item;
  };

  const titanium = track(new MeshStandardMaterial({ color: new Color("#6b6761"), metalness: 1, roughness: 0.34 }));
  const glassBlack = track(new MeshPhysicalMaterial({ color: "#040405", roughness: 0.1, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.05 }));
  const backGlass = track(new MeshPhysicalMaterial({ color: "#232326", roughness: 0.5, metalness: 0.15, clearcoat: 0.3, clearcoatRoughness: 0.5 }));
  const lensGlass = track(new MeshPhysicalMaterial({ color: "#05060a", roughness: 0.04, metalness: 0.3, clearcoat: 1, clearcoatRoughness: 0.02 }));
  const lensCore = track(new MeshPhysicalMaterial({ color: "#0d1426", roughness: 0.05, metalness: 0.2, clearcoat: 1 }));
  const flashMat = track(new MeshStandardMaterial({ color: "#d9d4c8", metalness: 0.2, roughness: 0.4 }));

  const frameShape = roundedRect(BODY_W - BEVEL * 2, BODY_H - BEVEL * 2, BODY_R - BEVEL);
  const frameGeo = track(
    new ExtrudeGeometry(frameShape, {
      depth: BODY_DEPTH,
      bevelEnabled: true,
      bevelThickness: BEVEL,
      bevelSize: BEVEL,
      bevelSegments: 10,
      curveSegments: 40,
    })
  );
  frameGeo.translate(0, 0, -BODY_DEPTH / 2);
  phone.add(new Mesh(frameGeo, titanium));

  const faceW = BODY_W - BEVEL * 2 + 0.2;
  const faceH = BODY_H - BEVEL * 2 + 0.2;
  const front = new Mesh(track(plate(faceW, faceH, BODY_R - BEVEL)), glassBlack);
  front.position.z = FACE_Z + 0.02;
  phone.add(front);

  const screenGeo = track(plate(SCREEN_W, SCREEN_H, 8.6));
  textures.forEach((texture, i) => {
    const mat = screenMaterials[i];
    mat.map = texture;
    const mesh = new Mesh(screenGeo, mat);
    mesh.position.z = FACE_Z + 0.05 + i * 0.01;
    phone.add(mesh);
  });

  const sheenMat = track(
    new MeshPhysicalMaterial({ color: "#ffffff", transparent: true, opacity: 0.07, roughness: 0.04, metalness: 0, clearcoat: 1, depthWrite: false })
  );
  const sheen = new Mesh(front.geometry, sheenMat);
  sheen.position.z = FACE_Z + 0.12;
  phone.add(sheen);

  const back = new Group();
  back.rotation.y = Math.PI;
  back.position.z = -FACE_Z - 0.02;
  const backPane = new Mesh(front.geometry, backGlass);
  back.add(backPane);

  const bump = new Mesh(
    track(new ExtrudeGeometry(roundedRect(31, 31, 8.8), { depth: 0.7, bevelEnabled: true, bevelThickness: 0.3, bevelSize: 0.3, bevelSegments: 4, curveSegments: 32 })),
    track(new MeshPhysicalMaterial({ color: "#2e2e32", roughness: 0.28, metalness: 0.25, clearcoat: 0.8, clearcoatRoughness: 0.15 }))
  );
  bump.position.set(-BODY_W / 2 + 3.6 + 15.5, BODY_H / 2 - 3.6 - 15.5, 0.02);
  back.add(bump);

  const ringGeo = track(new CylinderGeometry(6.1, 6.1, 1.9, 56));
  const lensGeo = track(new CylinderGeometry(4.9, 4.9, 2.1, 56));
  const coreGeo = track(new CylinderGeometry(2.4, 2.4, 2.25, 40));
  const lenses: Array<[number, number]> = [[-6.6, 6.6], [-6.6, -6.6], [6.6, 0]];
  lenses.forEach(([x, y]) => {
    const g = new Group();
    g.rotation.x = Math.PI / 2;
    const ring = new Mesh(ringGeo, titanium);
    const lens = new Mesh(lensGeo, lensGlass);
    const core = new Mesh(coreGeo, lensCore);
    g.add(ring, lens, core);
    g.position.set(bump.position.x + x, bump.position.y + y, 1.3);
    back.add(g);
  });
  const flash = new Mesh(track(new CylinderGeometry(2.1, 2.1, 1.2, 32)), flashMat);
  flash.rotation.x = Math.PI / 2;
  flash.position.set(bump.position.x + 6.6, bump.position.y + 9.6, 1.0);
  back.add(flash);
  phone.add(back);

  const buttons: Array<[number, number, number]> = [
    [BODY_W / 2, 24, 18],
    [-BODY_W / 2, 36, 7],
    [-BODY_W / 2, 20, 12],
    [-BODY_W / 2, 4, 12],
  ];
  buttons.forEach(([x, y, len]) => {
    const btn = new Mesh(track(new BoxGeometry(1.1, len, 2.6)), titanium);
    btn.position.set(x + Math.sign(x) * 0.15, y, 0);
    phone.add(btn);
  });

  return phone;
};

export default function PhoneScene({ screens, state, subscribe, fallback }: PhoneSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    const compact = window.matchMedia("(max-width: 880px)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 2 : 2.5));
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.className = "phone-canvas";
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    const pmrem = new PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    scene.environmentIntensity = 0.9;

    const camera = new PerspectiveCamera(28, 1, 10, 2000);
    const disposables: Array<BufferGeometry | Material> = [];
    const loader = new TextureLoader();
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const textures = screens.map((src) => {
      const t = loader.load(src, () => render());
      t.colorSpace = SRGBColorSpace;
      t.anisotropy = maxAniso;
      return t;
    });
    const screenMaterials = screens.map(
      () => new MeshBasicMaterial({ transparent: true, toneMapped: false, depthWrite: false })
    );
    screenMaterials.forEach((m) => disposables.push(m));

    const phone = buildPhone(textures, screenMaterials, disposables);
    scene.add(phone);

    const render = () => {
      phone.rotation.y = MathUtils.degToRad(state.rot);
      phone.rotation.x = MathUtils.degToRad(-4 * Math.sin(MathUtils.degToRad(state.rot)));
      phone.scale.setScalar(0.94 + state.progress * 0.14);
      screenMaterials.forEach((m, i) => {
        m.opacity = state.opacity[i] ?? 0;
        m.visible = m.opacity > 0.001;
      });
      renderer.render(scene, camera);
    };

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const frameH = BODY_H * 1.18;
      camera.position.set(0, 0, frameH / 2 / Math.tan(MathUtils.degToRad(camera.fov / 2)));
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      render();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const unsubscribe = subscribe(render);
    resize();
    host.classList.add("phone-host--ready");

    return () => {
      host.classList.remove("phone-host--ready");
      unsubscribe();
      observer.disconnect();
      textures.forEach((t) => t.dispose());
      disposables.forEach((d) => d.dispose());
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [screens, state, subscribe]);

  return (
    <>
      <div ref={hostRef} className="phone-host" />
      {fallback}
    </>
  );
}
