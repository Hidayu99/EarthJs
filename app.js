import * as THREE from 'https://threejs.org/build/three.module.js';

// Initialize scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Earth sphere
const geometry = new THREE.SphereGeometry(2, 32, 32);
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
const material = new THREE.MeshBasicMaterial({ map: earthTexture });
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Pinpoint locations
const locations = [
    { name: 'Netherlands', coordinates: { x: 1, y: 52 } },
    { name: 'Belgium', coordinates: { x: 4.5, y: 51 } },
    { name: 'Germany', coordinates: { x: 10, y: 51 } },
    { name: 'Austria', coordinates: { x: 14.5, y: 47.5 } },
    { name: 'Sweden', coordinates: { x: 18, y: 62 } },
    { name: 'Finland', coordinates: { x: 27, y: 64 } },
    { name: 'Norway', coordinates: { x: 9, y: 61 } },
    { name: 'Denmark', coordinates: { x: 10, y: 56 } },
    { name: 'UK', coordinates: { x: -2, y: 54 } },
];

// Create pinpoint markers
const markerGeometry = new THREE.SphereGeometry(0.05, 16, 16);
const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });

locations.forEach(location => {
    const { x, y } = location.coordinates;
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    marker.position.set(
        Math.cos(THREE.MathUtils.degToRad(x)) * Math.cos(THREE.MathUtils.degToRad(y)) * 2,
        Math.sin(THREE.MathUtils.degToRad(y)) * 2,
        Math.sin(THREE.MathUtils.degToRad(x)) * Math.cos(THREE.MathUtils.degToRad(y)) * 2
    );
    scene.add(marker);
});

// Animation
const animate = () => {
    requestAnimationFrame(animate);

    // Earth rotation
    earth.rotation.y += 0.005;

    renderer.render(scene, camera);
};

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
