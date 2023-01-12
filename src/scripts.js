import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const apartmentURL = new URL("../src/apt.gltf", import.meta.url);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

camera.position.set(-10, 30, 30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

const gridHelper = new THREE.GridHelper(50);
scene.add(gridHelper);

renderer.setClearColor(0xc9f066);

const assetLoader = new GLTFLoader();

assetLoader.load(apartmentURL.href, function (gltf) {
  const model = gltf.scene;
  model.scale.setScalar(0.03)
  model.position.set(0, 1, 0);
  camera.lookAt(model.position);
  scene.add(model);
});

const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

function animate() {
  box.rotation.x += 0.001;
  box.rotation.y += 0.01;
  box.rotation.z += 0.001;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
