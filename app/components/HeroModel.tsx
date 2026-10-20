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

  // Mouse coords normalized (-1 to 1)
  const mouseCoords = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0, z: 0 });
  const currentRotation = useRef({ x: 0, y: 0, z: 0 });

  // Update target coordinates when cursor moves
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      mouseCoords.current = { x: normX, y: normY };

      // Set target rotation angles (eyes and head look at cursor)
      // Y-axis = horizontal gaze (yaw)
      // X-axis = vertical gaze (pitch)
      // Z-axis = subtle natural head tilt (roll)
      targetRotation.current = {
        x: -normY * 0.4,
        y: normX * 0.65,
        z: -normX * 0.08,
      };
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleWindowMouseMove);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // LIGHTING: Premium editorial sculpture illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Key light (soft warm white)
    const keyLight = new THREE.DirectionalLight(0xfffaf0, 2.8);
    keyLight.position.set(2.5, 3.5, 3.0);
    scene.add(keyLight);

    // Rim light (ethereal cold blue-white to sculpt silhouette against pure black)
    const rimLight = new THREE.DirectionalLight(0xaad4ff, 3.5);
    rimLight.position.set(-3, 2.5, -2.5);
    scene.add(rimLight);

    // Bottom bounce fill light
    const bounceLight = new THREE.DirectionalLight(0x445566, 0.9);
    bounceLight.position.set(0, -3, 2);
    scene.add(bounceLight);

    // Dynamic point light that follows cursor to create gleam in eyes & face contours
    const eyeGleamLight = new THREE.PointLight(0xfff0dd, 3.2, 10, 1.2);
    eyeGleamLight.position.set(0, 0, 3.5);
    scene.add(eyeGleamLight);

    // MODEL PIVOT GROUP
    const modelPivot = new THREE.Group();
    scene.add(modelPivot);

    let activeMesh: THREE.Mesh | null = null;
    let baseModelRotationY = 0;

    // LOAD GLB MODEL
    const loader = new GLTFLoader();
    const modelPath = "/3d%20model/New_Project_10202026.glb";

    loader.load(
      modelPath,
      (gltf) => {
        const root = gltf.scene;

        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            activeMesh = mesh;

            // Generate clean vertex normals
            mesh.geometry.computeVertexNormals();

            // Editorial dark obsidian / marble material with subtle clearcoat
            mesh.material = new THREE.MeshPhysicalMaterial({
              color: new THREE.Color(0x1a1b20),
              roughness: 0.32,
              metalness: 0.18,
              clearcoat: 0.6,
              clearcoatRoughness: 0.2,
              reflectivity: 0.85,
            });
          }
        });

        // Compute bounding box and center precisely
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);

        // Responsive scale (fills center majestically)
        const scale = 2.45 / maxDimension;
        root.scale.setScalar(scale);

        // Center model geometry inside the pivot group
        root.position.x = -center.x * scale;
        root.position.y = -center.y * scale - 0.05;
        root.position.z = -center.z * scale;

        modelPivot.add(root);
        setLoaded(true);
      },
      undefined,
      (err) => {
        console.error("Error loading GLB model:", err);
      }
    );

    // RESIZE OBSERVER
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

    // ANIMATION & CURSOR TRACKING LOOP
    let animationFrameId: number;

    const animate = () => {
      // Smooth lerp easing for head and eye rotation
      const lerpFactor = 0.075;

      currentRotation.current.x +=
        (targetRotation.current.x - currentRotation.current.x) * lerpFactor;
      currentRotation.current.y +=
        (targetRotation.current.y - currentRotation.current.y) * lerpFactor;
      currentRotation.current.z +=
        (targetRotation.current.z - currentRotation.current.z) * lerpFactor;

      // Apply rotation to model pivot so the head/eyes follow the cursor
      modelPivot.rotation.x = currentRotation.current.x;
      modelPivot.rotation.y = baseModelRotationY + currentRotation.current.y;
      modelPivot.rotation.z = currentRotation.current.z;

      // Subtle parallax position drift (adds organic depth)
      modelPivot.position.x +=
        (mouseCoords.current.x * 0.12 - modelPivot.position.x) * 0.05;
      modelPivot.position.y +=
        (mouseCoords.current.y * 0.08 - modelPivot.position.y) * 0.05;

      // Cursor eye-gleam dynamic light
      eyeGleamLight.position.x = mouseCoords.current.x * 3.5;
      eyeGleamLight.position.y = mouseCoords.current.y * 3.5 + 0.5;

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
      className={`pointer-events-none absolute inset-0 z-[12] flex items-center justify-center transition-opacity duration-1000 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
