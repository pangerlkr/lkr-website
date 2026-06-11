(() => {
  const canvas = document.getElementById('bg-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x050914, 3, 14);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 4.5;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const pointsGeom = new THREE.BufferGeometry();
  const pointsCount = 4500;
  const points = new Float32Array(pointsCount * 3);

  for (let i = 0; i < pointsCount * 3; i += 3) {
    const r = 2 + Math.random() * 1.8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    points[i] = r * Math.sin(phi) * Math.cos(theta);
    points[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    points[i + 2] = r * Math.cos(phi);
  }

  pointsGeom.setAttribute('position', new THREE.BufferAttribute(points, 3));
  const pointsMat = new THREE.PointsMaterial({
    color: 0x37d4ac,
    size: 0.03,
    transparent: true,
    opacity: 0.8,
  });

  const starField = new THREE.Points(pointsGeom, pointsMat);
  scene.add(starField);

  const ambient = new THREE.AmbientLight(0x77ccff, 0.6);
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
  dirLight.position.set(2, 3, 4);
  scene.add(ambient, dirLight);

  const globe = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.4, 12),
    new THREE.MeshStandardMaterial({
      color: 0x0f6f5a,
      emissive: 0x05352f,
      metalness: 0.15,
      roughness: 0.35,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    }),
  );
  scene.add(globe);

  const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener('resize', resize);

  const render = () => {
    starField.rotation.y += 0.0008;
    starField.rotation.x += 0.0003;
    globe.rotation.y += 0.0012;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  render();

  if (window.gsap && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(starField.rotation, {
      y: Math.PI * 1.6,
      x: Math.PI * 0.5,
      scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    gsap.to(globe.rotation, {
      y: Math.PI,
      x: -0.5,
      scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.from(el, {
        y: 70,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
