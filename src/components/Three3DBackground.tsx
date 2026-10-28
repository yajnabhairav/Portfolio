import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Three3DBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Detect software WebGL to adapt performance
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

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    // Ambient distance fog matching deep canvas color #0b0f19
    scene.fog = new THREE.FogExp2(0x0b0f19, 0.045);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // 3. Dynamic Colorful Lights
    const ambientLight = new THREE.AmbientLight(0x0f172a, 0.8);
    scene.add(ambientLight);

    const lightCyan = new THREE.PointLight(0x00f0ff, 4.5, 30);
    lightCyan.position.set(-8, 5, 4);
    scene.add(lightCyan);

    const lightEmerald = new THREE.PointLight(0x10b981, 4.0, 30);
    lightEmerald.position.set(8, -4, 3);
    scene.add(lightEmerald);

    const lightViolet = new THREE.PointLight(0x8b5cf6, 3.5, 25);
    lightViolet.position.set(0, 8, -2);
    scene.add(lightViolet);

    const lightBlue = new THREE.PointLight(0x3b82f6, 4.0, 25);
    lightBlue.position.set(0, -6, 5);
    scene.add(lightBlue);

    // 4. Floating 3D Geometric Nodes & Silicon Hexagons
    const floatingGroup = new THREE.Group();
    scene.add(floatingGroup);

    // Floating 3D Icosahedrons (Crystalline silicon nodes)
    const icosaGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const icosaMat = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.35,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false,
      transparent: true,
      opacity: 0.75
    });

    const icosaWireMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    // Mesh 1: Large Left Background Crystal
    const crystal1 = new THREE.Mesh(icosaGeo, icosaMat);
    const crystal1Wire = new THREE.Mesh(icosaGeo, icosaWireMat);
    crystal1.position.set(-11, 4, -4);
    crystal1Wire.position.copy(crystal1.position);
    floatingGroup.add(crystal1);
    floatingGroup.add(crystal1Wire);

    // Mesh 2: Right Emerald Octahedron
    const octaGeo = new THREE.OctahedronGeometry(1.5, 0);
    const octaMat = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      emissive: 0x064e3b,
      emissiveIntensity: 0.4,
      metalness: 0.7,
      roughness: 0.25,
      transparent: true,
      opacity: 0.7
    });
    const octaWireMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const crystal2 = new THREE.Mesh(octaGeo, octaMat);
    const crystal2Wire = new THREE.Mesh(octaGeo, octaWireMat);
    crystal2.position.set(12, -3, -5);
    crystal2Wire.position.copy(crystal2.position);
    floatingGroup.add(crystal2);
    floatingGroup.add(crystal2Wire);

    // Mesh 3: Floating Holographic Torus Rings
    const torusGeo = new THREE.TorusGeometry(2.4, 0.04, 16, 64);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.5
    });
    const torus1 = new THREE.Mesh(torusGeo, torusMat);
    torus1.position.set(-11, 4, -4);
    torus1.rotation.x = Math.PI / 3;
    floatingGroup.add(torus1);

    const torusGeo2 = new THREE.TorusGeometry(2.8, 0.03, 16, 64);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.45
    });
    const torus2 = new THREE.Mesh(torusGeo2, torusMat2);
    torus2.position.set(12, -3, -5);
    torus2.rotation.y = Math.PI / 4;
    floatingGroup.add(torus2);

    // 5. 3D Undulating Digital Terrain Wave (Cyberpunk Wireframe Ground Grid)
    const gridCols = 40;
    const gridRows = 40;
    const planeGeo = new THREE.PlaneGeometry(50, 45, gridCols - 1, gridRows - 1);
    planeGeo.rotateX(-Math.PI / 2.2);
    planeGeo.translate(0, -9, -6);

    const planeMat = new THREE.MeshStandardMaterial({
      color: 0x0d1b30,
      emissive: 0x071529,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.3,
      wireframe: true
    });
    const terrainMesh = new THREE.Mesh(planeGeo, planeMat);
    scene.add(terrainMesh);

    // Original terrain vertex heights
    const posAttr = planeGeo.attributes.position;
    const origY = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      origY[i] = posAttr.getY(i);
    }

    // 6. Floating 3D Data Particles Swarm (Instanced)
    const particleCount = 75;
    const particleGeo = new THREE.SphereGeometry(0.04, 6, 6);
    const particleMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8
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
      const x = (Math.random() - 0.5) * 36;
      const y = (Math.random() - 0.5) * 22;
      const z = (Math.random() - 0.5) * 16 - 2;
      particleData.push({
        x,
        y,
        z,
        speedX: (Math.random() - 0.5) * 0.008,
        speedY: (Math.random() - 0.5) * 0.008,
        speedZ: (Math.random() - 0.5) * 0.006,
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
      targetCameraX = normX * 1.5;
      targetCameraY = normY * 1.0;
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
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCameraX, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCameraY, 3.5, delta);
      camera.lookAt(0, 0, 0);

      // Rotate crystals
      crystal1.rotation.x = elapsed * 0.25;
      crystal1.rotation.y = elapsed * 0.35;
      crystal1Wire.rotation.copy(crystal1.rotation);

      crystal2.rotation.x = -elapsed * 0.3;
      crystal2.rotation.z = elapsed * 0.25;
      crystal2Wire.rotation.copy(crystal2.rotation);

      torus1.rotation.z = elapsed * 0.5;
      torus2.rotation.x = -elapsed * 0.4;

      // Orbit dynamic colored lights
      lightCyan.position.x = Math.sin(elapsed * 0.6) * 10 - 2;
      lightCyan.position.y = Math.cos(elapsed * 0.4) * 6 + 2;

      lightEmerald.position.x = Math.cos(elapsed * 0.5) * 10 + 2;
      lightEmerald.position.y = Math.sin(elapsed * 0.7) * 6 - 2;

      lightViolet.position.z = Math.sin(elapsed * 0.4) * 6 - 4;

      // Dynamic Undulating Terrain Waves
      for (let i = 0; i < posAttr.count; i++) {
        const u = i % gridCols;
        const v = Math.floor(i / gridCols);
        const wave = Math.sin(u * 0.3 + elapsed * 1.4) * Math.cos(v * 0.25 + elapsed * 1.1) * 1.1;
        posAttr.setY(i, origY[i] + wave);
      }
      posAttr.needsUpdate = true;

      // Update particle swarm
      for (let i = 0; i < particleCount; i++) {
        const p = particleData[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.z += p.speedZ;

        if (p.x > 18) p.x = -18;
        if (p.x < -18) p.x = 18;
        if (p.y > 11) p.y = -11;
        if (p.y < -11) p.y = 11;

        dummy.position.set(p.x, p.y, p.z);
        dummy.scale.setScalar(p.scale);
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
      icosaMat.dispose();
      icosaWireMat.dispose();
      octaGeo.dispose();
      octaMat.dispose();
      octaWireMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      torusGeo2.dispose();
      torusMat2.dispose();
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
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden opacity-75"
      aria-hidden="true"
    />
  );
};
