import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Pin coordinates: [Lat, Lng]
const LOCATIONS = [
  { name: "Ethiopia (Hub)", lat: 9.0338, lng: 38.7423, isHub: true },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { name: "Washington D.C.", lat: 38.9072, lng: -77.0369 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
];

// Helper to convert Lat/Lng to 3D Vector3 space
const convertLatLngToVector3 = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.sin(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);

  return new THREE.Vector3(x, y, z);
};

export default function OurReachSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeLocation, setActiveLocation] = useState<string>("Ethiopia (Hub)");

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 280;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const globeRadius = 90;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // --- Create Holographic Dot Globe ---
    const dotCount = 3500;
    const dotGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(dotCount * 3);

    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * 2 * Math.PI;

      positions[i * 3] = globeRadius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = globeRadius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = globeRadius * Math.cos(phi);
    }

    dotGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dotMaterial = new THREE.PointsMaterial({
      color: 0x4ade80, // Tailwind green-400
      size: 1.5,
      transparent: true,
      opacity: 0.35,
    });
    const globeDots = new THREE.Points(dotGeometry, dotMaterial);
    globeGroup.add(globeDots);

    // Subtle inner wireframe sphere for depth
    const sphereGeo = new THREE.SphereGeometry(globeRadius - 1, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x1f2937,
      transparent: true,
      opacity: 0.1,
      wireframe: true,
    });
    const innerSphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(innerSphere);

    // --- Place Pins and Arcs ---
    const hubLoc = LOCATIONS.find((l) => l.isHub)!;
    const hubVector = convertLatLngToVector3(hubLoc.lat, hubLoc.lng, globeRadius);

    LOCATIONS.forEach((loc) => {
      const destVector = convertLatLngToVector3(loc.lat, loc.lng, globeRadius);

      // Pin Mesh
      const pinGeo = new THREE.SphereGeometry(loc.isHub ? 2.5 : 1.8, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: loc.isHub ? 0xef4444 : 0x3b82f6, // Red for hub, Blue for reach
      });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(destVector);
      globeGroup.add(pin);

      // Draw dynamic arcs connecting Ethiopia to the world
      if (!loc.isHub) {
        // Calculate mid-point and pull it outward to create a 3D arc curve
        const midPoint = new THREE.Vector3().addVectors(hubVector, destVector).multiplyScalar(0.5);
        const distance = hubVector.distanceTo(destVector);
        midPoint.normalize().multiplyScalar(globeRadius + distance * 0.25);

        const curve = new THREE.QuadraticBezierCurve3(hubVector, midPoint, destVector);
        const points = curve.getPoints(30);
        const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
        
        const arcMat = new THREE.LineBasicMaterial({
          color: 0x4ade80,
          transparent: true,
          opacity: 0.6,
        });
        const arc = new THREE.Line(arcGeo, arcMat);
        globeGroup.add(arc);
      }
    });

    // Tilt the globe slightly for a better cinematic angle
    globeGroup.rotation.x = 0.3;
    globeGroup.rotation.y = 3.5;

    // --- Interaction Handling ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0.3;
    let targetRotationY = 3.5;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = (event.clientX - rect.left) - rect.width / 2;
      mouseY = (event.clientY - rect.top) - rect.height / 2;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // --- Animation Loop ---
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Slow constant auto-rotation
      targetRotationY += 0.0015;

      // Add elegant parallax based on mouse movement
      const smoothRotationY = targetRotationY + mouseX * 0.0005;
      const smoothRotationX = targetRotationX + mouseY * 0.0005;

      globeGroup.rotation.y += (smoothRotationY - globeGroup.rotation.y) * 0.05;
      globeGroup.rotation.x += (smoothRotationX - globeGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // --- Responsive Resize ---
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      
      // Memory cleanup
      dotGeometry.dispose();
      dotMaterial.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative w-full py-24 bg-zinc-950 text-white overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Copy Side */}
          <div className="lg:col-span-5 space-y-6 z-10">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-medium bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Global Footprint
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Our Reach
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              From our operational heartland in Ethiopia, we maintain key trading lines, quality analysis nodes, and logistics partnerships across major financial and consumer hubs globally.
            </p>

            {/* Location Navigation Cards */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.name}
                  onMouseEnter={() => setActiveLocation(loc.name)}
                  className={`p-3 rounded-xl border text-left transition-all duration-300 backdrop-blur-md ${
                    activeLocation === loc.name
                      ? "bg-zinc-900 border-emerald-500/40 shadow-[0_0_15px_rgba(74,222,128,0.1)] text-white"
                      : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${loc.isHub ? 'bg-red-500' : 'bg-blue-500'}`} />
                    <span className="text-sm font-medium">{loc.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Globe Canvas Container */}
          <div 
            ref={containerRef} 
            className="lg:col-span-7 w-full h-[450px] md:h-[550px] relative flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            {/* Subtle glow background behind the canvas */}
            <div className="absolute w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            <canvas ref={canvasRef} className="w-full h-full block touch-none" />
          </div>

        </div>
      </div>
    </section>
  );
}