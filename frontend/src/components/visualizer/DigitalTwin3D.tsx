import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  Sun, 
  Camera,
  Info
} from 'lucide-react';

interface DigitalTwin3DProps {
  shelterArea?: number;
  orientationDeg?: number;
  wallInsulationMm?: number;
  activeLayer?: string;
  sunHour?: number;
  height?: string;
}

export const DigitalTwin3D: React.FC<DigitalTwin3DProps> = ({
  shelterArea = 45,
  sunHour = 12,
  height = '500px'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [selectedView, setSelectedView] = useState<'iso' | 'front' | 'top' | 'side'>('iso');
  const [currentSunHour, setCurrentSunHour] = useState(sunHour);
  const [showInfo, setShowInfo] = useState(false);

  // References for three.js cleanup
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const buildingGroupRef = useRef<THREE.Group | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Dimensions
    const width = mountRef.current.clientWidth;
    const heightPx = mountRef.current.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f4f8); // Light mountain sky color
    scene.fog = new THREE.FogExp2(0xf0f4f8, 0.025);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 1000);
    camera.position.set(12, 9, 14);
    camera.lookAt(0, 1.5, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 1.8);
    sunLight.position.set(10, 15, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -10;
    sunLight.shadow.camera.right = 10;
    sunLight.shadow.camera.top = 10;
    sunLight.shadow.camera.bottom = -10;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // 5. Ground / Snowy Terrain
    const groundGeo = new THREE.PlaneGeometry(50, 50, 32, 32);
    const groundMat = new THREE.MeshStandardMaterial({ 
      color: 0xe8eef5, 
      roughness: 0.9,
      metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Distant mountain peaks
    const mountainGroup = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const coneGeo = new THREE.ConeGeometry(5 + Math.random() * 4, 8 + Math.random() * 6, 5);
      const coneMat = new THREE.MeshStandardMaterial({ color: 0xc9d7e8, roughness: 0.9 });
      const peak = new THREE.Mesh(coneGeo, coneMat);
      const angle = (i / 8) * Math.PI * 2;
      const radius = 22 + Math.random() * 5;
      peak.position.set(Math.cos(angle) * radius, (coneGeo.parameters.height / 2) - 1, Math.sin(angle) * radius);
      mountainGroup.add(peak);
    }
    scene.add(mountainGroup);

    // 6. Passive Shelter Building Model Group
    const buildingGroup = new THREE.Group();
    buildingGroupRef.current = buildingGroup;

    // Dimensions derived from area
    const bLength = Math.sqrt(shelterArea * 1.5);
    const bWidth = Math.sqrt(shelterArea / 1.5);
    const bHeight = 3.0;

    // Thermal Mass Stone Plinth Foundation
    const plinthGeo = new THREE.BoxGeometry(bLength + 0.6, 0.4, bWidth + 0.6);
    const plinthMat = new THREE.MeshStandardMaterial({ color: 0x4a5568, roughness: 0.8 });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.y = 0.2;
    plinth.receiveShadow = true;
    plinth.castShadow = true;
    buildingGroup.add(plinth);

    // Main Insulated Timber / Rammed Earth Walls
    const wallGeo = new THREE.BoxGeometry(bLength, bHeight, bWidth);
    const wallMat = new THREE.MeshStandardMaterial({ 
      color: 0x8b5a2b, // Warm Ladakhi Rammed Earth / Timber
      roughness: 0.7,
      metalness: 0.1
    });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.y = (bHeight / 2) + 0.4;
    wall.castShadow = true;
    wall.receiveShadow = true;
    buildingGroup.add(wall);

    // South Glazing Facade (Large Double Glazed Windows)
    const windowGroup = new THREE.Group();
    const winWidth = bLength * 0.7;
    const winHeight = bHeight * 0.65;
    const winGeo = new THREE.PlaneGeometry(winWidth, winHeight);
    const winMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.55,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.9,
      ior: 1.5
    });
    const southWindow = new THREE.Mesh(winGeo, winMat);
    southWindow.position.set(0, (bHeight / 2) + 0.4, (bWidth / 2) + 0.01);
    windowGroup.add(southWindow);

    // Solar Shading Overhang Louver above South Window
    const overhangGeo = new THREE.BoxGeometry(winWidth + 0.6, 0.1, 0.9);
    const overhangMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 });
    const overhang = new THREE.Mesh(overhangGeo, overhangMat);
    overhang.position.set(0, (bHeight / 2) + 0.4 + (winHeight / 2) + 0.1, (bWidth / 2) + 0.45);
    overhang.castShadow = true;
    windowGroup.add(overhang);
    buildingGroup.add(windowGroup);

    // Pitched Roof with Integrated Solar Panels
    const roofGroup = new THREE.Group();
    const roofGeo = new THREE.ConeGeometry(Math.max(bLength, bWidth) * 0.75, 1.6, 4);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.y = bHeight + 0.4 + 0.8;
    roof.scale.set(bLength / Math.max(bLength, bWidth), 1, bWidth / Math.max(bLength, bWidth));
    roof.castShadow = true;
    roofGroup.add(roof);

    // Solar PV Array on South Pitch
    const pvGeo = new THREE.PlaneGeometry(bLength * 0.7, 1.2);
    const pvMat = new THREE.MeshStandardMaterial({ 
      color: 0x0369a1, 
      roughness: 0.2, 
      metalness: 0.8 
    });
    const pvArray = new THREE.Mesh(pvGeo, pvMat);
    pvArray.position.set(0, bHeight + 0.4 + 0.8, (bWidth / 3));
    pvArray.rotation.x = -Math.PI / 4;
    roofGroup.add(pvArray);
    buildingGroup.add(roofGroup);

    scene.add(buildingGroup);

    // 7. Animation Loop & Orbit
    let animationFrameId: number;
    let currentAngle = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isAutoRotate && buildingGroupRef.current) {
        currentAngle += 0.005;
        buildingGroupRef.current.rotation.y = currentAngle;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [shelterArea]);

  // Update Sun Position based on Hour Slider
  useEffect(() => {
    if (!sunLightRef.current) return;
    const hourAngle = ((currentSunHour - 6) / 12) * Math.PI; // 6am to 6pm
    const sunX = Math.cos(hourAngle) * 16;
    const sunY = Math.sin(hourAngle) * 16;
    const sunZ = 10;
    sunLightRef.current.position.set(sunX, Math.max(sunY, 1), sunZ);
  }, [currentSunHour]);

  // Camera View Angle Switcher
  const setCameraView = (view: 'iso' | 'front' | 'top' | 'side') => {
    setSelectedView(view);
    setIsAutoRotate(false);
    if (!cameraRef.current || !buildingGroupRef.current) return;

    buildingGroupRef.current.rotation.y = 0;

    if (view === 'iso') {
      cameraRef.current.position.set(12, 9, 14);
    } else if (view === 'front') {
      cameraRef.current.position.set(0, 3, 16);
    } else if (view === 'top') {
      cameraRef.current.position.set(0, 18, 0.1);
    } else if (view === 'side') {
      cameraRef.current.position.set(16, 3, 0);
    }
    cameraRef.current.lookAt(0, 1.5, 0);
  };

  // Snapshot capture
  const handleSnapshot = () => {
    if (!rendererRef.current) return;
    const dataURL = rendererRef.current.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `climashelter_3d_twin_${Date.now()}.png`;
    link.href = dataURL;
    link.click();
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#E2E8F0] bg-slate-900 shadow-md">
      {/* 3D WebGL Canvas Mount Container */}
      <div 
        ref={mountRef} 
        style={{ height }}
        className="w-full relative cursor-grab active:cursor-grabbing"
      />

      {/* Top Floating Overlay Toolbar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/60 shadow-xs pointer-events-auto flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-[#0B2559]">3D Digital Twin</span>
          <span className="text-[10px] text-[#64748B] font-mono">Leh, Ladakh Geo-Twin</span>
        </div>

        {/* View Angles Selector */}
        <div className="bg-white/90 backdrop-blur-md p-1 rounded-xl border border-white/60 shadow-xs pointer-events-auto flex items-center space-x-1">
          {[
            { id: 'iso', label: 'Isometric' },
            { id: 'front', label: 'South (Glazing)' },
            { id: 'top', label: 'Plan View' },
            { id: 'side', label: 'West Elevation' },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setCameraView(v.id as any)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedView === v.id
                  ? 'bg-[#0B2559] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#0B2559] hover:bg-slate-100'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Floating Control Bar (matching wireframe Rotate, View, Layers, Share) */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
        
        {/* Sun Angle Simulator Slider */}
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/60 shadow-xs pointer-events-auto flex items-center space-x-3 w-full sm:w-auto">
          <Sun className="w-4 h-4 text-[#F28C28]" />
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold text-[#0B2559]">Winter Sun Path:</span>
            <input 
              type="range" 
              min="8" 
              max="16" 
              step="1"
              value={currentSunHour} 
              onChange={(e) => setCurrentSunHour(Number(e.target.value))}
              className="w-24 accent-[#F28C28]"
            />
            <span className="text-[11px] font-mono font-bold text-[#F28C28]">{currentSunHour}:00</span>
          </div>
        </div>

        {/* Action Tools */}
        <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-xl border border-white/60 shadow-xs pointer-events-auto flex items-center space-x-2">
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              isAutoRotate ? 'bg-[#2563A9] text-white' : 'bg-slate-100 text-[#64748B] hover:bg-slate-200'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{isAutoRotate ? 'Rotating' : 'Rotate'}</span>
          </button>

          <button
            onClick={handleSnapshot}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#172033] transition-colors cursor-pointer"
            title="Download 3D Snapshot"
          >
            <Camera className="w-3.5 h-3.5 text-[#2563A9]" />
            <span>Capture</span>
          </button>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-1.5 rounded-lg text-[#64748B] hover:bg-slate-100 transition-colors cursor-pointer"
            title="Layer Details"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info Popup if toggled */}
      {showInfo && (
        <div className="absolute top-16 right-4 w-72 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#E2E8F0] shadow-xl text-xs space-y-2 z-20">
          <h4 className="font-bold text-[#0B2559]">Digital Twin Specifications</h4>
          <p className="text-[11px] text-[#64748B]">
            • <strong>South Glazing:</strong> High-SHGC double glazing captures low winter solar angles.
          </p>
          <p className="text-[11px] text-[#64748B]">
            • <strong>Overhang:</strong> Custom 0.9m louver shades high summer sun while allowing 92% winter radiation.
          </p>
          <p className="text-[11px] text-[#64748B]">
            • <strong>Thermal Base:</strong> 400mm granite stone plinth anchors heat storage.
          </p>
        </div>
      )}
    </div>
  );
};
