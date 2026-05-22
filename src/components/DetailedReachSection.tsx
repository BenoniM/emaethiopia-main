import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

type LocationItem = {
  name: string;
  lat: number;
  lng: number;
  isHub: boolean;
  flag: string;
};

const LOCATIONS: LocationItem[] = [
  { name: "Ethiopia (Hub)", lat: 9.0338, lng: 38.7423, isHub: true, flag: "ET" },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194, isHub: false, flag: "US" },
  { name: "Washington", lat: 38.9072, lng: -77.0369, isHub: false, flag: "US" },
  { name: "Paris", lat: 48.8566, lng: 2.3522, isHub: false, flag: "FR" },
  { name: "Frankfurt", lat: 50.1109, lng: 8.6821, isHub: false, flag: "DE" },
  { name: "Singapore", lat: 1.3521, lng: 103.8198, isHub: false, flag: "SG" },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503, isHub: false, flag: "JP" },
];

const getFlagUrl = (countryCode: string) =>
  `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;

const convertLatLngToVector3 = (lat: number, lng: number, radius: number) => {
  const u = (lng + 180) / 360;
  const v = (90 - lat) / 180;

  const x = -radius * Math.cos(u * Math.PI * 2) * Math.sin(v * Math.PI);
  const y = radius * Math.cos(v * Math.PI);
  const z = radius * Math.sin(u * Math.PI * 2) * Math.sin(v * Math.PI);

  return new THREE.Vector3(x, y, z);
};

export default function DetailedReachSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeLocation, setActiveLocation] = useState<string>("Ethiopia (Hub)");

  const GLOBE_RADIUS = 100;
  const CAMERA_DISTANCE = 320;

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      1,
      1000
    );
    cameraRef.current = camera;
    camera.position.set(0, 0, CAMERA_DISTANCE);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    scene.add(globeGroup);

    const globeMat = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 1,
      metalness: 0.1,
      roughness: 0.8,
    });

    const globeGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(200, 300, 200);
    scene.add(directionalLight);

    const loader = new THREE.TextureLoader();
    const TARGET_GREEN = { r: 0x1b, g: 0x6e, b: 0x1b };

    let recoloredTexture: THREE.Texture | null = null;

    loader.load(
      "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
      (texture) => {
        const image = texture.image as HTMLImageElement | HTMLCanvasElement;

        const canvas2 = document.createElement("canvas");
        canvas2.width = image.width;
        canvas2.height = image.height;

        const ctx = canvas2.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas2.width, canvas2.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          if (a === 0) continue;

          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const saturation = max === 0 ? 0 : (max - min) / max;

          const isLandOrGreen =
            saturation > 0.12 &&
            !(b > r + 20 && b > g + 20);

          if (isLandOrGreen) {
            data[i] = TARGET_GREEN.r;
            data[i + 1] = TARGET_GREEN.g;
            data[i + 2] = TARGET_GREEN.b;
          }
        }

        ctx.putImageData(imageData, 0, 0);

        recoloredTexture = new THREE.CanvasTexture(canvas2);
        recoloredTexture.needsUpdate = true;

        globeMat.map = recoloredTexture;
        globeMat.needsUpdate = true;
      }
    );

    const hubLoc = LOCATIONS.find((l) => l.isHub)!;
    const hubVector = convertLatLngToVector3(hubLoc.lat, hubLoc.lng, GLOBE_RADIUS);

    const pinMeshes: THREE.Mesh[] = [];
    const arcLines: THREE.Line[] = [];

    LOCATIONS.forEach((loc) => {
      const destVector = convertLatLngToVector3(loc.lat, loc.lng, GLOBE_RADIUS);

      const pinGeo = new THREE.SphereGeometry(loc.isHub ? 2.5 : 1.5, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: loc.isHub ? 0xef4444 : 0x1B6E1B,
      });

      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(destVector);
      globeGroup.add(pin);
      pinMeshes.push(pin);

      if (!loc.isHub) {
        const midPoint = new THREE.Vector3()
          .addVectors(hubVector, destVector)
          .multiplyScalar(0.5);

        const distance = hubVector.distanceTo(destVector);
        midPoint.normalize().multiplyScalar(GLOBE_RADIUS + distance * 0.3 + 6);

        const curve = new THREE.QuadraticBezierCurve3(hubVector, midPoint, destVector);
        const points = curve.getPoints(50);

        const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
        const arcMat = new THREE.LineDashedMaterial({
          color: 0xffffff,
          dashSize: 2.5,
          gapSize: 3,
          transparent: true,
          opacity: 0.95,
        });

        arcMat.depthTest = false;
        arcMat.depthWrite = false;

        const arc = new THREE.Line(arcGeo, arcMat);
        arc.computeLineDistances();
        arc.renderOrder = 50;

        globeGroup.add(arc);
        arcLines.push(arc);
      }
    });

    globeGroup.rotation.x = 0.1;
    globeGroup.rotation.y = -0.5;

    const controls = new OrbitControls(camera, canvas);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.minDistance = CAMERA_DISTANCE;
    controls.maxDistance = CAMERA_DISTANCE;
    controls.enablePan = false;

    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);

      if (cameraRef.current && containerRef.current) {
        LOCATIONS.forEach((loc, i) => {
          const marker = markerRefs.current[i];
          if (!marker) return;

          const pointWorldPos = convertLatLngToVector3(loc.lat, loc.lng, GLOBE_RADIUS);
          pointWorldPos.applyMatrix4(globeGroup.matrixWorld);

          const cameraDir = cameraRef.current!.position.clone().normalize();
          const pointNormal = pointWorldPos.clone().normalize();
          const dotProduct = cameraDir.dot(pointNormal);

          if (dotProduct > -0.15) {
            const projected = pointWorldPos.clone().project(cameraRef.current!);

            const x = (projected.x * 0.5 + 0.5) * container.clientWidth;
            const y = -(projected.y * 0.5 - 0.5) * container.clientHeight;

            const scale = 0.7 + dotProduct * 0.3;
            const opacity = dotProduct > 0 ? 1 : (dotProduct + 0.15) / 0.15;

            marker.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
            marker.style.opacity = opacity.toString();
            marker.style.display = "flex";
          } else {
            marker.style.display = "none";
          }
        });
      }
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();

      pinMeshes.forEach((pin) => {
        pin.geometry.dispose();
        if (Array.isArray(pin.material)) {
          pin.material.forEach((m) => m.dispose());
        } else {
          pin.material.dispose();
        }
      });

      arcLines.forEach((arc) => {
        arc.geometry.dispose();
        if (Array.isArray(arc.material)) {
          arc.material.forEach((m) => m.dispose());
        } else {
          arc.material.dispose();
        }
      });

      globeGeo.dispose();
      globeMat.dispose();
      recoloredTexture?.dispose();
      renderer.dispose();
    };
  }, []);

  const handleLocationClick = (name: string, lat: number, lng: number) => {
    if (!controlsRef.current || !cameraRef.current || !globeGroupRef.current) return;

    setActiveLocation(name);

    const localTarget = convertLatLngToVector3(lat, lng, CAMERA_DISTANCE);
    localTarget.applyEuler(globeGroupRef.current.rotation);

    const startPos = cameraRef.current.position.clone();

    gsap.killTweensOf(startPos);

    gsap.to(startPos, {
      x: localTarget.x,
      y: localTarget.y,
      z: localTarget.z,
      duration: 1.5,
      ease: "power3.inOut",
      onUpdate: () => {
        startPos.normalize().multiplyScalar(CAMERA_DISTANCE);
        cameraRef.current?.position.copy(startPos);
        controlsRef.current?.target.set(0, 0, 0);
      },
    });
  };

  return (
    <section className="relative w-full py-24 bg-zinc-950 text-white overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6 z-10">
            <span className="text-xs uppercase tracking-widest text-[#1B6E1B] font-medium bg-[#1B6E1B]/10 px-3 py-1 rounded-full border border-[#1B6E1B]/20">
              Global Presence
            </span>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Our Reach
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed">
              From our operational heartland in Ethiopia, we maintain key trading lines and
              logistical partnerships across major global hubs. Select a location to rotate the view.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => handleLocationClick(loc.name, loc.lat, loc.lng)}
                  className={`relative p-3 rounded-xl border text-left transition-all duration-300 backdrop-blur-md ${
                    activeLocation === loc.name
                      ? "bg-zinc-900 border-[#1B6E1B] shadow-[0_0_15px_rgba(27,110,27,0.22)] text-white"
                      : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
  <div
    className={`w-8 h-5 rounded overflow-hidden border shadow-md shrink-0 ${
      loc.isHub ? "border-red-500" : "border-[#1B6E1B]"
    }`}
  >
    <img
      src={getFlagUrl(loc.flag)}
      alt={`${loc.name} flag`}
      className="w-full h-full object-cover"
      loading="lazy"
      draggable={false}
    />
  </div>

  <span className="text-xs uppercase tracking-wider font-bold">
    {loc.name.replace(" (Hub)", "")}
  </span>
</div>

<span
  className={`absolute top-3.5 right-3 w-1.5 h-1.5 rounded-full ${
    loc.isHub ? "bg-red-500" : "bg-[#1B6E1B]"
  }`}
/>
                </button>
              ))}
            </div>
          </div>

          <div
            ref={containerRef}
            className="lg:col-span-7 w-full h-[500px] md:h-[650px] relative flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            <div className="absolute w-80 h-80 bg-[#1B6E1B]/15 rounded-full blur-[130px] pointer-events-none" />

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
              {LOCATIONS.map((loc, i) => (
                <div
                  key={`marker-${loc.name}`}
                  ref={(el) => {
                    markerRefs.current[i] = el;
                  }}
                  className="absolute top-0 left-0 flex flex-col items-center justify-center origin-center pointer-events-none will-change-transform"
                >
                  <div
                    className={`w-10 h-7 rounded-md overflow-hidden border-2 flex items-center justify-center shadow-lg bg-zinc-900/80 backdrop-blur-md ${
                      loc.isHub ? "border-red-500" : "border-[#1B6E1B]"
                    }`}
                  >
                    <img
                      src={getFlagUrl(loc.flag)}
                      alt={`${loc.name} flag`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>

                  <span className="mt-2 px-2.5 py-0.5 text-[11px] font-bold text-white bg-black/70 rounded-md backdrop-blur-md border border-white/10 tracking-wide whitespace-nowrap shadow-xl">
                    {loc.name.replace(" (Hub)", "")}
                  </span>
                </div>
              ))}
            </div>

            <canvas ref={canvasRef} className="w-full h-full block touch-none relative z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}