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
  { name: "Ethiopia (Hub)", lat: 9.0338,   lng: 38.7423,   isHub: true,  flag: "ET" },
  { name: "San Francisco",  lat: 37.7749,  lng: -122.4194, isHub: false, flag: "US" },
  { name: "Washington",     lat: 38.9072,  lng: -77.0369,  isHub: false, flag: "US" },
  { name: "Paris",          lat: 48.8566,  lng: 2.3522,    isHub: false, flag: "FR" },
  { name: "Frankfurt",      lat: 50.1109,  lng: 8.6821,    isHub: false, flag: "DE" },
  { name: "Singapore",      lat: 1.3521,   lng: 103.8198,  isHub: false, flag: "SG" },
  { name: "Tokyo",          lat: 35.6762,  lng: 139.6503,  isHub: false, flag: "JP" },
  { name: "China",          lat: 39.9042,  lng: 116.4074,  isHub: false, flag: "CN" },
  { name: "Denmark",        lat: 55.6761,  lng: 12.5683,   isHub: false, flag: "DK" },
  { name: "Germany",        lat: 52.5200,  lng: 13.4050,   isHub: false, flag: "DE" },
  { name: "Romania",        lat: 44.4268,  lng: 26.1025,   isHub: false, flag: "RO" },
  { name: "Saudi Arabia",   lat: 24.7136,  lng: 46.6753,   isHub: false, flag: "SA" },
  { name: "Yemen",          lat: 15.3694,  lng: 44.1910,   isHub: false, flag: "YE" },
  { name: "India",          lat: 20.5937,  lng: 78.9629,   isHub: false, flag: "IN" },
  { name: "Iran",           lat: 35.6892,  lng: 51.3890,   isHub: false, flag: "IR" },
  { name: "Iraq",           lat: 33.3152,  lng: 44.3661,   isHub: false, flag: "IQ" },
  { name: "Pakistan",       lat: 30.3753,  lng: 69.3451,   isHub: false, flag: "PK" },
  { name: "Azerbaijan",     lat: 40.4093,  lng: 49.8671,   isHub: false, flag: "AZ" },
  { name: "Bangladesh",     lat: 23.6850,  lng: 90.3563,   isHub: false, flag: "BD" },
  { name: "Taiwan",         lat: 23.6978,  lng: 120.9605,  isHub: false, flag: "TW" },
  { name: "South Korea",    lat: 37.5665,  lng: 126.9780,  isHub: false, flag: "KR" },
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
  const activeLocationRef = useRef<string>("Ethiopia (Hub)");

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

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
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
    const TARGET_GREEN = { r: 0x0f, g: 0x4a, b: 0x0f };

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
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          if (a === 0) continue;
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const saturation = max === 0 ? 0 : (max - min) / max;
          const isLand = saturation > 0.12 && !(b > r + 20 && b > g + 20);
          if (isLand) {
            data[i]     = TARGET_GREEN.r;
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
        color: loc.isHub ? 0xef4444 : 0xffffff,
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
          opacity: 0.7,
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
            const isActive = loc.name === activeLocationRef.current;
            const baseScale = 0.7 + dotProduct * 0.3;
            const scale = isActive ? baseScale * 1.55 : baseScale;
            const opacity = dotProduct > 0 ? 1 : (dotProduct + 0.15) / 0.15;
            marker.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
            marker.style.opacity = opacity.toString();
            marker.style.zIndex = isActive ? "50" : "10";
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
        (Array.isArray(pin.material) ? pin.material : [pin.material]).forEach((m) => m.dispose());
      });
      arcLines.forEach((arc) => {
        arc.geometry.dispose();
        (Array.isArray(arc.material) ? arc.material : [arc.material]).forEach((m) => m.dispose());
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
    activeLocationRef.current = name;

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
    <section className="relative w-full py-24 overflow-hidden border-t border-green-900" style={{ backgroundColor: "#1B6E1B" }}>
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Dark vignette edges */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.25) 100%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT PANEL */}
          <div className="lg:col-span-5 space-y-6 z-10">
            <span
              className="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full border inline-block"
              style={{
                color: "rgba(255,255,255,0.9)",
                backgroundColor: "rgba(255,255,255,0.12)",
                borderColor: "rgba(255,255,255,0.25)",
              }}
            >
              Global Presence
            </span>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Our Reach
            </h2>

            <p style={{ color: "rgba(255,255,255,0.75)" }} className="text-lg leading-relaxed">
              From our operational heartland in Ethiopia, we maintain key trading lines and
              logistical partnerships across major global hubs. Select a location to rotate the view.
            </p>

            {/* Scrollable location grid */}
            <div
              className="grid grid-cols-3 gap-2 pt-2 pr-1 overflow-y-auto"
              style={{ maxHeight: "420px" }}
            >
              {LOCATIONS.map((loc) => {
                const isActive = activeLocation === loc.name;
                return (
                  <button
                    key={loc.name}
                    onClick={() => handleLocationClick(loc.name, loc.lat, loc.lng)}
                    className="relative p-2.5 rounded-xl border text-left transition-all duration-300"
                    style={{
                      backgroundColor: isActive
                        ? "rgba(0,0,0,0.30)"
                        : "rgba(0,0,0,0.15)",
                      borderColor: isActive
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(255,255,255,0.18)",
                      boxShadow: isActive
                        ? "0 0 14px rgba(255,255,255,0.12)"
                        : "none",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {/* Flag */}
                    <div
                      className="w-8 h-5 rounded overflow-hidden border mb-1.5 shrink-0"
                      style={{
                        borderColor: loc.isHub
                          ? "rgba(239,68,68,0.8)"
                          : "rgba(255,255,255,0.35)",
                      }}
                    >
                      <img
                        src={getFlagUrl(loc.flag)}
                        alt={`${loc.name} flag`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>

                    {/* Name */}
                    <span
                      className="text-[10px] uppercase tracking-wide font-bold leading-tight block"
                      style={{ color: isActive ? "white" : "rgba(255,255,255,0.75)" }}
                    >
                      {loc.name.replace(" (Hub)", "")}
                    </span>

                    {/* Status dot */}
                    <span
                      className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: loc.isHub ? "#ef4444" : "rgba(255,255,255,0.5)" }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* GLOBE */}
          <div
            ref={containerRef}
            className="lg:col-span-7 w-full h-[500px] md:h-[650px] relative flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            {/* Glow */}
            <div
              className="absolute w-96 h-96 rounded-full blur-[150px] pointer-events-none"
              style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            />

            {/* Floating markers */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
              {LOCATIONS.map((loc, i) => {
                const isActiveMarker = activeLocation === loc.name;
                return (
                  <div
                    key={`marker-${loc.name}`}
                    ref={(el) => { markerRefs.current[i] = el; }}
                    className="absolute top-0 left-0 flex flex-col items-center justify-center origin-center pointer-events-none will-change-transform"
                    style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
                  >
                    {/* Glow ring behind flag for active marker */}
                    {isActiveMarker && (
                      <div
                        className="absolute rounded-lg pointer-events-none"
                        style={{
                          inset: "-5px",
                          background: loc.isHub
                            ? "rgba(239,68,68,0.35)"
                            : "rgba(255,255,255,0.22)",
                          boxShadow: loc.isHub
                            ? "0 0 18px 6px rgba(239,68,68,0.5)"
                            : "0 0 18px 6px rgba(255,255,255,0.35)",
                          borderRadius: "10px",
                          zIndex: -1,
                        }}
                      />
                    )}

                    <div
                      className="rounded overflow-hidden border-2 flex items-center justify-center shadow-lg"
                      style={{
                        width:  isActiveMarker ? "44px" : "36px",
                        height: isActiveMarker ? "30px" : "24px",
                        transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                        backgroundColor: "rgba(0,0,0,0.7)",
                        backdropFilter: "blur(6px)",
                        borderColor: loc.isHub
                          ? "#ef4444"
                          : isActiveMarker
                            ? "rgba(255,255,255,0.95)"
                            : "rgba(255,255,255,0.45)",
                        boxShadow: isActiveMarker
                          ? "0 2px 16px rgba(0,0,0,0.5)"
                          : "0 1px 6px rgba(0,0,0,0.3)",
                      }}
                    >
                      <img
                        src={getFlagUrl(loc.flag)}
                        alt={`${loc.name} flag`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                    <span
                      className="mt-1.5 px-2.5 py-0.5 font-bold rounded whitespace-nowrap shadow-xl tracking-wide"
                      style={{
                        fontSize: isActiveMarker ? "11px" : "10px",
                        transition: "font-size 0.3s ease, background-color 0.3s ease, border-color 0.3s ease",
                        color: "white",
                        backgroundColor: isActiveMarker ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.60)",
                        backdropFilter: "blur(6px)",
                        border: `1px solid ${isActiveMarker ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.10)"}`,
                      }}
                    >
                      {loc.name.replace(" (Hub)", "")}
                    </span>
                  </div>
                );
              })}
            </div>

            <canvas
              ref={canvasRef}
              className="w-full h-full block touch-none relative z-10"
            />
          </div>

        </div>
      </div>
    </section>
  );
}