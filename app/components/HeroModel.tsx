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

      // Gaze & Head Follow Cursor:
      // Yaw (Y axis): head turns horizontally toward cursor
      // Pitch (X axis): head tilts vertically up/down toward cursor
      // Roll (Z axis): subtle natural head tilt
      targetRotation.current = {
        x: -normY * 0.40,
        y: normX * 0.60,
        z: -normX * 0.08,
      };
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleWindowMouseMove);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any stale canvas from hot reload / strict mode
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // 1. SCENE SETUP
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. NATURAL STUDIO LIGHTING (Preserves full texture colors, eyes, skin & clothing)
    // Ambient light: Clear illumination across all surfaces
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    // Key light: Crisp frontal directional light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(2.0, 3.0, 3.5);
    scene.add(keyLight);

    // Fill light: Soft fill from the opposite side
    const fillLight = new THREE.DirectionalLight(0xfff8ee, 1.8);
    fillLight.position.set(-2.0, 1.2, 2.5);
    scene.add(fillLight);

    // Overhead hair and shoulder light
    const topLight = new THREE.DirectionalLight(0xffffff, 1.4);
    topLight.position.set(0, 4.0, 1.0);
    scene.add(topLight);

    // Subtle golden rim (LIC gold accent)
    const goldRim = new THREE.DirectionalLight(0xf59e0b, 1.8);
    goldRim.position.set(3.0, -1.0, -2.0);
    scene.add(goldRim);

    // Subtle cyan rim (LIC sovereign cyan accent)
    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 1.8);
    cyanRim.position.set(-3.0, 1.0, -2.0);
    scene.add(cyanRim);

    // Dynamic cursor point light (creates live specular eye reflections looking at the cursor)
    const eyeGlintLight = new THREE.PointLight(0xffffff, 3.5, 8, 1.0);
    eyeGlintLight.position.set(0, 0, 2.8);
    scene.add(eyeGlintLight);

    // 3. MODEL PIVOT GROUP
    const modelPivot = new THREE.Group();
    scene.add(modelPivot);

    // 4. LOAD GLB MODEL (Supports public/3d model/ and fallback paths)
    const loader = new GLTFLoader();
    const candidatePaths = [
      "/3d%20model/New_Project_10202026.glb",
      "/models/New_Project_10202026.glb",
      "/3d model/New_Project_10202026.glb",
    ];

    const tryLoad = (idx: number) => {
      if (idx >= candidatePaths.length) {
        console.error("Failed to load 3D GLB model from all paths.");
        return;
      }

      loader.load(
        candidatePaths[idx],
        (gltf) => {
          const root = gltf.scene;

          root.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              // Compute vertex normals for smooth organic lighting
              mesh.geometry.computeVertexNormals();

              // Preserve original texture and material
              if (mesh.material) {
                const materials = Array.isArray(mesh.material)
                  ? mesh.material
                  : [mesh.material];

                materials.forEach((mat) => {
                  mat.needsUpdate = true;
                  if ("roughness" in mat) {
                    (mat as THREE.MeshStandardMaterial).roughness = 0.6;
                  }
                  if ("metalness" in mat) {
                    (mat as THREE.MeshStandardMaterial).metalness = 0.05;
                  }
                });
              }
            }
          });

          // Compute bounding box and center precisely at origin
          const box = new THREE.Box3().setFromObject(root);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDimension = Math.max(size.x, size.y, size.z);

          // Elegant center scaling (smaller, beautifully occupying the center of the hero section)
          const targetHeight = 1.25;
          const scale = targetHeight / maxDimension;
          root.scale.setScalar(scale);

          // Center geometry in pivot group with subtle vertical alignment
          root.position.x = -center.x * scale;
          root.position.y = -center.y * scale - 0.02;
          root.position.z = -center.z * scale;

          modelPivot.add(root);
          setLoaded(true);
        },
        undefined,
        () => {
          tryLoad(idx + 1);
        }
      );
    };

    tryLoad(0);

    // 5. RESIZE HANDLING
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

    // 6. ANIMATION LOOP (Smooth head and eye cursor tracking)
    let animationFrameId: number;

    const animate = () => {
      // Lerp easing for natural weight
      const lerp = 0.08;

      currentRotation.current.x +=
        (targetRotation.current.x - currentRotation.current.x) * lerp;
      currentRotation.current.y +=
        (targetRotation.current.y - currentRotation.current.y) * lerp;
      currentRotation.current.z +=
        (targetRotation.current.z - currentRotation.current.z) * lerp;

      // Apply rotation to head/bust
      modelPivot.rotation.x = currentRotation.current.x;
      modelPivot.rotation.y = currentRotation.current.y;
      modelPivot.rotation.z = currentRotation.current.z;

      // Subtle parallax translation
      const targetX = mouseCoords.current.x * 0.16;
      const targetY = mouseCoords.current.y * 0.10;
      modelPivot.position.x += (targetX - modelPivot.position.x) * 0.05;
      modelPivot.position.y += (targetY - modelPivot.position.y) * 0.05;

      // Move point light to cast eye reflection toward cursor
      eyeGlintLight.position.x = mouseCoords.current.x * 2.8;
      eyeGlintLight.position.y = mouseCoords.current.y * 2.4 + 0.2;

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
      className={`pointer-events-none absolute inset-0 z-[20] flex items-center justify-center transition-opacity duration-700 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
