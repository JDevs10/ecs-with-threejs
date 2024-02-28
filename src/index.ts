import '../public/styles.css';
import * as THREE from 'three';
import { MeshComponent } from './components/MeshComponent';
import { PositionComponent } from './components/PositionComponent';
import { RenderSystem } from './systems/RenderSystem';
import { RotationComponent } from './components/RotationComponent';
import ECS from './ECS';

// Setup the Three.js scene
const clock = new THREE.Clock();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create an array of materials with different colors for each face
const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green
    new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue
    new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Yellow
    new THREE.MeshBasicMaterial({ color: 0x00ffff }), // Cyan
    new THREE.MeshBasicMaterial({ color: 0xff00ff })  // Magenta
];

// Create an entity with a mesh and position
const geometry = new THREE.BoxGeometry();
const cubeMesh = new THREE.Mesh(geometry, materials);

const ecs = new ECS();

ecs.addSystem(new RenderSystem(scene));

const cubeEntity = ecs.createEntity('cube1');
cubeEntity.addComponent(new MeshComponent(cubeMesh))
.addComponent(new PositionComponent(0, 0, -5));

// Random rotation speeds
const randomSpeed = () => Math.random() * 0.9 - 0.1; // Random speed between -0.1 and 0.9
cubeEntity.addComponent(new RotationComponent(randomSpeed(), randomSpeed(), randomSpeed()));
ecs.addEntity(cubeEntity);


ecs.execute(clock.getDelta(), clock.elapsedTime);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    ecs.execute(clock.getDelta(), clock.elapsedTime);
    renderer.render(scene, camera);
}
animate();
