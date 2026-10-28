import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Three3DBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return false;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0f19, 0.038);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 120);
    camera.position.set(0, 0, 18);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // 3. Vibrant 5-Point Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0f172a, 0.9);
    scene.add(ambientLight);

    const lightCyan = new THREE.PointLight(0x00f0ff, 5.0, 35);
    lightCyan.position.set(-10, 6, 5);
    scene.add(lightCyan);

    const lightBlue = new THREE.PointLight(0x3b82f6, 4.5, 30);
    lightBlue.position.set(0, -8, 6);
    scene.add(lightBlue);

    const lightEmerald = new THREE.PointLight(0x10b981, 4.5, 32);
    lightEmerald.position.set(10, -5, 4);
    scene.add(lightEmerald);

    const lightViolet = new THREE.PointLight(0xa855f7, 4.0, 28);
    lightViolet.position.set(-4, 9, -2);
    scene.add(lightViolet);

    const lightAmber = new THREE.PointLight(0xf59e0b, 3.5, 25);
    lightAmber.position.set(6, 8, 3);
    scene.add(lightAmber);

    // 4. Group for all floating 3D geometry
    const sceneObjects = new THREE.Group();
    scene.add(sceneObjects);

    // --- REUSABLE GEOMETRIES & MATERIALS ---
    const icosaGeo = new THREE.IcosahedronGeometry(1.4, 0);
    const octaGeo = new THREE.OctahedronGeometry(1.6, 0);
    const dodecaGeo = new THREE.DodecahedronGeometry(1.3, 0);
    const tetraGeo = new THREE.TetrahedronGeometry(0.9, 0);
    const torusKnotGeo = new THREE.TorusKnotGeometry(1.1, 0.28, 64, 16);
    const boxGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);

    // Shaders / Materials in rich luminous colors
    const blueGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x2563eb,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.4,
      metalness: 0.85,
      roughness: 0.15,
      transmission: 0.6,
      transparent: true,
      opacity: 0.8
    });

    const cyanGlowMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.55
    });

    const emeraldGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x059669,
      emissive: 0x047857,
      emissiveIntensity: 0.45,
      metalness: 0.8,
      roughness: 0.2,
      transmission: 0.55,
      transparent: true,
      opacity: 0.8
    });

    const emeraldWireMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });

    const violetGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x7c3aed,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.5,
      metalness: 0.85,
      roughness: 0.18,
      transmission: 0.65,
      transparent: true,
      opacity: 0.8
    });

    const violetWireMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0xb45309,
      emissiveIntensity: 0.25
    });

    // --- 3D CLUSTER 1: LEFT CELESTIAL SILICON CORE ---
    // Main Blue Icosahedron
    const meshLeftCore = new THREE.Mesh(icosaGeo, blueGlassMat);
    const meshLeftCoreWire = new THREE.Mesh(icosaGeo, cyanGlowMat);
    meshLeftCore.position.set(-12, 3.5, -4);
    meshLeftCoreWire.position.copy(meshLeftCore.position);
    sceneObjects.add(meshLeftCore);
    sceneObjects.add(meshLeftCoreWire);

    // Left Gimbal Ring 1 (Cyan)
    const ringGeo1 = new THREE.TorusGeometry(2.6, 0.04, 16, 72);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.65 });
    const ringLeft1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringLeft1.position.copy(meshLeftCore.position);
    ringLeft1.rotation.x = Math.PI / 3;
    sceneObjects.add(ringLeft1);

    // Left Gimbal Ring 2 (Violet)
    const ringGeo2 = new THREE.TorusGeometry(3.1, 0.03, 16, 72);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.55 });
    const ringLeft2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringLeft2.position.copy(meshLeftCore.position);
    ringLeft2.rotation.y = Math.PI / 4;
    sceneObjects.add(ringLeft2);

    // Floating Satellite Tetrahedrons
    const sat1 = new THREE.Mesh(tetraGeo, goldMat);
    sat1.position.set(-15, 6.5, -2);
    sceneObjects.add(sat1);

    const sat2 = new THREE.Mesh(boxGeo, violetGlassMat);
    sat2.position.set(-9, 0.5, -3);
    sceneObjects.add(sat2);

    // --- 3D CLUSTER 2: RIGHT EMERALD HARDWARE CORE ---
    // Main Emerald Octahedron
    const meshRightCore = new THREE.Mesh(octaGeo, emeraldGlassMat);
    const meshRightCoreWire = new THREE.Mesh(octaGeo, emeraldWireMat);
    meshRightCore.position.set(13, -2.5, -5);
    meshRightCoreWire.position.copy(meshRightCore.position);
    sceneObjects.add(meshRightCore);
    sceneObjects.add(meshRightCoreWire);

    // Right Orbital Ring 1 (Emerald)
    const ringGeo3 = new THREE.TorusGeometry(2.8, 0.035, 16, 72);
    const ringMat3 = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.65 });
    const ringRight1 = new THREE.Mesh(ringGeo3, ringMat3);
    ringRight1.position.copy(meshRightCore.position);
    ringRight1.rotation.x = Math.PI / 2.5;
    sceneObjects.add(ringRight1);

    // Right Orbital Ring 2 (Amber Gold)
    const ringGeo4 = new THREE.TorusGeometry(3.3, 0.025, 16, 72);
    const ringMat4 = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.5 });
    const ringRight2 = new THREE.Mesh(ringGeo4, ringMat4);
    ringRight2.position.copy(meshRightCore.position);
    ringRight2.rotation.y = Math.PI / 3;
    sceneObjects.add(ringRight2);

    // Right Floating Dodecahedron Satellite
    const sat3 = new THREE.Mesh(dodecaGeo, blueGlassMat);
    sat3.position.set(16, 2.5, -6);
    sceneObjects.add(sat3);

    const sat4 = new THREE.Mesh(boxGeo, goldMat);
    sat4.position.set(10, -6.5, -3);
    sceneObjects.add(sat4);

    // --- 3D CLUSTER 3: TOP CYBER METALLIC TORUS KNOT ---
    const torusKnotMesh = new THREE.Mesh(torusKnotGeo, violetGlassMat);
    const torusKnotWire = new THREE.Mesh(torusKnotGeo, violetWireMat);
    torusKnotMesh.position.set(3, 8.5, -6);
    torusKnotWire.position.copy(torusKnotMesh.position);
    sceneObjects.add(torusKnotMesh);
    sceneObjects.add(torusKnotWire);

    // Floating Prism in Upper Left
    const upperPrism = new THREE.Mesh(octaGeo, goldMat);
    upperPrism.scale.setScalar(0.65);
    upperPrism.position.set(-4, 7.5, -5);
    sceneObjects.add(upperPrism);

    // --- 3D UNDULATING CYBER WIREFRAME GROUND WAVE ---
    const gridCols = 45;
    const gridRows = 45;
    const planeGeo = new THREE.PlaneGeometry(60, 50, gridCols - 1, gridRows - 1);
    planeGeo.rotateX(-Math.PI / 2.2);
    planeGeo.translate(0, -9.5, -8);

    const planeMat = new THREE.MeshStandardMaterial({
      color: 0x091426,
      emissive: 0x07152b,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.25,
      wireframe: true
    });
    const terrainMesh = new THREE.Mesh(planeGeo, planeMat);
    scene.add(terrainMesh);

    const posAttr = planeGeo.attributes.position;
    const origY = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      origY[i] = posAttr.getY(i);
    }

    // --- 3D PARTICLE SWARM (120 Nodes) ---
    const particleCount = 120;
    const particleGeo = new THREE.SphereGeometry(0.045, 6, 6);
    const particleMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85
    });
    const particleSwarm = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
    const dummy = new THREE.Object3D();
    const particleData: Array<{
      x: number;
      y: number;
      z: number;
      speedX: number;
      speedY: number;
      speedZ: number;
      scale: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particleData.push({
        x: (Math.random() - 0.5) * 44,
        y: (Math.random() - 0.5) * 26,
        z: (Math.random() - 0.5) * 20 - 2,
        speedX: (Math.random() - 0.5) * 0.009,
        speedY: (Math.random() - 0.5) * 0.009,
        speedZ: (Math.random() - 0.5) * 0.007,
        scale: Math.random() * 0.8 + 0.6
      });
    }
    scene.add(particleSwarm);

    // Mouse Parallax
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetCameraX = normX * 1.8;
      targetCameraY = normY * 1.2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth Camera Parallax using damp
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCameraX, 3.2, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCameraY, 3.2, delta);
      camera.lookAt(0, 0, 0);

      // Rotate Left 3D Core & Rings
      meshLeftCore.rotation.x = elapsed * 0.22;
      meshLeftCore.rotation.y = elapsed * 0.32;
      meshLeftCoreWire.rotation.copy(meshLeftCore.rotation);
      ringLeft1.rotation.z = elapsed * 0.45;
      ringLeft2.rotation.z = -elapsed * 0.35;
      sat1.rotation.y = elapsed * 0.5;
      sat1.rotation.x = elapsed * 0.3;
      sat2.rotation.x = elapsed * 0.4;
      sat2.rotation.z = elapsed * 0.6;

      // Rotate Right 3D Core & Rings
      meshRightCore.rotation.x = -elapsed * 0.28;
      meshRightCore.rotation.z = elapsed * 0.24;
      meshRightCoreWire.rotation.copy(meshRightCore.rotation);
      ringRight1.rotation.z = -elapsed * 0.4;
      ringRight2.rotation.y = elapsed * 0.3;
      sat3.rotation.y = elapsed * 0.4;
      sat3.rotation.z = elapsed * 0.35;
      sat4.rotation.x = elapsed * 0.5;

      // Rotate Torus Knot & Upper Prism
      torusKnotMesh.rotation.x = elapsed * 0.3;
      torusKnotMesh.rotation.y = elapsed * 0.25;
      torusKnotWire.rotation.copy(torusKnotMesh.rotation);
      upperPrism.rotation.y = elapsed * 0.4;
      upperPrism.rotation.z = elapsed * 0.3;

      // Multi-Color Dynamic Point Lights Orbit
      lightCyan.position.x = Math.sin(elapsed * 0.55) * 12 - 2;
      lightCyan.position.y = Math.cos(elapsed * 0.4) * 7 + 2;

      lightEmerald.position.x = Math.cos(elapsed * 0.48) * 12 + 2;
      lightEmerald.position.y = Math.sin(elapsed * 0.65) * 7 - 2;

      lightViolet.position.z = Math.sin(elapsed * 0.38) * 7 - 3;
      lightViolet.position.x = Math.cos(elapsed * 0.35) * 8 - 4;

      lightAmber.position.y = Math.sin(elapsed * 0.5) * 6 + 4;
      lightAmber.position.x = Math.sin(elapsed * 0.45) * 9 + 3;

      // Undulating Terrain Wave
      for (let i = 0; i < posAttr.count; i++) {
        const u = i % gridCols;
        const v = Math.floor(i / gridCols);
        const wave = Math.sin(u * 0.28 + elapsed * 1.3) * Math.cos(v * 0.22 + elapsed * 1.0) * 1.25;
        posAttr.setY(i, origY[i] + wave);
      }
      posAttr.needsUpdate = true;

      // Particle Swarm Movement
      for (let i = 0; i < particleCount; i++) {
        const p = particleData[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.z += p.speedZ;

        if (p.x > 22) p.x = -22;
        if (p.x < -22) p.x = 22;
        if (p.y > 13) p.y = -13;
        if (p.y < -13) p.y = 13;

        dummy.position.set(p.x, p.y, p.z);
        dummy.scale.setScalar(p.scale + Math.sin(elapsed * 2 + i) * 0.2);
        dummy.updateMatrix();
        particleSwarm.setMatrixAt(i, dummy.matrix);
      }
      particleSwarm.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      renderer.dispose();
      icosaGeo.dispose();
      octaGeo.dispose();
      dodecaGeo.dispose();
      tetraGeo.dispose();
      torusKnotGeo.dispose();
      boxGeo.dispose();
      blueGlassMat.dispose();
      cyanGlowMat.dispose();
      emeraldGlassMat.dispose();
      emeraldWireMat.dispose();
      violetGlassMat.dispose();
      violetWireMat.dispose();
      goldMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      ringGeo4.dispose();
      ringMat4.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden opacity-85"
      aria-hidden="true"
    />
  );
};
