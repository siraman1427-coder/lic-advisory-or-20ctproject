"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface HeroModelProps {
  cursorPosition?: { x: number; y: number };
}

export default function HeroModel({ cursorPosition }: HeroModelProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Normalized mouse coordinates (-1 to 1)
  const mouseCoords = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0, z: 0 });
  const currentRotation = useRef({ x: 0, y: 0, z: 0 });

  // Update target rotation coordinates when cursor moves
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      mouseCoords.current = { x: normX, y: normY };

      // Head & eye tracking rotation:
      // Y-axis = horizontal gaze (yaw) -> follows cursor left/right
      // X-axis = vertical gaze (pitch) -> follows cursor up/down
      // Z-axis = natural subtle head tilt (roll)
      targetRotation.current = {
        x: -normY * 0.42,
        y: normX * 0.62,
        z: -normX * 0.08,
      };
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleWindowMouseMove);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE & CAMERA SETUP
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    container.appendChild(renderer.domElement);

    // 2. STUDIO SCULPTURE LIGHTING (Curated to illuminate facial contours, eyes & head)
    // Ambient light: Soft fill to prevent harsh shadows
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key light: Warm radiant studio light sculpting the face from top-right
    const keyLight = new THREE.DirectionalLight(0xfff6ea, 3.8);
    keyLight.position.set(2.8, 3.5, 3.2);
    scene.add(keyLight);

    // Cyan Rim light: Electric cyan rim highlighting the jawline & ear from back-left
    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 4.2);
    cyanRim.position.set(-3.2, 2.8, -2.5);
    scene.add(cyanRim);

    // Gold Rim light: Radiant sovereign gold highlighting the right silhouette
    const goldRim = new THREE.DirectionalLight(0xf59e0b, 3.0);
    goldRim.position.set(3.2, -1.8, -2.0);
    scene.add(goldRim);

    // Soft frontal bounce fill light
    const frontFill = new THREE.DirectionalLight(0xdde5f0, 1.6);
    frontFill.position.set(0, -2.5, 2.5);
    scene.add(frontFill);

    // Dynamic point light that follows the cursor: creates living eye reflections & face highlights
    const eyeGlintLight = new THREE.PointLight(0xfffaec, 4.2, 9, 1.1);
    eyeGlintLight.position.set(0, 0, 2.8);
    scene.add(eyeGlintLight);

    // 3. MODEL PIVOT GROUP (Rotates and tracks cursor)
    const modelPivot = new THREE.Group();
    scene.add(modelPivot);

    // 4. LOAD GLB MODEL (Supports primary and fallback paths)
    const loader = new GLTFLoader();
    const modelPaths = [
      "/models/New_Project_10202026.glb",
      "/3d%20model/New_Project_10202026.glb",
      "/3d model/New_Project_10202026.glb",
    ];

    const loadModel = (index: number) => {
      if (index >= modelPaths.length) {
        console.error("All GLB paths failed to load.");
        return;
      }

      loader.load(
        modelPaths[index],
        (gltf) => {
          const root = gltf.scene;

          root.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.geometry.computeVertexNormals();

              // High-end alabaster / titanium sculpture material with crisp specular reflections
              mesh.material = new THREE.MeshPhysicalMaterial({
                color: new THREE.Color(0xdce2ec),
                roughness: 0.32,
                metalness: 0.16,
                clearcoat: 0.75,
                clearcoatRoughness: 0.18,
                reflectivity: 0.88,
              });
            }
          });

          // Compute precise bounding box to center geometry
          const box = new THREE.Box3().setFromObject(root);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDimension = Math.max(size.x, size.y, size.z);

          // Monumental center scaling
          const scale = 2.15 / maxDimension;
          root.scale.setScalar(scale);

          // Center geometry directly inside the pivot group
          root.position.x = -center.x * scale;
          root.position.y = -center.y * scale - 0.04;
          root.position.z = -center.z * scale;

          modelPivot.add(root);
          setLoaded(true);
        },
        undefined,
        () => {
          // Try next fallback path
          loadModel(index + 1);
        }
      );
    };

    loadModel(0);

    // 5. RESIZE OBSERVER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 6. ANIMATION LOOP WITH LERP SMOOTHING
    let animationFrameId: number;

    const animate = () => {
      // Smooth lerp easing for head and eye motion
      const lerpFactor = 0.075;

      currentRotation.current.x +=
        (targetRotation.current.x - currentRotation.current.x) * lerpFactor;
      currentRotation.current.y +=
        (targetRotation.current.y - currentRotation.current.y) * lerpFactor;
      currentRotation.current.z +=
        (targetRotation.current.z - currentRotation.current.z) * lerpFactor;

      // Apply rotation to model pivot so the head & eyes follow cursor
      modelPivot.rotation.x = currentRotation.current.x;
      modelPivot.rotation.y = currentRotation.current.y;
      modelPivot.rotation.z = currentRotation.current.z;

      // Subtle parallax translation gives 3D depth
      const targetPosX = mouseCoords.current.x * 0.18;
      const targetPosY = mouseCoords.current.y * 0.12;
      modelPivot.position.x += (targetPosX - modelPivot.position.x) * 0.05;
      modelPivot.position.y += (targetPosY - modelPivot.position.y) * 0.05;

      // Cursor eye-glint light follows cursor
      eyeGlintLight.position.x = mouseCoords.current.x * 3.2;
      eyeGlintLight.position.y = mouseCoords.current.y * 2.8 + 0.3;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 z-[15] flex items-center justify-center transition-opacity duration-1000 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
